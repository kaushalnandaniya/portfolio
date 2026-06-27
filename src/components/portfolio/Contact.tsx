const Contact = () => {
  return (
    <section id="contact" className="bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32 text-center">
        <p className="text-eyebrow font-display text-foreground mb-4">Contact</p>
        <h2 className="text-headline font-display text-foreground mb-6 max-w-3xl mx-auto">
          Let's build something worth shipping.
        </h2>
        <p className="text-sub text-muted-foreground max-w-xl mx-auto mb-10">
          Currently looking for full-time opportunities in software development.
          Drop a note - I'll get back quickly.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a href="mailto:kaushalnandania086@gmail.com" className="btn-azure">
            Say hello
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
