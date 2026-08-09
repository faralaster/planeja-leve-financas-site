import type { ReactNode } from "react"
import { motion } from "motion/react"
import { fadeSlideUp, staggerContainer } from "@/lib/motion-variants"

export function StaggerList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.ul
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.ul>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li className={className} variants={fadeSlideUp}>
      {children}
    </motion.li>
  )
}
