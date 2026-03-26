"use client"

import { useEffect, useRef, useState, Children } from "react"
import type React from "react"

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPinned, setIsPinned] = useState(false)

  const count = Children.count(children)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (isMobile) return

    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const container = containerRef.current
      const scroll = scrollRef.current
      if (!container || !scroll) return

      const scrollWidth = scroll.scrollWidth
      const viewportWidth = window.innerWidth

      ctx = gsap.context(() => {
        gsap.to(scroll, {
          x: -(scrollWidth - viewportWidth),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollWidth - viewportWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress)
              setIsPinned(self.isActive)
            },
            onLeave: () => setIsPinned(false),
            onLeaveBack: () => setIsPinned(false),
          },
        })
      }, container)
    }

    init()

    return () => {
      ctx?.revert()
    }
  }, [isMobile])

  const currentProject = Math.min(
    Math.floor(progress * count) + 1,
    count
  )

  // Mobile: vertical stack with proper padding and dividers
  if (isMobile) {
    return (
      <div className="flex flex-col gap-12 px-6">
        {children}
      </div>
    )
  }

  // Desktop: horizontal scroll
  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex items-center gap-24 pl-[10vw] pr-[10vw]"
        style={{ height: "100vh", willChange: "transform" }}
      >
        {children}
      </div>

      {/* Progress indicator */}
      {isPinned && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
          <span className="font-mono text-[11px] text-white/25 tracking-[2px]">
            {String(currentProject).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className="w-24 h-px bg-white/[0.06] relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-[#8b5cf6]/40 transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
