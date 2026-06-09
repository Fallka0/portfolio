export default function DiagonalDivider({ dir }: { dir: 'to-light' | 'to-dark' }) {
  return <div className={`diag-divider diag-divider--${dir}`} aria-hidden="true" />
}
