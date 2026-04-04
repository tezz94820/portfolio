import { ArrowDown, Briefcase, MapPin } from "lucide-react";
import tejasPhoto from "@/assets/tejas-photo.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Info */}
          <div className="scroll-reveal-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Briefcase size={14} />
              Associate Software Developer
            </div>

            <h1 className="section-heading mb-4">
              Hi, I'm{" "}
              <span className="gradient-text">Tejas Itankar</span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-lg">
              Software Developer at{" "}
              <span className="font-semibold text-foreground">BNP Paribas</span>{" "}
              with expertise in full-stack development, automation, and AI-driven solutions.
              I build scalable web applications end-to-end — from backend logic to frontend deployment.
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <MapPin size={14} />
              <span>India</span>
              <span className="mx-2">•</span>
              <span>B.Tech IT, DJ Sanghvi — CGPA 8.87</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                View Projects
              </a>
              <a
                href="https://github.com/tezz94820"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full glass-card text-foreground font-medium hover:bg-white/80 transition-all"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/tejas-itankar-7b1a011b4"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full glass-card text-foreground font-medium hover:bg-white/80 transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right - Photo */}
          <div className="scroll-reveal-right order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/20" />
              <div className="relative rounded-3xl overflow-hidden w-72 h-80 sm:w-80 sm:h-[22rem] md:w-96 md:h-[28rem]">
                <img
                  src={tejasPhoto}
                  alt="Tejas Itankar"
                  className="w-full h-full object-cover object-top"
                />
                {/* Themed overlay on edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-primary/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={20} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
