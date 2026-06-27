import { useEffect, useRef, useState } from "react";
import DailyIframe, { DailyCall, DailyParticipant } from "@daily-co/daily-js";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Stage = "creating" | "haircheck" | "live" | "error";
type NetQuality = "idle" | "testing" | "good" | "warning" | "bad" | "failed";

const ChatModal = ({ open, onClose }: Props) => {
  const [stage, setStage] = useState<Stage>("creating");
  const [error, setError] = useState<string | null>(null);
  const [, setConversationUrl] = useState<string | null>(null);
  const [, setNetQuality] = useState<NetQuality>("idle");
  const [replicaJoined, setReplicaJoined] = useState(false);
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const callRef = useRef<DailyCall | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const replicaVideoRef = useRef<HTMLVideoElement | null>(null);
  const replicaAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setStage("creating");
    setError(null);
    setConversationUrl(null);
    setReplicaJoined(false);
    setNetQuality("idle");

    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("tavus-create-conversation", { body: {} });
        if (cancelled) return;
        if (error) throw error;
        if (!data?.conversation_url) throw new Error("No conversation_url returned");

        const url: string = data.conversation_url;
        setConversationUrl(url);

        const call = DailyIframe.createCallObject({ subscribeToTracksAutomatically: true });
        callRef.current = call;
        attachCallListeners(call);

        await call.startCamera();
        call.join({ url }).catch((e) => console.warn("[ChatModal] background join failed:", e));

        if (cancelled) return;
        setStage("haircheck");
        runNetworkTest(call);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || "Failed to start conversation");
        setStage("error");
      }
    })();

    return () => {
      cancelled = true;
      teardown();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const attachCallListeners = (call: DailyCall) => {
    call.on("participant-joined", (ev) => {
      const p = ev?.participant;
      if (!p) return;
      if (!p.local) {
        setReplicaJoined(true);
        bindReplicaTracks(p);
      }
    });
    call.on("participant-updated", (ev) => {
      const p = ev?.participant;
      if (!p) return;
      if (p.local) bindLocalVideo(p);
      else bindReplicaTracks(p);
    });
    call.on("error", (e: any) => {
      console.error("[Daily error]", e);
      setError(e?.errorMsg || "Video call error");
      setStage("error");
    });
  };

  const bindLocalVideo = (p: DailyParticipant) => {
    const track = p.tracks?.video?.persistentTrack;
    const el = localVideoRef.current;
    if (!el) return;
    if (track) {
      const stream = new MediaStream([track]);
      if (el.srcObject !== stream) el.srcObject = stream;
    } else el.srcObject = null;
  };

  const bindReplicaTracks = (p: DailyParticipant) => {
    const vTrack = p.tracks?.video?.persistentTrack;
    const aTrack = p.tracks?.audio?.persistentTrack;
    const v = replicaVideoRef.current;
    const a = replicaAudioRef.current;
    if (v) {
      if (vTrack) {
        const s = new MediaStream([vTrack]);
        if (v.srcObject !== s) v.srcObject = s;
      } else v.srcObject = null;
    }
    if (a) {
      if (aTrack) {
        const s = new MediaStream([aTrack]);
        if (a.srcObject !== s) a.srcObject = s;
      } else a.srcObject = null;
    }
  };

  const runNetworkTest = async (call: DailyCall) => {
    try {
      setNetQuality("testing");
      const res: any = await (call as any).testCallQuality?.();
      const r = res?.result as string | undefined;
      if (r === "good") setNetQuality("good");
      else if (r === "warning") setNetQuality("warning");
      else if (r === "bad") setNetQuality("bad");
      else setNetQuality("failed");
    } catch {
      setNetQuality("failed");
    }
  };

  const toggleCam = async () => {
    const c = callRef.current;
    if (!c) return;
    const next = !camOn;
    setCamOn(next);
    await c.setLocalVideo(next);
  };

  const toggleMic = async () => {
    const c = callRef.current;
    if (!c) return;
    const next = !micOn;
    setMicOn(next);
    await c.setLocalAudio(next);
  };

  const enterCall = () => {
    setStage("live");
    requestAnimationFrame(() => {
      const c = callRef.current;
      if (!c) return;
      const ps = c.participants();
      Object.values(ps).forEach((p) => {
        if (p.local) bindLocalVideo(p);
        else bindReplicaTracks(p);
      });
    });
  };

  const teardown = () => {
    const c = callRef.current;
    callRef.current = null;
    if (c) {
      try { c.leave(); } catch {}
      try { c.destroy(); } catch {}
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (replicaVideoRef.current) replicaVideoRef.current.srcObject = null;
    if (replicaAudioRef.current) replicaAudioRef.current.srcObject = null;
  };

  const handleClose = () => {
    teardown();
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] sm:h-[86vh] bg-white rounded-[28px] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
          <div className="text-[15px] font-semibold tracking-tight text-foreground">
            Chat with Hitakshi
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.1] flex items-center justify-center text-foreground/70 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 relative bg-[#f5f5f7] overflow-hidden">
          {stage === "creating" && <CreatingView />}
          {stage === "error" && <ErrorView error={error} onClose={handleClose} />}
          {stage === "haircheck" && (
            <HairCheckView
              localVideoRef={localVideoRef}
              camOn={camOn}
              micOn={micOn}
              toggleCam={toggleCam}
              toggleMic={toggleMic}
              replicaJoined={replicaJoined}
              onJoin={enterCall}
            />
          )}
          {stage === "live" && (
            <LiveView
              replicaVideoRef={replicaVideoRef}
              replicaAudioRef={replicaAudioRef}
              localVideoRef={localVideoRef}
              camOn={camOn}
              micOn={micOn}
              toggleCam={toggleCam}
              toggleMic={toggleMic}
              onLeave={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* =================== Subviews =================== */

const CreatingView = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
    <div className="w-10 h-10 rounded-full border-[3px] border-black/10 border-t-[hsl(211,100%,45%)] animate-spin" />
    <div className="text-[14px] text-muted-foreground">Preparing your conversation…</div>
  </div>
);

const ErrorView = ({ error, onClose }: { error: string | null; onClose: () => void }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
    <div className="text-[20px] font-semibold tracking-tight">Something went wrong</div>
    <div className="text-[14px] text-muted-foreground max-w-md">{error}</div>
    <button
      onClick={onClose}
      className="mt-2 px-5 h-10 rounded-full bg-[hsl(211,100%,45%)] text-white text-[14px] font-medium hover:bg-[hsl(211,100%,40%)] transition-colors"
    >
      Close
    </button>
  </div>
);

const IconBtn = ({
  on,
  onClick,
  children,
  label,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
      on
        ? "bg-white text-foreground hover:bg-white/90 border border-black/10"
        : "bg-[#ff453a] text-white hover:bg-[#e03e35]"
    }`}
  >
    {children}
  </button>
);

const MicIcon = ({ on }: { on: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
    {!on && <line x1="3" y1="3" x2="21" y2="21"/>}
  </svg>
);

const CamIcon = ({ on }: { on: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    {!on && <line x1="3" y1="3" x2="21" y2="21"/>}
  </svg>
);

const HairCheckView = ({
  localVideoRef,
  camOn,
  micOn,
  toggleCam,
  toggleMic,
  replicaJoined,
  onJoin,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  camOn: boolean;
  micOn: boolean;
  toggleCam: () => void;
  toggleMic: () => void;
  replicaJoined: boolean;
  onJoin: () => void;
}) => (
  <div className="absolute inset-0 flex flex-col gap-5 p-6 sm:p-8 overflow-y-auto">
    <div className="flex flex-col gap-4 flex-1 min-h-[240px]">
      <div className="relative flex-1 rounded-[20px] bg-black overflow-hidden min-h-[260px]">
        {camOn ? (
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover [transform:scaleX(-1)]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/60 text-[14px]">
            Camera off
          </div>
        )}
      </div>
      <div className="flex justify-center gap-3">
        <IconBtn on={micOn} onClick={toggleMic} label="Toggle microphone"><MicIcon on={micOn} /></IconBtn>
        <IconBtn on={camOn} onClick={toggleCam} label="Toggle camera"><CamIcon on={camOn} /></IconBtn>
      </div>
    </div>

    <button
      onClick={onJoin}
      disabled={!replicaJoined}
      className="w-full h-12 rounded-full bg-[hsl(211,100%,45%)] text-white text-[15px] font-medium hover:bg-[hsl(211,100%,40%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {replicaJoined ? "Join conversation" : "Connecting…"}
    </button>
  </div>
);

const LiveView = ({
  replicaVideoRef,
  replicaAudioRef,
  localVideoRef,
  camOn,
  micOn,
  toggleCam,
  toggleMic,
  onLeave,
}: {
  replicaVideoRef: React.RefObject<HTMLVideoElement>;
  replicaAudioRef: React.RefObject<HTMLAudioElement>;
  localVideoRef: React.RefObject<HTMLVideoElement>;
  camOn: boolean;
  micOn: boolean;
  toggleCam: () => void;
  toggleMic: () => void;
  onLeave: () => void;
}) => (
  <div className="absolute inset-0 bg-black">
    <video ref={replicaVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
    <audio ref={replicaAudioRef} autoPlay />

    {/* Local PiP */}
    <div className="absolute top-4 right-4 w-28 h-40 sm:w-36 sm:h-52 rounded-2xl bg-black overflow-hidden ring-1 ring-white/15">
      {camOn ? (
        <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover [transform:scaleX(-1)]" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[11px] text-white/60">Camera off</div>
      )}
    </div>

    {/* Controls */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-3 rounded-full bg-black/55 backdrop-blur-md">
      <IconBtn on={micOn} onClick={toggleMic} label="Toggle microphone"><MicIcon on={micOn} /></IconBtn>
      <IconBtn on={camOn} onClick={toggleCam} label="Toggle camera"><CamIcon on={camOn} /></IconBtn>
      <button
        onClick={onLeave}
        aria-label="Leave"
        className="w-12 h-12 rounded-full bg-[#ff453a] text-white hover:bg-[#e03e35] flex items-center justify-center transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" transform="rotate(135 12 12)"/></svg>
      </button>
    </div>
  </div>
);

export default ChatModal;
