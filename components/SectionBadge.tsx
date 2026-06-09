export default function SectionBadge({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8 px-5 sm:px-8 lg:px-12">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#007AFF] border border-[#007AFF]/30 text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
        {num}
      </span>
      <span className="glass-subtle text-[12px] sm:text-[13px] font-medium rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[#3C3C43]/65">
        {label}
      </span>
    </div>
  )
}
