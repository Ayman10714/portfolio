import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * A quiet, cyan particle network drifting in the empty space above the
 * avatar. Purely decorative, low-opacity, and disposed cleanly on unmount.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    camera.position.z = 6

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const { clientWidth: w, clientHeight: h } = parent
      renderer.setSize(w, h, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const group = new THREE.Group()
    scene.add(group)

    const count = 60
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const indices: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        if (dx * dx + dy * dy + dz * dz < 2.2) indices.push(i, j)
      }
    }
    geometry.setIndex(indices)

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x37e6ff, transparent: true, opacity: 0.25 })
    group.add(new THREE.LineSegments(geometry, lineMaterial))

    const pointMaterial = new THREE.PointsMaterial({ color: 0x37e6ff, size: 0.045, transparent: true, opacity: 0.6 })
    group.add(new THREE.Points(geometry, pointMaterial))

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      group.rotation.y += 0.0009
      group.rotation.x += 0.0003
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      lineMaterial.dispose()
      pointMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
}