import profilePhoto from "@/assets/nandu_office.png";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-12">
      <div className="max-w-[1200px] mx-auto px-6 text-center w-full">
        <div className="flex flex-wrap justify-center gap-3 text-[14px] mb-6">
          <a href="https://www.linkedin.com/in/kaushal-nandaniya-24a26a2ba" target="_blank" rel="noopener noreferrer" className="text-[hsl(211,100%,40%)] hover:underline">LinkedIn</a>
          <span className="text-muted-foreground">·</span>
          <a href="https://github.com/kaushalnandaniya" target="_blank" rel="noopener noreferrer" className="text-[hsl(211,100%,40%)] hover:underline">GitHub</a>
          <span className="text-muted-foreground">·</span>
          <a href="https://leetcode.com/u/kaushal_nandaniya/" target="_blank" rel="noopener noreferrer" className="text-[hsl(211,100%,40%)] hover:underline">LeetCode</a>
          <span className="text-muted-foreground">·</span>
          <a href="https://codeforces.com/profile/Kaushal_Nandaniya" target="_blank" rel="noopener noreferrer" className="text-[hsl(211,100%,40%)] hover:underline">Codeforces</a>
          <span className="text-muted-foreground">·</span>
          <a href="https://www.kaggle.com/kaushalnandania" target="_blank" rel="noopener noreferrer" className="text-[hsl(211,100%,40%)] hover:underline">Kaggle</a>
          <span className="text-muted-foreground">·</span>
          <a href="mailto:kaushalnandania086@gmail.com" className="text-[hsl(211,100%,40%)] hover:underline">Email</a>
        </div>
        <h1 className="text-display font-display text-foreground mb-4">
          Kaushal Nandaniya
        </h1>

        <div className="mx-auto w-full max-w-lg">
          <div className="surface-card overflow-hidden aspect-[4/5] relative bg-secondary rounded-3xl shadow-2xl flex items-center justify-center">
            <img src={profilePhoto} alt="Kaushal Nandaniya" className="w-full h-full object-cover object-[center_20%]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
