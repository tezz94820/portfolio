import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Articles from "@/components/Articles";
import About from "@/components/About";
import ShootingStars from "@/components/ShootingStars";
import useScrollReveal from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ShootingStars />
      <Navbar />
      <Hero />
      <Projects />
      <Articles />
      <About />
    </div>
  );
};

export default Index;
