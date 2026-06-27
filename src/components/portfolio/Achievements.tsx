import { ArrowUpRight } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      title: "Kaggle Hedge Fund Forecasting",
      highlight: "2nd Place Globally",
      description:
        "Secured 2nd place on the leaderboard in the Hedge Fund time-series forecasting competition, scoring 0.2777 using an ensembled LightGBM architecture.",
      link: "https://github.com/kaushalnandaniya/HedgeFund_TimeSeriesForcasting",
    },
    {
      title: "Winter of Code (ML)",
      highlight: "Winner",
      description:
        "Emerged as the winner in the Winter of Code competition under the Machine Learning track, demonstrating advanced understanding of algorithms and model building.",
      link: null,
    },
    {
      title: "Kaggle Expert",
      highlight: "Datasets - Global Rank: 262",
      description:
        "Consistently ranked in the top tier on Kaggle for contributing high-quality datasets and models to the data science community.",
      link: "https://www.kaggle.com/kaushalnandania",
    },
    {
      title: "Codeforces Pupil",
      highlight: "Rating: 1227",
      description:
        "Active competitive programmer on Codeforces, solving complex algorithmic problems under strict time constraints.",
      link: "https://codeforces.com/profile/Kaushal_Nandaniya",
    },
    {
      title: "LeetCode Achiever",
      highlight: "Rating: 1595",
      description:
        "Consistent problem solver on LeetCode with hundreds of algorithms and data structure problems solved.",
      link: "https://leetcode.com/u/kaushal_nandaniya/",
    },
  ];

  return (
    <section id="achievements" className="bg-card">
      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <p className="text-eyebrow font-display text-foreground mb-4">Achievements</p>
        <h2 className="text-section font-display text-foreground mb-12 max-w-3xl">
          Competitive Programming & Rankings
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {achievements.map((a) => (
            <div key={a.title} className="surface-recessed p-8 flex flex-col">
              <p className="text-caption uppercase tracking-wider text-[hsl(211,100%,40%)] mb-3 min-h-[2.25rem] md:min-h-[2.25rem]">{a.highlight}</p>
              <h3 className="font-display text-[24px] font-semibold tracking-tight text-foreground mb-3 min-h-[4rem] leading-tight">
                {a.title}
              </h3>
              <p className="text-[17px] text-muted-foreground leading-snug flex-1">{a.description}</p>
              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-[14px] text-[hsl(211,100%,40%)] hover:underline mt-5"
                >
                  View <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
