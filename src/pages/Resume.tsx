import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Portfolio</span>
        </Link>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full">
        <iframe
          src="/resume.pdf"
          className="w-full h-[calc(100vh-65px)]"
          title="Resume - Hitakshi Arora"
        />
      </div>
    </div>
  );
};

export default Resume;
