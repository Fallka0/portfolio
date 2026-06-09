import { Fragment } from 'react'

export default function ScrollStatement({ text, mode }: { text: string; mode: string }) {
  const words = String(text).split(/\s+/).filter(Boolean)
  return (
    <span className="styline" data-scrolltype={mode}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="styword">{w}</span>
          {' '}
        </Fragment>
      ))}
    </span>
  )
}
