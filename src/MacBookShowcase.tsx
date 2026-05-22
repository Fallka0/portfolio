import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import { type MotionValue } from 'framer-motion'
import * as THREE from 'three'

const MODEL_URL = '/models/macbook.glb'

/* The model lives in 3D world space. Its position, scale and rotation are
   all driven by scroll `progress` (0 → 1) and damped every frame so the
   motion stays smooth regardless of frame rate. Sizing/positioning use
   viewport units, so nothing crops when the window resizes. */
function MacBook({ progress }: { progress: MotionValue<number> }) {
  const { scene } = useGLTF(MODEL_URL)
  const cloned = useMemo(() => scene.clone(true), [scene])

  // Normalize the model to ~1 world unit tall so the responsive sizing below
  // works no matter what units the GLB was authored in.
  const baseScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return 1 / maxDim
  }, [cloned])

  const group = useRef<THREE.Group>(null)
  const initialized = useRef(false)
  const { viewport } = useThree()

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const p = THREE.MathUtils.clamp(progress.get(), 0, 1)

    // Responsive targets (all in world units derived from the viewport).
    const targetScale =
      baseScale * THREE.MathUtils.lerp(viewport.height * 0.5, viewport.height * 0.22, p)
    const targetX = viewport.width * 0.24
    const targetY = THREE.MathUtils.lerp(viewport.height * 0.08, -viewport.height * 0.62, p)
    const targetRotY = -0.5 + p * Math.PI * 2

    if (!initialized.current) {
      // Snap on the first frame so there's no grow-in pop.
      g.position.set(targetX, targetY, 0)
      g.scale.setScalar(targetScale)
      g.rotation.set(0.12, targetRotY, 0)
      initialized.current = true
      return
    }

    // Frame-rate independent damping → smooth follow.
    g.position.x = THREE.MathUtils.damp(g.position.x, targetX, 7, delta)
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 7, delta)
    const s = THREE.MathUtils.damp(g.scale.x, targetScale, 7, delta)
    g.scale.setScalar(s)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 7, delta)
  })

  return (
    <group ref={group}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  )
}

/* Full-screen fixed canvas — transparent, click-through. The model never
   crops because it's positioned in 3D space relative to the live viewport. */
export default function MacBookFloating({
  progress,
}: {
  progress: MotionValue<number>
}) {
  return (
    <div className="hidden md:block fixed inset-0 z-[8] pointer-events-none">
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
          <MacBook progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_URL)
