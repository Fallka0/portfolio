'use client'
import FadeIn from './FadeIn'
import GlassButton from './GlassButton'
import type { ProjectData } from '@/lib/data'

export default function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const reverse = index % 2 === 1

  return (
    <FadeIn delay={index * 0.06} y={40}>
      <article className="mb-8 sm:mb-12 flex justify-center">
        <div
          className={`glass-strong glass-hover rounded-[32px] grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-10 items-center p-6 sm:p-8 ${
            reverse ? 'lg:[&>:first-child]:order-2' : ''
          }`}
          style={{ width: 'min(1100px, calc(100vw - 40px))' }}
        >
          {/* Image collage */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2.5 sm:gap-3 h-[260px] sm:h-[340px] lg:h-[380px]">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden ring-1 ring-white/40">
              <img
                src={project.img3}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden ring-1 ring-white/40">
              <img
                src={project.img1}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden ring-1 ring-white/40">
              <img
                src={project.img2}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <span
                className="syne font-bold leading-none select-none text-transparent bg-clip-text"
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                  backgroundImage:
                    'linear-gradient(135deg, rgba(0,122,255,0.65) 0%, rgba(88,86,214,0.40) 100%)',
                }}
              >
                {project.num}
              </span>
              <span className="text-[11px] text-[#007AFF]/80 tracking-[0.18em] uppercase font-semibold">
                {project.category}
              </span>
            </div>

            <h3
              className="syne font-medium text-[#1C1C1E] mb-3 tracking-tight leading-[1.1]"
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}
            >
              {project.title}
            </h3>

            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#3C3C43]/72 mb-6">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-7">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="glass-subtle text-[11px] px-3 py-1 rounded-full text-[#007AFF] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            <div>
              <GlassButton href={project.href}>
                {project.href.includes('github.com') ? 'View on GitHub' : 'Visit live site'}
              </GlassButton>
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
  )
}
