export default function ScrollStatement({ text, mode }: { text: string; mode: string }) {
  const words = String(text).split(/\s+/).filter(Boolean)
  return (
    <span className="styline" data-scrolltype={mode}>
      {words.map((w, i) => (
        <span key={i} className="styword">{w}{' '}</span>
      ))}
    </span>
  )
}
