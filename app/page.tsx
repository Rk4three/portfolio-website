"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  X,
  Code,
  Database,
  Wrench,
  Brain,
  Users,
  Lightbulb,
  Target,
  Shield,
  Zap,
  MapPin,
  Copy,
  Check,
  Download,
  FileText,
  Cloud,
  Brush,
  Settings,
} from "lucide-react"
import Image from "next/image"

const MotionDialogContent = motion(DialogContent as any)

// ──────────────────────────────────────
// Emerald Meteor Background Component
// ──────────────────────────────────────
function MeteorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    interface Meteor {
      x: number
      y: number
      speed: number
      length: number
      thickness: number
      opacity: number
    }

    const meteors: Meteor[] = []
    const meteorCount = 20 

    const spawnMeteor = (init = false): Meteor => {
      let startX, startY;
      
      if (init) {
        startX = Math.random() * canvas.width * 1.5 - canvas.width * 0.2
        startY = Math.random() * canvas.height * 1.5 - canvas.height * 0.5
      } else {
        if (Math.random() > 0.5) {
          startX = Math.random() * canvas.width * 1.5 
          startY = -100 - Math.random() * 100
        } else {
          startX = canvas.width + 100 + Math.random() * 100
          startY = Math.random() * canvas.height * 1.2 - canvas.height * 0.2
        }
      }

      return {
        x: startX,
        y: startY,
        speed: 2 + Math.random() * 3, 
        length: 100 + Math.random() * 80,
        thickness: 1 + Math.random() * 1.5,
        opacity: 0.4 + Math.random() * 0.4,
      }
    }

    for (let i = 0; i < meteorCount; i++) {
      meteors.push(spawnMeteor(true))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      meteors.forEach((m, index) => {
        const tailX = m.x + m.length
        const tailY = m.y - m.length

        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`)
        gradient.addColorStop(0.1, `rgba(16, 185, 129, ${m.opacity})`)
        gradient.addColorStop(1, "rgba(16, 185, 129, 0)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = m.thickness
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(m.x, m.y, m.thickness * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${m.opacity})`
        ctx.shadowBlur = 10
        ctx.shadowColor = "rgba(16, 185, 129, 1)"
        ctx.fill()
        ctx.shadowBlur = 0 

        m.x -= m.speed
        m.y += m.speed

        if (m.x < -200 || m.y > canvas.height + 200) {
          meteors[index] = spawnMeteor()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }} 
    />
  )
}

interface Project {
  id: number
  title: string
  image: string
  techStack: string[]
  description: string
  githubUrl: string
  liveUrl: string
}

// Personal Projects
const personalProjects: Project[] = [
  {
    id: 1,
    title: "AI Meeting Summarizer",
    image: "/project-1.png",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Vercel (edge)",
      "Groq AI",
      "Deepgram",
    ],
    description:
      "This is a portfolio project demonstrating a full-stack web application that leverages AI to enhance meeting productivity. The application can transcribe audio from meetings, identify speakers, and generate actionable summaries.",
    githubUrl: "https://github.com/Rk4three/ai-meeting-summarizer",
    liveUrl: "https://ai-meeting-summarizer-gray-seven.vercel.app/",
  },
  {
    id: 2,
    title: "AI Finance Tracker",
    image: "/project-2.png",
    techStack: [
      "TypeScript",
      "React",
      "Supabase",
      "Tailwind CSS",
      "Shadcn/ui",
      "Groq AI",
      "Vercel",
    ],
    description:
      "A personal finance tracker featuring an AI assistant. Built with React and TypeScript, this app allows users to import transactions via CSV, visualize spending with interactive charts, and ask questions in natural language.",
    githubUrl: "https://github.com/Rk4three/ai-finance-tracker",
    liveUrl: "https://ai-finance-tracker-steel.vercel.app/",
  },
  {
    id: 3,
    title: "Smart Resume Matcher",
    image: "/project-3.png",
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "Supabase",
      "PostgreSQL",
      "Railway",
      "Vercel",
      "Docker",
      "Groq AI",
    ],
    description:
      "A smart, AI-powered tool that analyzes a resume against a job description to provide an instant compatibility score, highlighting matched skills, identifying gaps, and offering actionable suggestions.",
    githubUrl: "https://github.com/Rk4three/smart-resume-matcher",
    liveUrl: "https://smart-resume-matcher.vercel.app/",
  },
]

// Internship Projects
const internshipProjects: Project[] = [
  {
    id: 101,
    title: "MP3 Streamer",
    image: "/placeholder.svg",
    techStack: [
      "PHP",
      "MsSQL",
      "Tailwind CSS",
    ],
    description:
      "Developed an internal inventory management system for tracking assets, supplies, and equipment. Features include barcode scanning, automated low-stock alerts, and comprehensive reporting dashboards.",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 102,
    title: "Item Request System",
    image: "/placeholder.svg",
    techStack: [
      "PHP",
      "MsSQL",
      "Tailwind CSS",
    ],
    description:
      "Built a web-based scheduling system for managing employee shifts, time-off requests, and duty assignments. Includes real-time notifications and calendar integration.",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 103,
    title: "Manager's Checklist System",
    image: "/placeholder.svg",
    techStack: [
      "PHP",
      "MsSQL",
      "Tailwind CSS",
    ],
    description:
      "Created an automated document processing pipeline that extracts data from scanned documents using OCR, validates information, and stores structured data for reporting and analysis.",
    githubUrl: "#",
    liveUrl: "#",
  },
]

const techCategories = [
  {
    title: "Languages & Frameworks",
    icon: <Code className="w-5 h-5" />,
    skills: ["HTML", "CSS", "JavaScript/TypeScript", "React", "Python", "PHP"],
  },
  {
    title: "Styling & Tooling",
    icon: <Brush className="w-5 h-5" />,
    skills: ["Tailwind CSS", "Shadcn/ui"],
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    skills: ["MySQL", "MS SQL","PostgreSQL", "Supabase"],
  },
  {
    title: "Cloud",
    icon: <Cloud className="w-5 h-5" />,
    skills: ["DigitalOcean", "Vercel", "Railway"],
  },
  {
    title: "Developer Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: ["Git", "GitHub", "Docker", "VS Code"],
  },
  {
    title: "APIs & Services",
    icon: <Settings className="w-5 h-5" />,
    skills: ["Groq AI", "Deepgram"],
  },
]

const softSkills = [
  { name: "Problem-Solving", icon: <Target className="w-4 h-4" /> },
  { name: "Adaptability", icon: <Zap className="w-4 h-4" /> },
  { name: "Creative Thinking", icon: <Lightbulb className="w-4 h-4" /> },
  { name: "Collaboration", icon: <Users className="w-4 h-4" /> },
  { name: "Self-Discipline", icon: <Shield className="w-4 h-4" /> },
  { name: "Resilience", icon: <Brain className="w-4 h-4" /> },
]

const RESUME_URL = "/Rion_Kudo_Resume.pdf"

const contactInfo = [
  {
    type: "email",
    label: "Email",
    value: "rioncal@gmail.com",
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:rioncal@gmail.com",
  },
  {
    type: "github",
    label: "GitHub",
    value: "github.com/Rk4three",
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/Rk4three",
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/rion-kudo",
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/rion-kudo-a6ab76248/",
  },
  {
    type: "resume",
    label: "Resume",
    value: "",
    icon: <FileText className="w-5 h-5" />,
    href: RESUME_URL,
  },
]

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [copiedContact, setCopiedContact] = useState<string | null>(null)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedContact(type)
      setTimeout(() => setCopiedContact(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(16, 185, 129, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(16, 185, 129, 0.5);
        }
      `}</style>

      <div className="h-screen bg-[#0b1a1f] text-white overflow-hidden relative font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
        
        <MeteorBackground />

        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-900/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-blue-900/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative z-10 h-full flex flex-col lg:flex-row"
        >
          
          {/* Sidebar */}
          <motion.div
            variants={itemVariants}
            className="
              w-full lg:w-80 shrink-0 
              bg-slate-900/80 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-700/50 
              flex flex-col lg:h-full z-20 shadow-2xl
            "
          >
            <div className="p-6 lg:p-8 flex flex-col justify-center h-full overflow-y-auto custom-scrollbar">
                
                <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="relative mb-6 mx-auto"
                >
                <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 relative group">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all duration-500" />
                    
                    <Image
                    src="/rion-kudo-picture.jpg"
                    alt="Rion Kudo"
                    width={160}
                    height={160}
                    className="relative z-10 rounded-2xl shadow-2xl border border-emerald-500/20 w-full h-full object-cover"
                    />
                    
                    <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-3 rounded-2xl border border-dashed border-emerald-500/30 z-0"
                    />
                </div>
                </motion.div>

                <motion.h1 variants={itemVariants} className="text-2xl lg:text-3xl font-bold text-white mb-2 text-center tracking-tight">
                Rion Kudo
                </motion.h1>
                <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-emerald-400 mb-8">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Angeles City, Pampanga</span>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3">
                {contactInfo.map((contact) => {
                    const isResume = contact.type === "resume"
                    return (
                    <motion.div key={contact.type} whileHover={{ scale: 1.02 }} className="group">
                        <div
                        className="bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-emerald-500/30 rounded-lg p-3 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                        onClick={isResume ? () => setIsResumeOpen(true) : undefined}
                        >
                        <div className="flex items-center justify-between">
                            {isResume ? (
                            <div className="flex flex-1 items-center justify-center gap-3">
                                <div className="text-emerald-400 group-hover:scale-110 transition-transform">
                                {contact.icon}
                                </div>
                                <div className="text-center">
                                <div className="text-sm font-semibold text-white">View Resume</div>
                                </div>
                            </div>
                            ) : (
                            <a href={contact.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="text-emerald-400 group-hover:scale-110 transition-transform">
                                {contact.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{contact.label}</div>
                                <div className="text-slate-200 text-sm font-medium truncate">{contact.value}</div>
                                </div>
                            </a>
                            )}
                            {!isResume && (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(contact.value, contact.type)
                                }}
                                className="text-slate-500 hover:text-emerald-400 transition-colors p-1.5"
                            >
                                {copiedContact === contact.type ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </motion.button>
                            )}
                        </div>
                        </div>
                    </motion.div>
                    )
                })}
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-emerald-400/90 tracking-wide">Available for Work and Opportunities</span>
                </motion.div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-900/20">
            <div className="max-w-5xl mx-auto p-4 sm:p-8 lg:p-12 space-y-12 lg:space-y-20 pb-20">
              
              {/* About Me */}
              <motion.section variants={itemVariants}>
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white tracking-tight pb-2 border-b border-slate-700/60 w-fit">About Me</h2>
                </div>
                <motion.div whileHover={{ scale: 1.01 }} className="group">
                  <Card className="bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-emerald-500/20 transition-all duration-500 shadow-xl">
                    <CardContent className="p-6 lg:p-8">
                      <p className="text-base lg:text-lg leading-loose text-slate-300 font-light">
                        I'm a 4th-year Computer Science student passionate about Artificial Intelligence,
                        Machine Learning, and software engineering. Skilled in Python, React, and SQL, I
                        enjoy building projects that turn ideas into practical solutions.
                        <br /><br />
                        As I prepare for my internship and future career in tech, I'm eager to apply my
                        skills in real-world settings, contribute to innovative teams, and continue growing
                        as a problem-solver.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.section>

              {/* Tech Stack */}
              <motion.section variants={itemVariants}>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight pb-2 border-b border-slate-700/60 w-fit">Tech Stack</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {techCategories.map((category, index) => (
                    <motion.div
                      key={category.title}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      className="group"
                    >
                      <Card className="h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-emerald-500/20 transition-all duration-300">
                        <CardContent className="p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:text-emerald-300 group-hover:bg-emerald-500/20 transition-colors">
                              {category.icon}
                            </div>
                            <h3 className="font-semibold text-slate-100">
                              {category.title}
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="bg-slate-800/50 text-slate-300 border-slate-700/50 hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-500/20 transition-all"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Soft Skills */}
              <motion.section variants={itemVariants}>
                 <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight pb-2 border-b border-slate-700/60 w-fit">Soft Skills</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      className="group"
                    >
                      <div className="h-full p-4 flex flex-col items-center justify-center text-center bg-slate-900/40 border border-slate-800 rounded-xl hover:border-emerald-500/30 hover:bg-emerald-900/5 transition-all duration-300 cursor-default">
                          <div className="text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
                            {skill.icon}
                          </div>
                          <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                            {skill.name}
                          </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Projects */}
              <motion.section variants={itemVariants}>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight pb-2 border-b border-slate-700/60 w-fit">Projects</h2>
                </div>

                {/* Personal Projects */}
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-emerald-400 mb-6 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Personal Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {personalProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layoutId={`project-${project.id}`}
                        whileHover={{ y: -8 }}
                        onClick={() => setSelectedProject(project)}
                        className="group cursor-pointer h-full"
                      >
                        <Card className="h-full flex flex-col overflow-hidden bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/20">
                          <CardContent className="flex-1 flex flex-col p-0">
                            
                            <div className="relative w-full h-48 overflow-hidden border-b border-slate-800">
                               <Image
                                  src={project.image || "/placeholder.svg"}
                                  alt={project.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                               />
                               <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-0 group-hover:text-emerald-400 transition-colors">
                                    {project.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mt-4">
                                  {project.techStack.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="outline"
                                      className="text-xs py-1 px-2 border-slate-700 text-slate-400 group-hover:border-emerald-500/30 group-hover:text-emerald-300"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Internship Projects */}
                <div>
                  <h3 className="text-xl font-semibold text-emerald-400 mb-6 flex items-center gap-2">
                    <Wrench className="w-5 h-5" />
                    Internship Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {internshipProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layoutId={`project-${project.id}`}
                        whileHover={{ y: -8 }}
                        onClick={() => setSelectedProject(project)}
                        className="group cursor-pointer h-full"
                      >
                        <Card className="h-full flex flex-col overflow-hidden bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/20">
                          <CardContent className="flex-1 flex flex-col p-0">
                            
                            <div className="relative w-full h-48 overflow-hidden border-b border-slate-800">
                               <Image
                                  src={project.image || "/placeholder.svg"}
                                  alt={project.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                               />
                               <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-white mb-0 group-hover:text-emerald-400 transition-colors">
                                    {project.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mt-4">
                                  {project.techStack.map((tech) => (
                                    <Badge
                                      key={tech}
                                      variant="outline"
                                      className="text-xs py-1 px-2 border-slate-700 text-slate-400 group-hover:border-emerald-500/30 group-hover:text-emerald-300"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.footer className="text-center pt-8 border-t border-slate-800/50">
                <p className="text-slate-500 text-sm">
                  © {new Date().getFullYear()} Rion Kudo. Built with <span className="text-emerald-500">React</span> & <span className="text-emerald-500">Tailwind</span>.
                </p>
              </motion.footer>
            </div>
          </div>
        </motion.div>

        {/* Project Dialog */}
        <AnimatePresence>
          {selectedProject && (
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
              <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-0 overflow-hidden shadow-2xl">
                
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="flex items-center justify-between text-white">
                    <span className="text-2xl font-bold text-emerald-400">{selectedProject.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                      className="text-slate-400 hover:text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700/50 shadow-lg">
                    <Image
                      src={selectedProject.image || "/placeholder.svg"}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-slate-300 leading-relaxed text-base">
                    {selectedProject.description}
                  </p>

                  <div className="flex gap-4 pt-2">
                    <Button asChild className="flex-1 bg-white text-slate-900 hover:bg-emerald-50 font-semibold">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-emerald-500/50 text-emerald-400 hover:bg-emerald-950 hover:text-emerald-300"
                    >
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

        {/* Resume Dialog */}
        <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
            <MotionDialogContent
              className="max-w-[95vw] sm:max-w-4xl h-[85vh] p-0 bg-slate-900 border border-slate-700 overflow-hidden flex flex-col"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <DialogHeader className="px-4 py-3 border-b border-slate-800 bg-slate-900/50 flex flex-row items-center justify-between">
                 <DialogTitle className="text-lg font-semibold text-white pl-2">Resume Preview</DialogTitle>
                 <div className="flex gap-2">
                    <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <a href={RESUME_URL} download="Rion_Kudo_Resume.pdf">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </a>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsResumeOpen(false)}
                        className="text-slate-400 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>
              </DialogHeader>

              <div className="flex-1 w-full bg-slate-800 overflow-hidden relative">
                <iframe
                    src={RESUME_URL}
                    className="w-full h-full"
                    style={{ border: "none" }}
                />
              </div>
            </MotionDialogContent>
        </Dialog>

      </div>
    </>
  )
}
