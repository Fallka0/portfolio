/**
 * The label-and-content split borrowed from megazord: a mono "/ label" in a
 * narrow left column against the heading and lede in a wider right one.
 */
export default function SectionHead({
  label, title, lede, children,
}: {
  label: string
  title?: React.ReactNode
  lede?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="shead">
      <p className="shead__label mono">/ {label}</p>
      <div className="shead__body">
        {title && <h2 className="shead__title">{title}</h2>}
        {lede && <p className="shead__lede">{lede}</p>}
        {children}
      </div>
    </div>
  )
}
