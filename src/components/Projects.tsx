import { ExternalLink, Play } from "lucide-react";

interface Project {
  title: string;
  company: string;
  role: string;
  period: string;
  tech: string[];
  description: string;
  liveLink?: string;
  videoLink?: string;
  type: "freelance" | "internship" | "project" | "hackathon" | "research";
}

const projects: Project[] = [
  {
    title: "Pharmaceutical Catalog Platform",
    company: "Maddisun Ventures LLP",
    role: "Full Stack Engineer",
    period: "Jan 2024 – Apr 2024",
    tech: ["Next.js", "TypeScript", "Email Integration"],
    description:
      "Built a platform to showcase pharmaceutical raw materials, enabling users to browse products, select items, and send enquiries with email notifications.",
    liveLink: "https://maddisun.com/",
    videoLink: "https://www.youtube.com/watch?v=lk26VRSJC0A",
    type: "freelance",
  },
  {
    title: "Location-Based Travel Services",
    company: "Highway Delite",
    role: "Full Stack Developer",
    period: "May 2024 – Jun 2024",
    tech: ["TypeScript", "Next.js", "Nest.js", "PostgreSQL", "PostGIS"],
    description:
      "Built location-based APIs using Google Maps & PostGIS to identify restaurants, tolls, and public places along user routes. Migrated Agent Reporting Server from PHP to modern stack.",
    type: "internship",
  },
  {
    title: "E-Learning Platform",
    company: "DK Academy",
    role: "Full Stack Engineer",
    period: "Feb 2023 – Aug 2023",
    tech: ["MERN", "Next.js", "AWS S3", "Razorpay"],
    description:
      "Built a complete e-learning platform for JEE exam prep with SMS OTP auth, Razorpay payments, video CDN delivery via presigned URLs, and content protection.",
    liveLink: "https://www.dkacademy.co.in/",
    videoLink: "https://www.youtube.com/watch?v=DhFiQh6kYwI",
    type: "freelance",
  },
  {
    title: "IoT Device Control – BluElement",
    company: "AtmoSpark Technologies",
    role: "Full Stack Engineer",
    period: "Aug 2023 – Dec 2023",
    tech: ["MERN", "AWS IoT Core", "MQTT", "Socket.IO"],
    description:
      "Built end-to-end architecture for a device producing water from humidity — MQTT ingestion via AWS IoT Core, real-time frontend via Socket.IO, and remote device control.",
    liveLink: "https://atmsenergy.com/",
    videoLink: "https://www.youtube.com/watch?v=EcDrrhO9uQY",
    type: "freelance",
  },
  {
    title: "Astrologer-Client Communication",
    company: "Astro Vistaar",
    role: "Node Backend Developer",
    period: "Aug 2022 – Dec 2022",
    tech: ["Node.js", "WebSockets", "WebRTC", "Exotel", "AWS"],
    description:
      "Implemented real-time chat via WebSockets, video calls via WebRTC, and secure audio calls with phone masking through Exotel for a Kotlin Android app.",
    type: "internship",
  },
  {
    title: "Handwritten Equation Recognition",
    company: "Academic Project",
    role: "ML Engineer",
    period: "2024",
    tech: ["Python", "TensorFlow", "Keras", "ResNet-50", "Transformer"],
    description:
      "Deep learning model to detect and convert handwritten math equations to LaTeX. Used Attention-based Encoder (ResNet-50) + Decoder (Transformer) achieving maximum accuracy.",
    type: "project",
  },
  {
    title: "DATAHACK 1.0 – Domain Winner",
    company: "Hackathon",
    role: "Data Analyst",
    period: "Mar 2023",
    tech: ["XGBoost", "VGG", "Transfer Learning", "Web Scraping"],
    description:
      "Won Data Analytics domain by predicting used car prices with 98% accuracy using XGBoost and VGG for damage detection, with data scraped from CarWale & Cars24.",
    type: "hackathon",
  },
  {
    title: "Malware Prediction System – IEEE Paper",
    company: "IEEE ICBDS 2024",
    role: "Researcher",
    period: "Oct 2024",
    tech: ["Machine Learning", "Feature Analysis", "Python"],
    description:
      "Published research on a Malware Prediction System using ML algorithms for real-time malware detection. Featured in IEEE International Conference on Blockchain and Distributed Systems Security.",
    liveLink: "https://doi.org/10.1109/ICBDS61829.2024.10837246",
    type: "research",
  },
];

const typeColors: Record<string, string> = {
  freelance: "bg-emerald-50 text-emerald-700",
  internship: "bg-blue-50 text-blue-700",
  project: "bg-violet-50 text-violet-700",
  hackathon: "bg-amber-50 text-amber-700",
  research: "bg-rose-50 text-rose-700",
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="section-heading mb-4">
            Projects & <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subheading mx-auto">
            From freelance builds to corporate engineering — a collection of products I've shipped end-to-end.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`glass-card-hover rounded-2xl p-6 scroll-reveal ${
                index === 0 ? "md:col-span-2" : ""
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-2 ${
                      typeColors[project.type]
                    }`}
                  >
                    {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.company} · {project.role}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">
                  {project.period}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {(project.liveLink || project.videoLink) && (
                <div className="flex gap-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  )}
                  {project.videoLink && (
                    <a
                      href={project.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                    >
                      <Play size={14} />
                      Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
