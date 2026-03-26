"use client"

import Image from "next/image"
import { useState } from "react"

export default function BrowserMockup({
  src,
  alt,
  priority = false,
}: {
  src: string
  alt: string
  priority?: boolean
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="w-full rounded-lg border border-white/[0.06] overflow-hidden bg-white/[0.02] transition-all duration-300 group-hover:border-white/[0.1] group-hover:brightness-105">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.05] bg-white/[0.02]">
        <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
        <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
        <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
      </div>
      {/* Screenshot */}
      <div className="relative aspect-video">
        {!loaded && (
          <div className="absolute inset-0 bg-white/[0.03] animate-pulse" />
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover object-top transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}
