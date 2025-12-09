"use client"

import { useState, useEffect } from "react"
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

interface Project {
  id: number
  title: string
  image: string
  techStack: string[]
  description: string
  githubUrl: string
  liveUrl: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Meeting Summarizer",
    image: "/project-1.png",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Vercel (including edge functions)",
      "Groq AI",
      "Deepgram",
    ],
    description:
      "This is a portfolio project demonstrating a full-stack web application that leverages AI to enhance meeting productivity. The application can transcribe audio from meetings (from file uploads or live recordings), identify different speakers, and generate a structured, actionable summary of the conversation.",
    githubUrl: "https://github.com/Rk4three/ai-meeting-summarizer",
    liveUrl: "https://ai-meeting-summarizer-gray-seven.vercel.app/",
  },
  {
    id: 2,
    title: "AI Finance Tracker",
    image: "project-2.png",
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
      "A personal finance tracker featuring an AI assistant. Built with React and TypeScript, this app allows users to import transactions via CSV, visualize spending with interactive charts, and ask questions in natural language using Groq AI. The backend is powered by a Supabase Deno Edge Function.",
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
      "JavaScript",
      "React",
      "HTML",
      "CSS",
      "Supabase",
      "PostgreSQL",
      "Railway",
      "Vercel",
      "Docker",
      "Tailwind CSS",
      "Groq AI",
    ],
    description:
      "A smart, AI-powered tool that analyzes a resume against a job description to provide an instant compatibility score, highlighting matched skills, identifying gaps, and offering actionable suggestions for improvement.",
    githubUrl: "https://github.com/Rk4three/smart-resume-matcher",
    liveUrl: "https://smart-resume-matcher.vercel.app/",
  },
]

const techCategories = [
  {
    title: "Languages & Frameworks",
    icon: <Code className="w-5 h-5" />,
    skills: ["HTML", "CSS", "JavaScript/TypeScript", "React", "Python"],
  },
  {
    title: "Styling & Tooling",
    icon: <Brush className="w-5 h-5" />,
    skills: ["Tailwind CSS", "Shadcn/ui"],
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    skills: ["MySQL", "PostgreSQL", "Supabase"],
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
    color: "emerald",
    href: "mailto:rion.kudo@gmail.com",
  },
  {
    type: "github",
    label: "GitHub",
    value: "github.com/Rk4three",
    icon: <Github className="w-5 h-5" />,
    color: "slate",
    href: "https://github.com/Rk4three",
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/rion-kudo",
    icon: <Linkedin className="w-5 h-5" />,
    color: "blue",
    href: "https://www.linkedin.com/in/rion-kudo-a6ab76248/",
  },
  {
    type: "resume",
    label: "Resume",
    value: "",
    icon: <FileText className="w-5 h-5" />,
    color: "blue",
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-950 relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 min-h-screen"
      >
        <div className="block lg:flex min-h-screen">
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-80 bg-slate-900/80 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-700/50 p-4 sm:p-6 lg:p-8 flex flex-col justify-center lg:sticky lg:top-0 lg:h-screen"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative mb-6 lg:mb-8"
            >
              <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto relative">
                <Image
                  src="rion-kudo-picture.jpg"
                  alt="Rion Kudo"
                  width={160}
                  height={160}
                  className="rounded-2xl shadow-2xl border-2 border-emerald-400/30 w-full h-full object-cover"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute -inset-2 rounded-2xl border border-dashed border-emerald-400/40"
                />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 text-center"
            >
              Rion Kudo
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-emerald-300 mb-6 lg:mb-8"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Angeles City, Pampanga</span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3 lg:space-y-4">
              {contactInfo.map((contact) => {
                const isResume = contact.type === "resume"

                return (
                  <motion.div
                    key={contact.type}
                    whileHover={{ scale: 1.02, x: 8 }}
                    className="group"
                  >
                    <div
                      className="bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/50 hover:border-emerald-400/50 rounded-xl p-3 lg:p-4 transition-all duration-300 cursor-pointer"
                      onClick={isResume ? () => setIsResumeOpen(true) : undefined}
                    >
                      <div className="flex items-center justify-between">
                        {isResume ? (
                          <div className="flex flex-1 min-w-0 items-center justify-center gap-3">
                            <div className="text-emerald-400 group-hover:scale-110 transition-transform">
                              {contact.icon}
                            </div>
                            <div className="min-w-0 flex-1 text-center">
                              <div className="text-sm font-semibold text-white">
                                {contact.label}
                              </div>
                              <div className="text-xs text-slate-400">View & download</div>
                            </div>
                          </div>
                        ) : (
                          <a
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 flex-1 min-w-0"
                          >
                            <div className="text-emerald-400 group-hover:scale-110 transition-transform">
                              {contact.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs text-slate-400 uppercase tracking-wide">
                                {contact.label}
                              </div>
                              <div className="text-white text-sm font-medium break-all sm:truncate">
                                {contact.value}
                              </div>
                            </div>
                          </a>
                        )}

                        {!isResume && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => copyToClipboard(contact.value, contact.type)}
                            className="text-slate-400 hover:text-emerald-400 transition-colors p-1 ml-2"
                          >
                            {copiedContact === contact.type ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </motion.button>
                        )}

                        {isResume && (
                          <motion.a
                            href={RESUME_URL}
                            download="Rion_Kudo_Resume.pdf"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-slate-400 hover:text-emerald-400 transition-colors p-1 ml-2"
                          >
                            <Download className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 lg:mt-8 flex items-center justify-center gap-2 text-emerald-400"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs">Available for opportunities</span>
            </motion.div>
          </motion.div>

          <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
              <motion.section variants={itemVariants}>
                <motion.div whileHover={{ scale: 1.01 }} className="group">
                  <Card className="p-4 sm:p-6 lg:p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 group-hover:border-emerald-400/30 transition-all duration-500">
                    <CardContent className="p-0">
                      <motion.h2 className="text-2xl sm:text-3xl font-bold mb-4 lg:mb-6 text-emerald-400">
                        About Me
                      </motion.h2>
                      <p className="text-base lg:text-lg leading-relaxed text-slate-200">
                        I'm a 4th-year Computer Science student passionate about Artificial Intelligence,
                        Machine Learning, and software engineering. Skilled in Python, React, and SQL, I
                        enjoy building projects that turn ideas into practical solutions.
                        <br />
                        <br />
                        As I prepare for my internship and future career in tech, I'm eager to apply my
                        skills in real-world settings, contribute to innovative teams, and continue growing
                        as a problem-solver and lifelong learner. Outside coding, I enjoy strategy games
                        that sharpen my analytical thinking.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.section>

              <motion.section variants={itemVariants}>
                <motion.h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-8 text-slate-200">
                  Tech Stack
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {techCategories.map((category, index) => (
                    <motion.div
                      key={category.title}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="group"
                    >
                      <Card className="h-full p-4 lg:p-6 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 group-hover:border-emerald-400/30 transition-all duration-500">
                        <CardContent className="p-0">
                          <div className="flex items-center gap-3 mb-4">
                            <motion.div className="text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                              {category.icon}
                            </motion.div>
                            <h3 className="font-semibold text-white text-sm lg:text-base">
                              {category.title}
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: skillIndex * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-emerald-500/20 border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/30 transition-all duration-300"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section variants={itemVariants}>
                <motion.h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-8 text-slate-200">
                  Soft Skills
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer"
                    >
                      <Card className="p-3 lg:p-4 text-center bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 group-hover:border-emerald-400/30 transition-all duration-500">
                        <CardContent className="p-0">
                          <motion.div className="text-emerald-400 mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                            {skill.icon}
                          </motion.div>
                          <p className="text-xs lg:text-sm font-medium text-slate-200">
                            {skill.name}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section variants={itemVariants}>
                <motion.h2 className="text-2xl sm:text-3xl font-bold mb-6 lg:mb-8 text-slate-200">
                  Personal Projects
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Card className="overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 group-hover:border-emerald-400/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-emerald-400/10">
                        <div className="relative overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={400}
                            height={300}
                            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <motion.div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <motion.div
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ExternalLink className="w-5 h-5 text-emerald-400" />
                          </motion.div>
                        </div>
                        <CardContent className="p-4 lg:p-6">
                          <h3 className="text-lg lg:text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, techIndex) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs border-slate-600 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-300 transition-all duration-300"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.footer variants={itemVariants} className="text-center py-6 lg:py-8">
                <motion.p className="text-slate-400 text-sm lg:text-base">
                  Built using React, TypeScript, and Tailwind CSS
                </motion.p>
              </motion.footer>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project dialog */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 m-4">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between text-white pr-8">
                  <span className="text-lg lg:text-xl">{selectedProject.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                    className="h-6 w-6 p-0 text-slate-400 hover:text-emerald-400 absolute right-4 top-4"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={600}
                  height={400}
                  className="w-full h-48 sm:h-64 object-cover rounded-lg"
                />

                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <p className="text-slate-300 leading-relaxed text-sm lg:text-base">
                  {selectedProject.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <Button asChild className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 bg-transparent"
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

      {/* Resume dialog */}
        <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
          <MotionDialogContent
            className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 m-4
                      data-[state=open]:animate-none data-[state=closed]:animate-none"
            initial={{ opacity: 0, x: -150 }}   // ⬅️ start left
            animate={{ opacity: 1, x: 0 }}      // ⬅️ center
            exit={{ opacity: 0, x: -150 }}      // ⬅️ slide back out left
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-white pr-8">
                <span className="text-lg lg:text-xl">Resume</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsResumeOpen(false)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-emerald-400 absolute right-4 top-4"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="w-full h-[70vh]">
                <iframe
                  src={RESUME_URL}
                  className="w-full h-full rounded-lg border border-slate-700"
                />
              </div>

              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <a href={RESUME_URL} download="Rion_Kudo_Resume.pdf">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </div>
          </MotionDialogContent>
</Dialog>

    </div>
  )
}
