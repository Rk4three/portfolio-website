"use client"

import BrowserMockup from "./BrowserMockup"
import { Github, ExternalLink } from "lucide-react"

interface ProjectFrameProps {
  number: string
  total: string
  title: string
  description: string
  stack: string[]
  githubUrl: string
  liveUrl: string
  image: string
  priority?: boolean
}

export default function ProjectFrame({
  number,
  total,
  title,
  description,
  stack,
  githubUrl,
  liveUrl,
  image,
  priority = false,
}: ProjectFrameProps) {
  return (
    <div className="group flex flex-col lg:flex-row gap-6 lg:gap-12 items-center w-full lg:w-[80vw] flex-shrink-0 lg:px-0 transition-transform duration-300 hover:-translate-y-1">
      {/* Screenshot first on mobile for visual impact */}
      <div className="lg:hidden w-full">
        <BrowserMockup src={image} alt={title} priority={priority} />
      </div>

      {/* Left: Editorial text */}
      <div className="relative lg:w-[40%] w-full flex-shrink-0">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8b5cf6]/20 to-transparent hidden lg:block" />
        <div className="lg:pl-8">
          <div className="font-mono text-[11px] text-white/20 tracking-[3px] mb-4 lg:mb-6">
            {number} / {total}
          </div>
          <h3 className="text-xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-3 lg:mb-4">
            {title}
          </h3>
          <p className="text-sm text-white/35 leading-relaxed mb-4 lg:mb-6 max-w-sm">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4 lg:hidden">
            {stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] text-white/30 border border-white/[0.06] rounded px-2 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-md px-4 py-3 mb-6 inline-block hidden lg:block">
            <div className="font-mono text-[9px] text-white/20 tracking-[2px] uppercase mb-1.5">Stack</div>
            <div className="text-xs text-white/45">{stack.join(" · ")}</div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] text-[#8b5cf6] tracking-[1px] hover:text-[#a78bfa] transition-colors py-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Live
            </a>
            <span className="text-white/10">|</span>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] text-white/30 tracking-[1px] hover:text-white/50 transition-colors py-1"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Right: Browser mockup (desktop only) */}
      <div className="lg:w-[60%] w-full hidden lg:block">
        <BrowserMockup src={image} alt={title} priority={priority} />
      </div>
    </div>
  )
}
