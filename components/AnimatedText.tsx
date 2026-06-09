'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

function AnimatedChar({
  char,
  scrollYProgress,
  start,
  end,
}: {
  char: string
  scrollYProgress: MotionValue<number>
  start: number
  end: number
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? ' ' : char}
    </motion.span>
  )
}

export default function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.15'],
  })
  const chars = text.split('')
  const N = chars.length

  return (
    <p ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => {
        const start = (i / N) * 0.8
        const end = Math.min(start + Math.max(1 / N, 0.1), 1)
        return (
          <AnimatedChar
            key={i}
            char={char}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        )
      })}
    </p>
  )
}
