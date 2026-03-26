"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function SectionHeading({ number, title }: { number: string; title: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 md:mb-16"
    >
      <h2 className="font-mono text-[11px] tracking-[4px] uppercase text-white/15 font-normal">
        {number} — {title}
      </h2>
    </motion.div>
  )
}
