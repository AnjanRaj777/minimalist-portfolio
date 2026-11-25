"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "certifications", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => {
                const el = document.getElementById(section)
                if (el) {
                  el.classList.add("animate-fade-in-up")
                  setActiveSection(section)
                  el.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2026</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Anjan <span className="text-muted-foreground">P</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Full-Stack Software Developer &amp; AI / Data Science Enthusiast building
                  <span className="text-foreground"> AI-powered applications</span>,
                  <span className="text-foreground"> real-time voice &amp; RAG pipelines</span>, and
                  <span className="text-foreground"> scalable web platforms</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Bengaluru, India</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">B.E. in Computer Science</div>
                  <div className="text-muted-foreground">@ City Engineering College</div>
                  <div className="text-xs text-muted-foreground">2023 — 2027 (Ongoing)</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Next.js / React", "TypeScript", "Python", "AI & RAG / Voice", "Data Science", "PostgreSQL"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
              <div className="text-sm text-muted-foreground font-mono">SELECTED WORK</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  index: "01",
                  title: "InterVibe — Voice-First AI Mock Interview Copilot",
                  subtitle: "Meta Global AI Developer Hackathon",
                  description:
                    "Autonomous, voice-driven mock interview copilot calibrated to a candidate's resume and target JD. Features a sub-second bidirectional WebSocket voice loop (muse-voice-transcribe-1.0), a state-machine prep planner, a 5-dimension rubric scoring gate with STAR exports, and hybrid client/cloud TTS.",
                  tech: [
                    "Next.js 16",
                    "React 19",
                    "TypeScript",
                    "Hono",
                    "Supabase",
                    "MinIO/S3",
                    "Meta Muse Spark 1.3",
                    "Kokoro WebGPU",
                    "Groq Orpheus",
                  ],
                  github: "https://github.com/AnjanRaj777/InterVibe",
                  live: "https://inter-vibe.vercel.app/",
                },
                {
                  index: "02",
                  title: "Ask the Author — Spoiler-Protected RAG Book Chat & Club",
                  subtitle: "Full-Stack RAG Platform",
                  description:
                    "Retrieval-Augmented Generation web app enabling readers to converse with AI author personas grounded in actual book passages with chapter-level citations. Includes progress-aware spoiler protection, PDF/EPUB/TXT ingestion with Voyage AI embeddings, Supabase SSR auth with RLS, and shared Book Club rooms.",
                  tech: [
                    "Next.js 15",
                    "React 19",
                    "TypeScript",
                    "Tailwind CSS v4",
                    "Supabase",
                    "pgvector",
                    "Anthropic Claude",
                    "Voyage AI",
                  ],
                  github: "https://github.com/AnjanRaj777/ask-the-author",
                },
                {
                  index: "03",
                  title: "SkillMirror — AI-Powered Career Prep & Skill Gap Platform",
                  subtitle: "Full-Stack Career Readiness Platform",
                  description:
                    "Co-developed career platform (100+ commits) for diagnosing skill gaps, optimizing resumes, and generating personalized learning roadmaps. Integrates Groq LLM API for AI challenges and mock interviews, an in-browser Monaco Editor (Python, JS, SQL), and hardened security against SSRF, IDOR, and 2FA brute-force.",
                  tech: [
                    "React.js",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "Python",
                    "Groq LLM API",
                    "Monaco Editor",
                    "Vercel",
                  ],
                  github: "https://github.com/Varunmj12345/skillmirror",
                  live: "https://skillmirror-puce.vercel.app",
                },
                {
                  index: "04",
                  title: "Uta — Data-Driven Music Discovery & Recommendation Engine",
                  subtitle: "Full-Stack Media & Recommendation",
                  description:
                    "Full-stack media discovery platform integrating the YouTube Data API v3 to collect and process audio/video metadata. Features a content-based recommendation engine, a custom caching layer and debounced query handler (~40% faster search), and MongoDB behavioral modeling.",
                  tech: ["Python", "Pandas", "React.js", "Node.js", "MongoDB", "YouTube Data API v3"],
                },
                {
                  index: "05",
                  title: "Bengaluru House Price Analysis & Predictive Insights",
                  subtitle: "Data Science & EDA",
                  description:
                    "Exploratory data analysis on 13,000+ real estate housing records to identify valuation drivers across Bengaluru neighborhoods. Built automated data cleaning pipelines with z-score and IQR outlier filtering, and visualized spatial and price-per-square-foot market trends.",
                  tech: ["Python", "Pandas", "NumPy", "SciPy", "Seaborn", "Matplotlib"],
                  github: "https://github.com/AnjanRaj777/house-price-prediction-model.git",
                },
                {
                  index: "06",
                  title: "HotKey — System Input Automation & Profile Utility",
                  subtitle: "Desktop Automation Utility",
                  description:
                    "Lightweight (~50 MB) desktop utility for real-time keystroke capture, automated text expansion, and custom keyboard macro mapping. Features a JSON-driven profile persistence engine using PyAutoGUI for low-latency input simulation and instant profile switching.",
                  tech: ["Python", "Tkinter", "PyAutoGUI", "JSON"],
                  github: "https://github.com/AnjanRaj777/HotKey.git",
                },
              ].map((project) => (
                <div
                  key={project.index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light font-mono text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {project.index}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{project.title}</h3>
                      <div className="text-sm text-muted-foreground">{project.subtitle}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{project.description}</p>
                    {(project.github || project.live) && (
                      <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
                        {project.live && (
                          <Link
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-muted-foreground underline underline-offset-4 transition-colors duration-300"
                          >
                            Live Demo ↗
                          </Link>
                        )}
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors duration-300"
                          >
                            GitHub ↗
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap content-start gap-2 lg:justify-end mt-2 lg:mt-0">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground border border-border/60 rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "The Future of Web Development",
                  excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
                  date: "Dec 2024",
                  readTime: "5 min",
                },
                {
                  title: "Design Systems at Scale",
                  excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
                  date: "Nov 2024",
                  readTime: "8 min",
                },
                {
                  title: "Performance-First Development",
                  excerpt: "Why performance should be a first-class citizen in your development workflow.",
                  date: "Oct 2024",
                  readTime: "6 min",
                },
                {
                  title: "The Art of Code Review",
                  excerpt: "Building better software through thoughtful and constructive code reviews.",
                  date: "Sep 2024",
                  readTime: "4 min",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="certifications"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Certifications</h2>
              <div className="text-sm text-muted-foreground font-mono">COURSERA / 2026</div>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {[
                {
                  title: "Databases and SQL for Data Science with Python",
                  issuer: "Coursera",
                  year: "2026",
                  skills: ["SQL", "Python", "Relational Databases", "Data Querying"],
                },
                {
                  title: "Python Project for Data Science",
                  issuer: "Coursera",
                  year: "2026",
                  skills: ["Python", "Data Extraction", "Web Scraping", "Dashboards"],
                },
                {
                  title: "Python for Data Science, AI & Development",
                  issuer: "Coursera",
                  year: "2026",
                  skills: ["Python", "Pandas", "NumPy", "APIs"],
                },
                {
                  title: "Data Science Methodology",
                  issuer: "Coursera",
                  year: "2026",
                  skills: ["Problem Framing", "EDA", "Modeling", "Evaluation"],
                },
                {
                  title: "Tools for Data Science",
                  issuer: "Coursera",
                  year: "2026",
                  skills: ["Jupyter", "GitHub", "Data Science Ecosystem", "Open Source Tools"],
                },
              ].map((cert, index) => (
                <div
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg flex flex-col justify-between gap-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{cert.issuer}</span>
                      <span>{cert.year}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs text-muted-foreground border border-border rounded group-hover:border-muted-foreground/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and
                  development.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:anjanraj2000@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">anjanraj2000@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <div className="text-sm text-muted-foreground">Phone: +91-9742679606</div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "AnjanRaj777", url: "https://github.com/AnjanRaj777" },
                  {
                    name: "LinkedIn",
                    handle: "anjan-p-aab740326",
                    url: "https://www.linkedin.com/in/anjan-p-aab740326/",
                  },
                  { name: "Email", handle: "anjanraj2000@gmail.com", url: "mailto:anjanraj2000@gmail.com" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className={`${social.name === "Email" ? "text-xs" : "text-sm"} text-muted-foreground`}>
                        {social.handle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2026 Anjan P. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with Next.js &amp; Tailwind CSS</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
