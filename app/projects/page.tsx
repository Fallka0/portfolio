'use client'
import FloatingNav from '@/components/FloatingNav'
import FadeIn from '@/components/FadeIn'
import SectionBadge from '@/components/SectionBadge'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/lib/data'

export default function ProjectsPage() {
  return (
    <>
      <FloatingNav />
      <section className="pt-28 pb-8 relative overflow-hidden min-h-screen">
        <div className="max-w-[1280px] mx-auto">
          <FadeIn delay={0} x={-20} y={0}>
            <SectionBadge num="02" label="Selected work" />
          </FadeIn>
          <FadeIn delay={0.1} y={30}>
            <h1
              className="syne font-medium leading-[1.08] tracking-[-0.03em] text-[#1C1C1E] mb-10 sm:mb-12 px-5 sm:px-8 lg:px-12"
              style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)' }}
            >
              My projects
            </h1>
          </FadeIn>
          <div>
            {projects.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i} />
            ))}
          </div>
          <div className="h-20" />
        </div>
      </section>
    </>
  )
}
