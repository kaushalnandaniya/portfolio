import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Achievements from "@/components/portfolio/Achievements";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-caption text-muted-foreground">
          Designed & built by Kaushal Nandaniya - 2026
        </p>
        <p className="text-caption text-muted-foreground">
          <a href="mailto:kaushalnandania086@gmail.com" className="text-[hsl(211,100%,40%)] hover:underline">kaushalnandania086@gmail.com</a>
        </p>
      </div>
    </footer>
    </div>
  );
};

export default Index;
