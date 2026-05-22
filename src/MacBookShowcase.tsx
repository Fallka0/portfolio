import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center, ContactShadows } from '@react-three/drei'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import * as THREE from 'three'

const MODEL_URL = '/models/macbook.glb'

/* The model — normalized to a consistent size, centered, and rotated on
   its Y axis according to scroll progress (0 → 1). */
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
    // Start slightly angled, complete a full turn across the scroll range.
    const targetY = -0.5 + p * Math.PI * 2
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

/* Floating overlay: fixed to the viewport, starts at the right of the hero
   and drifts down + shrinks as the user scrolls toward the skills section. */
export default function MacBookFloating({
  progress,
}: {
  progress: MotionValue<number>
}) {
  // CSS transforms are % of the element's own box, so they scale with viewport.
  const y = useTransform(progress, [0, 1], ['0%', '58%'])
  const x = useTransform(progress, [0, 1], ['0%', '-8%'])
  const scale = useTransform(progress, [0, 1], [1, 0.42])

  return (
    <motion.div
      style={{ x, y, scale, transformOrigin: 'center center' }}
      className="hidden md:block fixed right-[1%] top-[12%] z-[8] w-[44vw] max-w-[600px] h-[64vh] pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 8, 5]} intensity={2.4} />
        <directionalLight position={[-6, 3, -4]} intensity={0.9} />
        <spotLight position={[0, 7, 3]} angle={0.5} penumbra={1} intensity={1.4} />
        <Suspense fallback={null}>
          <MacBook progress={progress} />
          <ContactShadows
            position={[0, -1.7, 0]}
            opacity={0.3}
            scale={12}
            blur={2.6}
            far={4}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}

useGLTF.preload(MODEL_URL)
