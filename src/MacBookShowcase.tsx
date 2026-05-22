import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import * as THREE from 'three'

const MODEL_URL = '/models/macbook.glb'

/* The model lives in 3D world space. Position, scale and rotation are bound
   DIRECTLY to the scroll `progress` (0 → 1) — no per-frame damping. Lenis
   already smooths the scroll, so binding directly keeps the model rock-firm
   (no rubber-band wobble) while still feeling smooth. Sizing/positioning use
   viewport units so nothing crops on resize. */
function MacBook({
  progress,
  anchorRef,
  mobile,
}: {
  progress: MotionValue<number>
  anchorRef: RefObject<HTMLElement | null>
  mobile: boolean
}) {
  const { scene } = useGLTF(MODEL_URL)
  const cloned = useMemo(() => scene.clone(true), [scene])

  // Normalize so the largest dimension is ~1 world unit, regardless of the
  // GLB's authored units.
  const baseScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return 1 / maxDim
  }, [cloned])

  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  useFrame(() => {
    const g = group.current
    if (!g) return
    const p = THREE.MathUtils.clamp(progress.get(), 0, 1)
    const targetRotY = -0.5 + p * Math.PI * 2

    let targetX: number
    let targetY: number
    let targetScale: number

    if (mobile) {
      // Centered hero accent that drifts up + shrinks as you scroll; the
      // wrapper fades it out before it could reach the narrow skills column.
      targetX = 0
      targetY = THREE.MathUtils.lerp(viewport.height * 0.16, viewport.height * 0.5, p)
      targetScale =
        baseScale * THREE.MathUtils.lerp(viewport.height * 0.34, viewport.height * 0.2, p)
    } else {
      // Right side of the hero, descending to park beside the live on-screen
      // position of the skills heading (read each frame so it stays glued).
      targetX = viewport.width * 0.24
      const heroY = viewport.height * 0.06
      let headingY = -viewport.height * 0.6
      const el = anchorRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const screenCenter = rect.top + rect.height / 2
        const ndcY = 1 - (screenCenter / window.innerHeight) * 2
        headingY = ndcY * (viewport.height / 2)
      }
      targetY = THREE.MathUtils.lerp(heroY, headingY, p)
      targetScale =
        baseScale * THREE.MathUtils.lerp(viewport.height * 0.5, viewport.height * 0.26, p)
    }

    // Direct bind — firm, no wobble.
    g.position.set(targetX, targetY, 0)
    g.scale.setScalar(targetScale)
    g.rotation.set(0.12, targetRotY, 0)
  })

  return (
    <group ref={group}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  )
}

/* Full-screen fixed canvas — transparent, click-through. On mobile it fades
   out as you scroll into the content. */
export default function MacBookFloating({
  progress,
  anchorRef,
}: {
  progress: MotionValue<number>
  anchorRef: RefObject<HTMLElement | null>
}) {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  )
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // On mobile, fade the whole canvas out before the skills section so the
  // model never overlaps the single-column layout.
  const mobileOpacity = useTransform(progress, [0, 0.5, 0.78], [1, 1, 0])

  return (
    <motion.div
      style={{ opacity: mobile ? mobileOpacity : 1 }}
      className="fixed inset-0 z-[8] pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 8, 5]} intensity={2.4} />
        <directionalLight position={[-6, 3, -4]} intensity={0.9} />
        <spotLight position={[0, 7, 4]} angle={0.5} penumbra={1} intensity={1.4} />
        <Suspense fallback={null}>
          <MacBook progress={progress} anchorRef={anchorRef} mobile={mobile} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}

useGLTF.preload(MODEL_URL)
