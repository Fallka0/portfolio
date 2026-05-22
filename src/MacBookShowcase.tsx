import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center, ContactShadows } from '@react-three/drei'
import { useScroll, type MotionValue } from 'framer-motion'
import * as THREE from 'three'

const MODEL_URL = '/models/macbook.glb'

/* The model itself — normalized to a consistent size, centered, and
   rotated on its Y axis according to scroll progress (0 → 1). */
function MacBook({ progress }: { progress: MotionValue<number> }) {
  const { scene } = useGLTF(MODEL_URL)
  const cloned = useMemo(() => scene.clone(true), [scene])

  // Normalize: scale so the largest dimension fits a fixed target size,
  // regardless of the model's native units.
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return 3.2 / maxDim
  }, [cloned])

  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    const p = progress.get()
    // Start slightly angled, complete ~1.25 turns across the scroll range.
    const targetY = -0.5 + p * Math.PI * 2.5
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      6,
      delta
    )
  })

  return (
    <group ref={group} rotation={[0.12, -0.5, 0]}>
      <Center>
        <primitive object={cloned} scale={scale} />
      </Center>
    </group>
  )
}

export default function MacBookShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Heading overlay */}
        <div className="absolute inset-x-0 top-[14%] z-10 text-center px-6 pointer-events-none">
          <p className="text-[11px] sm:text-[12px] text-[#007AFF]/75 font-medium tracking-[0.2em] uppercase mb-3">
            The tools
          </p>
          <h2
            className="syne font-medium leading-[1.05] tracking-[-0.03em] text-[#1C1C1E]"
            style={{ fontSize: 'clamp(1.9rem, 5vw, 3.6rem)' }}
          >
            Built to ship
          </h2>
        </div>

        <Canvas
          className="!absolute inset-0"
          camera={{ position: [0, 0, 6.5], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[5, 8, 5]} intensity={2.4} />
          <directionalLight position={[-6, 3, -4]} intensity={0.9} />
          <spotLight position={[0, 7, 3]} angle={0.5} penumbra={1} intensity={1.4} />
          <Suspense fallback={null}>
            <MacBook progress={scrollYProgress} />
            <ContactShadows
              position={[0, -1.7, 0]}
              opacity={0.32}
              scale={12}
              blur={2.6}
              far={4}
            />
          </Suspense>
        </Canvas>

        {/* Scroll hint */}
        <div className="absolute inset-x-0 bottom-[8%] z-10 text-center pointer-events-none">
          <span className="text-[12px] text-[#3C3C43]/45">Scroll to rotate</span>
        </div>
      </div>
    </section>
  )
}

useGLTF.preload(MODEL_URL)
