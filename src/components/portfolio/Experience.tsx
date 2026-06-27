const Experience = () => {
  const experiences = [
    {
      year: "2026",
      org: "Research Internship",
      role: "Machine Learning Researcher",
      period: "Present",
      isPresent: true,
      logo: null,
      points: [
        "Conducting research on Physical Rehabilitation Assessment using the KIMORE dataset to evaluate patients' exercises automatically.",
        "Developing models utilizing Spiking Neural Networks (SNN) and Spatial-Temporal Graph Convolutional Networks (ST-GCN + LSTM) for continuous assessment scoring.",
        "Processing Kinect v2 RGB-D sensor data (Skeleton tracking) to handle variable-length inputs and different speeds of patient movements.",
        "Upgraded legacy models to Keras 3 and TensorFlow 2.16+, integrating MLP layers for enhanced feature extraction and accuracy.",
      ],
    }
  ];

  return (
    <section id="experience" className="bg-card">
      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <p className="text-eyebrow font-display text-foreground mb-4">Experience</p>
        <h2 className="text-section font-display text-foreground mb-12 max-w-3xl">
          Where I've been working.
        </h2>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.org} className="surface-recessed p-8 md:p-10 grid md:grid-cols-[180px_1fr] gap-8 items-start">
              <div className="font-display text-[40px] md:text-[56px] font-bold tracking-tight leading-none text-foreground">
                {exp.year}
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-1">
                  <div className="flex items-start gap-4">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={`${exp.org} logo`}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="text-[24px] font-semibold font-display text-foreground tracking-tight flex items-center gap-2 flex-wrap">
                        {exp.org}
                      </h3>
                      <p className="text-[17px] text-muted-foreground">{exp.role}</p>
                    </div>
                  </div>
                  {exp.isPresent ? (
                    <span className="self-start px-3 py-1 rounded-full bg-background text-[13px] font-medium text-[hsl(211,100%,40%)]">
                      Present
                    </span>
                  ) : (
                    <span className="text-[14px] text-muted-foreground">{exp.period}</span>
                  )}
                </div>
                <ul className="space-y-2.5">
                  {exp.points.map((point, i) => (
                    <li key={i} className="text-[17px] text-muted-foreground leading-snug">
                      - {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
