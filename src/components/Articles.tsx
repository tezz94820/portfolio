import { ExternalLink, BookOpen } from "lucide-react";

const articles = [
  {
    title: "In-Depth Guide to ETag, If-Match, and If-None-Match Headers in Node.js and React",
    link:"https://medium.com/@tejasitankar94820/in-depth-guide-to-etag-if-match-and-if-none-match-headers-in-node-js-and-react-69727f478d46?sk=13e70df3241cfc2e0429192c52c313ee",
    description:
      "A comprehensive deep dive into HTTP caching mechanisms, explaining how ETags work with practical Node.js and React implementations.",
    tags: ["Node.js", "React", "HTTP", "Caching"],
  },
  {
    title: "How WhatsApp Makes Links Come to Life: A Developer's Guide to OG Metadata Scraping in NodeJS",
    link:"https://medium.com/@tejasitankar94820/how-whatsapp-makes-links-come-to-life-a-developers-guide-to-og-metadata-scraping-in-nodejs-140a06ef7cde?sk=8d3bdbaecfcc9ad4a9360f5342d75c1d",
    description:
      "Exploring how link previews work behind the scenes, with a hands-on guide to building an OG metadata scraper in Node.js.",
    tags: ["Node.js", "Web Scraping", "Open Graph"],
  },
];

const Articles = () => {
  return (
    <section id="articles" className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="section-heading mb-4">
            Technical <span className="gradient-text">Articles</span>
          </h2>
          <p className="section-subheading mx-auto">
            I write on Medium to simplify complex concepts for developers — covering web dev, cloud, and best practices.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {articles.map((article, index) => (
            <div
              key={article.title}
              className="glass-card-hover rounded-2xl p-6 scroll-reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mt-1">
                  <BookOpen size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2 leading-snug hover:cursor-pointer hover:text-primary"
                    onClick={() => window.open(article.link, "_blank")}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {article.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 scroll-reveal">
          <a
            href="https://medium.com/@tejasitankar94820"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <ExternalLink size={16} />
            Read More on Medium
          </a>
        </div>
      </div>
    </section>
  );
};

export default Articles;
