import { redirect } from 'next/navigation'

/** The project list moved to /work, alongside the case studies it links into.
 *  Kept as a redirect so anything already pointing at /projects still lands. */
export default function ProjectsPage() {
  redirect('/work')
}
