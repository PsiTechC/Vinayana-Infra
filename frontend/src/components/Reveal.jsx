import { motion } from 'framer-motion'

/**
 * Lightweight scroll-reveal wrapper.
 * Fades + slides its children into view once, when scrolled to.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  as = 'div',
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
