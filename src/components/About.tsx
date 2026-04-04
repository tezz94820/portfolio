import { Mail, Github, Linkedin, Twitter, BookOpen, GraduationCap, Briefcase, Code } from "lucide-react";

const skills = [
  "JavaScript (ES6)", "TypeScript", "Java", "Python", "SQL",
  "React", "Next.js", "Nest.js", "Node.js", "Express",
  "MongoDB", "PostgreSQL", "Docker", "AWS", "Linux",
  "TensorFlow", "Keras", "Selenium", "Git",
];

const About = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="section-heading mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Bio */}
          <div className="glass-card rounded-2xl p-8 scroll-reveal">
            <p className="text-muted-foreground leading-relaxed mb-6">
              I am a Software Developer with experience across full-stack development, automation, and AI-driven solutions. Currently working at <span className="font-semibold text-foreground">BNP Paribas</span> as an Associate Software Engineer, I contribute to backend development, test automation, and integrating Generative AI into developer workflows.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I have hands-on freelance and internship experience building web applications and platforms using MERN, Next.js, Nest.js, and AWS, including IoT integrations and e-learning platforms. I enjoy taking projects end-to-end — from backend logic and database design to frontend development and deployment.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond coding, I write technical articles on Medium to simplify complex concepts for developers. My career goal is to keep growing as a versatile engineer, contributing to impactful products while learning and applying new technologies in software engineering and AI.
            </p>
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6 scroll-reveal" style={{ transitionDelay: "100ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase size={16} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Current Role</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Associate Software Developer at BNP Paribas ISPL — working on Java backend, test automation migration, and GenAI integration since June 2024.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 scroll-reveal" style={{ transitionDelay: "200ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap size={16} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Education</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                B.Tech in Information Technology from D.J Sanghvi College of Engineering (2020–2024), CGPA: 8.874
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 scroll-reveal" style={{ transitionDelay: "300ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen size={16} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Research</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Published IEEE paper on Malware Prediction System using ML at ICBDS 2024 conference in Pune, India.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 scroll-reveal" style={{ transitionDelay: "400ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code size={16} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">Past Teaching</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Mathematics Teacher at Doubtnut (Jan–Aug 2022) — created video solutions for JEE Mains & Advanced questions.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card rounded-2xl p-8 scroll-reveal">
            <h3 className="font-heading font-semibold text-foreground mb-5">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm text-foreground font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social / Contact */}
          <div className="glass-card rounded-2xl p-8 text-center scroll-reveal">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Let's Connect</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Open to opportunities, collaborations, and conversations.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              {[
                { icon: Mail, href: "mailto:tejasitankar94820@gmail.com", label: "Email" },
                { icon: Github, href: "https://github.com/tezz94820", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/tejas-itankar-7b1a011b4", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com/ItankarTejas", label: "X (Twitter)" },
                { icon: BookOpen, href: "https://medium.com/@tejasitankar94820", label: "Medium" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-medium text-foreground hover:bg-white/80 hover:shadow-md transition-all"
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tejas Itankar. Built with ❤️
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
