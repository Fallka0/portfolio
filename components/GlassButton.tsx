'use client'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

interface GlassButtonProps {
  children: React.ReactNode
  href?: string
  to?: string
  onClick?: () => void
  className?: string
  arrow?: boolean
  dark?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function GlassButton({
  children,
  href,
  to,
  onClick,
  className = '',
  arrow = true,
  dark = false,
  type,
}: GlassButtonProps) {
  const router = useRouter()
  const textColor = dark ? 'text-[#3C3C43]/80' : 'text-[#1C1C1E]'

  const handleClick = () => {
    if (onClick) return onClick()
    if (to) return router.push(to)
    if (href) {
      if (href.startsWith('http')) window.open(href, '_blank', 'noopener,noreferrer')
      else window.location.href = href
    }
  }

  const padding = arrow ? 'pl-[18px] pr-[6px] py-[6px]' : 'px-5 py-2.5'

  return (
    <button
      type={type ?? 'button'}
      onClick={type === 'submit' ? undefined : handleClick}
      className={`glass-button ${padding} ${className}`}
    >
      {arrow ? (
        <span className={`group inline-flex items-center gap-2 ${textColor}`}>
          <span className="text-roll-wrap text-[13px] font-medium leading-[20px]">
            <span className="text-roll-inner">
              <span>{children}</span>
              <span>{children}</span>
            </span>
          </span>
          <span className="w-7 h-7 rounded-full bg-[#007AFF] border border-[#007AFF]/40 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 flex-shrink-0">
            <ArrowRight size={13} className="text-white" />
          </span>
        </span>
      ) : (
        <span className={`text-[13px] font-medium whitespace-nowrap ${textColor}`}>{children}</span>
      )}
    </button>
  )
}
