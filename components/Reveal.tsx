"use client"

import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Scroll choreography, in one place.
 *
 * `Stagger` animates its direct children in sequence when the group comes into
 * view; `StaggerItem` is the child it animates. `Reveal` is the single-element
 * version for a heading or a lone card.
 *
 * All three respect `prefers-reduced-motion`: when it is set the wrappers render
 * as plain divs and the children are simply visible, because a reveal that never
 * fires is a blank page, not a subtler one.
 */

type StaggerProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Seconds to wait before the first child starts. */
  delay?: number
  /** How much of the group must be on screen before it fires. */
  amount?: number
}

export function Stagger({ children, className, style, delay = 0, amount = 0.15 }: StaggerProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Slightly longer travel for cards, shorter for chips. */
  y?: number
}

export function StaggerItem({ children, className, style, y = 14 }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}

type RevealProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  y?: number
  amount?: number
}

export default function Reveal({ children, className, style, delay = 0, y = 16, amount = 0.2 }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
