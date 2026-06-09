import { Fragment } from 'react'

interface Token { word: string; em: boolean }

function parse(text: string): Token[] {
  const tokens: Token[] = []
  const re = /\*([^*]+)\*|(\S+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m[1]) {
      m[1].split(/\s+/).filter(Boolean).forEach(w => tokens.push({ word: w, em: true }))
    } else if (m[2]) {
      tokens.push({ word: m[2], em: false })
    }
  }
  return tokens
}

export default function ScrollStatement({ text, mode }: { text: string; mode: string }) {
  const tokens = parse(String(text))
  return (
    <span className="styline" data-scrolltype={mode}>
      {tokens.map((tok, i) => (
        <Fragment key={i}>
          <span className={`styword${tok.em ? ' styword--em' : ''}`}>{tok.word}</span>
          {' '}
        </Fragment>
      ))}
    </span>
  )
}
