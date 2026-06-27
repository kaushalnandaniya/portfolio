import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import campusLifeOsImage from "@/assets/image.png";
import hackerrankImage from "@/assets/hackerrank_orchestrate.png";
import rehabImage from "@/assets/rehab_snn.png";
import quantImage from "@/assets/quant_engine.png";
import hedgeFundImage from "@/assets/hedge_fund.png";

const Projects = () => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const projects = [
    {
      title: "Campus Life OS",
      category: "AI Agent",
      tech: ["Next.js", "Gemini API", "PostgreSQL", "Tailwind CSS"],
      description: "Drowning in tabs? Campus Life OS is an intelligent dashboard that securely syncs your academic and personal inboxes, uses AI to extract hidden deadlines, and creates an automated, burnout-free schedule.",
      github: "https://github.com/kaushalnandaniya/Campus-Life-OS",
      liveUrl: "https://campus-life-os-iota.vercel.app",
      image: campusLifeOsImage,
    },
    {
      title: "Physical Rehabilitation using SNN",
      category: "Machine Learning",
      tech: ["Python", "Spiking Neural Networks", "PyTorch", "Computer Vision"],
      description: "A novel approach to physical rehabilitation tracking and analysis utilizing Spiking Neural Networks (SNN). This project focuses on highly efficient, real-time movement processing and analysis for advanced healthcare applications.",
      github: "https://github.com/kaushalnandaniya/STGCN-rehab",
      liveUrl: null,
      image: rehabImage,
    },
    {
      title: "Derivatives Pricing & Risk Engine",
      category: "Quantitative Finance",
      tech: ["Python", "NumPy", "SciPy"],
      description: "A full-stack, scalable quantitative finance platform offering advanced derivatives pricing, risk management, and strategy backtesting. Built with Python and Next.js, it features real-time market data integration, Monte Carlo simulations, and a real time analytics dashboard.",
      github: "https://github.com/kaushalnandaniya/Quantitative-Derivatives-Pricing-Risk-Engine",
      liveUrl: "https://quant-engine-beta.vercel.app",
      image: quantImage,
    },
    {
      title: "Hedge Fund Time-Series Forecasting",
      category: "Quantitative Finance",
      tech: ["Python", "LightGBM", "PyTorch", "LSTM", "GRU", "Quantile Regression"],
      description: "Built a Two-Model K-Fold architecture for the Kaggle Hedge Fund forecasting competition, scoring 0.2777 on test data - 2nd place on the leaderboard. Explored classical (ARIMA, SES), deep (RNN, LSTM, GRU), and gradient-boosted models across 5.3M+ rows and 36,000+ time series. The key insight: 3 codes carry 97.8% of evaluation weight, leading to a Precision + Range model split with 90 ensembled LightGBM boosters.",
      github: "https://github.com/kaushalnandaniya/HedgeFund_TimeSeriesForcasting",
      liveUrl: null,
      image: hedgeFundImage,
    },
    {
      title: "Hackerrank Orchestrator",
      category: "AI Pipeline",
      tech: ["Python", "Gemini 2.0 Flash", "Prompt Engineering", "Data Analysis"],
      description: "An automated AI pipeline for insurance claim verification using Google's Gemini 2.5 Flash. Achieved a 95.45% evaluation score by combining a probabilistic Vision-Language Model with a deterministic Python rule layer to eliminate AI hallucinations. Features fault-tolerant regex JSON extraction, API rate-limit backoff, and strict schema coercion.",
      github: "https://github.com/kaushalnandaniya/HackerRank_Orchestrate",
      liveUrl: null,
      image: hackerrankImage,
    },
  ];

  return (
    <section id="projects" className="bg-background">
      <ImageLightbox
        src={lightboxImage?.src || ""}
        alt={lightboxImage?.alt || ""}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <p className="text-eyebrow font-display text-foreground mb-4">Projects</p>
        <h2 className="text-section font-display text-foreground mb-14 max-w-3xl">
          Selected work.
        </h2>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <article key={project.title} className="surface-card overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0 items-stretch">
                <div
                  className={`relative order-1 ${project.image ? 'cursor-pointer group overflow-hidden' : 'p-8 bg-secondary/20'} ${index % 2 === 1 ? 'md:order-2' : ''} flex items-center justify-center min-h-[280px] md:min-h-[420px]`}
                  onClick={() => {
                    if (project.image) setLightboxImage({ src: project.image, alt: project.title });
                  }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground/50 text-2xl font-display text-center px-4">
                      {project.title}
                    </div>
                  )}
                </div>

                <div className={`p-8 md:p-12 flex flex-col justify-center order-2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <p className="text-caption uppercase tracking-wider text-muted-foreground mb-3">
                    0{index + 1} - {project.category}
                  </p>
                  <h3 className="font-display text-[32px] md:text-[40px] font-bold tracking-tight text-foreground mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[17px] text-muted-foreground leading-relaxed mb-6 max-w-md">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[12px] text-muted-foreground bg-background rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    {project.liveUrl && (
                      <a
                         href={project.liveUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="btn-azure"
                       >
                         Visit
                       </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      Source <ArrowUpRight className="w-4 h-4 ml-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
