const About = () => {
  return (
    <section id="about" className="bg-card">
      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <p className="text-eyebrow font-display text-foreground mb-4">About</p>
        <h2 className="text-section font-display text-foreground mb-12 max-w-3xl leading-tight">
          A mathematics and computing undergraduate with a bias toward solving real problems.
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6 text-body-lg text-muted-foreground max-w-xl">
            <p>
              I'm studying <span className="text-foreground font-medium">Mathematics and Computing</span> at DA-IICT, Gandhinagar, with a focus on building intelligent systems that solve real challenges from deep learning architectures to robust backend pipelines.
            </p>
            <p>
              My background lies heavily in competitive programming, which drives my structured approach to Machine Learning, Coresets, and Transformers.
            </p>
            <p>
              I care about clean data structures, scalable architectures, and models that perform efficiently in production. Currently seeking full-time opportunities where I can contribute to thoughtful, high-impact work.
            </p>
          </div>

          <div className="grid gap-5">
            <div className="surface-recessed p-7">
              <p className="text-caption uppercase tracking-wider text-muted-foreground mb-2">Research & Interests</p>
              <p className="text-[17px] text-foreground">Machine Learning · Coresets · Transformers</p>
            </div>
            <div className="surface-recessed p-7">
              <p className="text-caption uppercase tracking-wider text-muted-foreground mb-2">Education</p>
              <p className="text-[17px] text-foreground">B.Tech in Mathematics & Computing</p>
              <p className="text-[14px] text-muted-foreground mt-1">DA-IICT, Gandhinagar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
