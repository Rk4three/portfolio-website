"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Download, Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import SectionHeading from "@/components/SectionHeading"
import AnimatedSection from "@/components/AnimatedSection"
import HorizontalScroll from "@/components/HorizontalScroll"
import ProjectFrame from "@/components/ProjectFrame"

// ─── Data ────────────────────────────────────
interface Project {
  id: number
  title: string
  image: string
  techStack: string[]
  description: string
  githubUrl: string
  liveUrl: string
}

const allProjects: Project[] = [
  {
    id: 1,
    title: "AI Meeting Summarizer",
    image: "/project-1.png",
    techStack: ["React", "TypeScript", "Groq AI", "Deepgram"],
    description:
      "Transcribes meeting audio into structured summaries with identified speakers and extracted action items. Processes a 30-second recording in ~10 seconds end-to-end.",
    githubUrl: "https://github.com/Rk4three/ai-meeting-summarizer",
    liveUrl: "https://ai-meeting-summarizer-gray-seven.vercel.app/",
  },
  {
    id: 2,
    title: "AI Finance Tracker",
    image: "/project-2.png",
    techStack: ["Next.js", "TypeScript", "Supabase", "Groq AI"],
    description:
      "A personal finance dashboard for tracking transactions across 10+ categories, visualizing spending patterns, and querying finances through natural language.",
    githubUrl: "https://github.com/Rk4three/ai-finance-tracker",
    liveUrl: "https://ai-finance-tracker-steel.vercel.app/",
  },
  {
    id: 3,
    title: "Smart Resume Matcher",
    image: "/project-3.png",
    techStack: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    description:
      "Scores resume-to-job-description compatibility using multi-tier skill matching and AI-generated career gap analysis.",
    githubUrl: "https://github.com/Rk4three/smart-resume-matcher",
    liveUrl: "https://smart-resume-matcher.vercel.app/",
  },
  {
    id: 4,
    title: "MP3 Streamer",
    image: "/lrn-project-1.png",
    techStack: ["JavaScript", "PHP", "MS SQL", "Tailwind CSS"],
    description:
      "Synchronized audio broadcast system streaming to 10+ rooms simultaneously with 1-second polling and server-side latency compensation.",
    githubUrl: "https://github.com/Rk4three/lrn-mp3-streamer",
    liveUrl: "https://lrn-mp3-streamer.onrender.com",
  },
  {
    id: 5,
    title: "Item Request System",
    image: "/lrn-project-2.png",
    techStack: ["PHP", "MS SQL", "Tailwind CSS"],
    description:
      "Role-based item request approval workflow processing 1,000+ requests across 20+ departments with automated PDF reports.",
    githubUrl: "https://github.com/Rk4three/lrn-item-request",
    liveUrl: "https://lrn-item-request.onrender.com",
  },
  {
    id: 6,
    title: "Manager's Checklist System",
    image: "/lrn-project-3.png",
    techStack: ["PHP", "MS SQL", "Tailwind CSS"],
    description:
      "Duty manager scheduling system with shift-based calendar, photo-upload task verification, and auto-submission logic.",
    githubUrl: "https://github.com/Rk4three/lrn-manager-duties",
    liveUrl: "https://manager-duties-app.onrender.com/login.php",
  },
]

const skillCategories = [
  { title: "Languages", skills: ["JavaScript", "TypeScript", "Python", "PHP", "HTML", "CSS"] },
  { title: "Frameworks", skills: ["React", "Next.js", "FastAPI", "Node.js"] },
  { title: "Databases & Cloud", skills: ["PostgreSQL", "MySQL", "MS SQL", "Supabase", "Vercel", "Render", "DigitalOcean"] },
  { title: "Tools & APIs", skills: ["Git", "Docker", "Groq AI", "Deepgram"] },
]

const RESUME_URL = "/Rion_Kudo_Resume.pdf"

const sectionIds = ["work", "about", "experience", "skills", "contact"]

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

const ease = [0.22, 1, 0.36, 1] as const

// ─── Page ────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  // Active nav highlighting via Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -40% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const isActive = useCallback(
    (href: string) => href === `#${activeSection}`,
    [activeSection]
  )

  return (
    <main className="bg-black text-white min-h-screen">
      {/* ─── Nav ─────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.05 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.04]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          <a href="#" className="text-sm font-semibold tracking-tight">
            RION KUDO
          </a>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-mono text-[11px] tracking-[2px] uppercase transition-colors py-2 ${
                  isActive(link.href) ? "text-white/70" : "text-white/30 hover:text-white/60"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-[#8b5cf6] transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </div>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 -mr-2 text-white/50 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease }}
              className="md:hidden border-t border-white/[0.04] bg-black/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-xs tracking-[2px] uppercase text-white/40 hover:text-white/70 transition-colors py-3"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── Hero (01) ───────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-14">
        {/* Left accent line */}
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8b5cf6]/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="pl-6 lg:pl-10 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="text-[#8b5cf6] font-mono text-[11px] tracking-[3px] uppercase mb-6"
            >
              Full-stack Developer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              I build things that
              <br />
              think for themselves.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="text-sm md:text-base text-white/35 leading-relaxed max-w-md mb-10"
            >
              Full-stack developer specializing in React, TypeScript, and
              AI-powered applications. Turning complex problems into clean,
              intelligent solutions.
            </motion.p>

            <motion.a
              href="#work"
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.65 }}
              className="inline-flex items-center gap-3 group"
            >
              <span className="w-10 h-10 rounded-full border border-[#8b5cf6]/30 flex items-center justify-center group-hover:border-[#8b5cf6]/60 group-hover:scale-105 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-[#8b5cf6]" />
              </span>
              <span className="font-mono text-[11px] tracking-[2px] uppercase text-white/30 group-hover:text-white/60 transition-colors">
                View Work
              </span>
            </motion.a>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─── Work (02) ───────────────────────── */}
      <section id="work" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading number="02" title="Selected Work" />
        </div>
        <HorizontalScroll>
          {allProjects.map((project, i) => (
            <ProjectFrame
              key={project.id}
              number={String(i + 1).padStart(2, "0")}
              total={String(allProjects.length).padStart(2, "0")}
              title={project.title}
              description={project.description}
              stack={project.techStack}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              image={project.image}
              priority={i === 0}
            />
          ))}
        </HorizontalScroll>
      </section>

      {/* ─── About (03) ──────────────────────── */}
      <AnimatedSection id="about" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading number="03" title="About" />
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            <div className="flex-1 max-w-lg">
              <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed mb-6">
                I&apos;m a computer science student at Holy Angel University in the Philippines,
                graduating April 2026. I gravitate toward building tools that use AI to
                solve real, everyday problems.
              </p>
              <p className="text-sm text-white/35 leading-relaxed mb-8">
                Most recently, I interned at La Rose Noire as a full-stack developer,
                where I shipped production systems handling multiple requests across
                departments. When I&apos;m not coding, you can see me playing a variety of games and some sports such as basketball. I also love collecting toys and TCGs!
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Rk4three"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 -m-2 text-white/25 hover:text-white/60 hover:scale-110 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/rion-kudo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 -m-2 text-white/25 hover:text-white/60 hover:scale-110 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:Rionkudo3@gmail.com"
                  className="p-2 -m-2 text-white/25 hover:text-white/60 hover:scale-110 transition-all duration-200"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-white/[0.08]">
                <Image
                  src="/rion-kudo-picture.jpg"
                  alt="Rion Kudo"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Experience (04) ─────────────────── */}
      <AnimatedSection id="experience" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading number="04" title="Experience" />

          <div className="max-w-2xl">
            {/* Internship */}
            <div className="border-l border-[#8b5cf6]/15 pl-6 md:pl-8 mb-12">
              <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                Full-stack Developer Intern
              </h3>
              <div className="font-mono text-[11px] text-[#8b5cf6] tracking-wide mb-4">
                La Rose Noire — Dec 2025 – Mar 2026
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-white/35 leading-relaxed">
                  Built a role-based item request approval workflow processing 1,000+ requests across 20+ departments.
                </li>
                <li className="text-sm text-white/35 leading-relaxed">
                  Developed a synchronized audio broadcast system streaming to 10+ rooms simultaneously.
                </li>
                <li className="text-sm text-white/35 leading-relaxed">
                  Implemented a duty manager scheduling system with shift-based calendar and photo-upload verification.
                </li>
                <li className="text-sm text-white/35 leading-relaxed">
                  Developed a Python automation script to execute the 2–3 startup commands required to bring the internal server online, eliminating full service outages during IT staff absence or post-update restarts and saving +$100/year in Termius Pro licensing costs.
                </li>
                <li className="text-sm text-white/35 leading-relaxed">
                  Built a real-time employee attendance system integrating Hikvision face-recognition terminals with a Node.js WebSocket server, processing live scan events for 1,000+ employees to track event headcount and token/treat claims with zero manual tallying.
                </li>
              </ul>
            </div>

            {/* Education */}
            <div className="border-l border-white/[0.06] pl-6 md:pl-8">
              <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                BS in Computer Science
              </h3>
              <div className="font-mono text-[11px] text-white/30 tracking-wide">
                Holy Angel University — Graduating April 2026
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Skills (05) ─────────────────────── */}
      <AnimatedSection id="skills" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading number="05" title="Skills" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 max-w-4xl">
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <div className="font-mono text-[10px] text-white/20 tracking-[2px] uppercase mb-4">
                  {cat.title}
                </div>
                <div className="space-y-2">
                  {cat.skills.map((skill) => (
                    <div key={skill} className="text-sm text-white/45">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Contact (06) ────────────────────── */}
      <AnimatedSection id="contact" className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading number="06" title="Contact" />

          <div className="max-w-lg">
            <p className="text-3xl md:text-4xl font-light text-white leading-tight mb-6">
              Let&apos;s build something
              <br />
              together.
            </p>
            <a
              href="mailto:Rionkudo3@gmail.com"
              className="text-[#8b5cf6] text-sm md:text-base tracking-wide hover:text-[#a78bfa] transition-colors"
            >
              Rionkudo3@gmail.com
            </a>

            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://github.com/Rk4three"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[1px] text-white/25 hover:text-white/50 transition-colors py-2 px-1"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/rion-kudo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-[1px] text-white/25 hover:text-white/50 transition-colors py-2 px-1"
              >
                LinkedIn
              </a>
              <a
                href={RESUME_URL}
                download="Rion_Kudo_Resume.pdf"
                className="font-mono text-[11px] tracking-[1px] text-white/25 hover:text-white/50 transition-colors inline-flex items-center gap-1.5 py-2 px-1"
              >
                <Download className="w-3 h-3" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── Footer ──────────────────────────── */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[10px] text-white/15 tracking-wide">
            © 2026 Rion Kudo
          </span>
          <span className="font-mono text-[10px] text-white/10 tracking-wide">
            Built with Next.js & Tailwind
          </span>
        </div>
      </footer>
    </main>
  )
}
