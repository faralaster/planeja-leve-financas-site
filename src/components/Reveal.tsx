import type { ReactNode } from "react"
import { motion } from "motion/react"
import { fadeSlideUp } from "@/lib/motion-variants"

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeSlideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
