<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let width = 0
let height = 0
let area = 0
const stars: StarDot[] = []
let rafId = 0
let running = true
let last = performance.now()

const pointer = { x: null as number | null, y: null as number | null }

class StarDot {
  x: number
  y: number
  depth: number
  size: number
  speed: number
  isGold: boolean
  vx: number
  vy: number
  phase: number

  constructor() {
    this.x = 0
    this.y = 0
    this.depth = 0
    this.size = 0
    this.speed = 0
    this.isGold = false
    this.vx = 0
    this.vy = 0
    this.phase = 0
    this.reset(true)
  }

  reset(initial = false) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.depth = Math.random()
    this.size = (0.8 + Math.random() * 1.8) * (1 - this.depth) * 1.6
    this.speed = 6 + Math.random() * 18
    this.isGold = Math.random() < 0.055
    if (initial) {
      this.y = Math.random() * height
    }
    this.vx = (Math.random() - 0.5) * (0.2 + (1 - this.depth) * 0.6)
    this.vy = (Math.random() - 0.5) * 0.2
    this.phase = Math.random() * Math.PI * 2
  }

  update(dt: number, speedFactor: number, mouseInfluence: { ax: number; ay: number }) {
    const centerX = width * 0.5
    const centerY = height * 0.5
    const dx = (this.x - centerX) * 0.00005 * (1 - this.depth)
    const dy = (this.y - centerY) * 0.00005 * (1 - this.depth)
    const forward = speedFactor * (1.0 + (1 - this.depth) * 1.5) * dt

    this.x += this.vx + dx + (mouseInfluence.ax || 0) * (1 - this.depth) * 30 * dt
    this.y += this.vy + dy + (mouseInfluence.ay || 0) * (1 - this.depth) * 30 * dt

    this.x += (centerX - this.x) * 0.0004 * forward
    this.y += (centerY - this.y) * 0.0004 * forward

    this.phase += dt * 2.0

    if (this.x < -30) this.x = width + 30
    if (this.x > width + 30) this.x = -30
    if (this.y < -30) this.y = height + 30
    if (this.y > height + 30) this.y = -30
  }

  draw() {
    if (!ctx) return
    const tw = 0.6 + 0.4 * Math.sin(this.phase)
    const baseAlpha = clamp(0.2 + (1 - this.depth) * 0.75, 0.12, 1.0) * tw
    const r = this.size

    if (this.isGold && Math.random() < 0.04) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(227,179,65,${baseAlpha})`
      ctx.arc(this.x, this.y, r * 1.6, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.beginPath()
    ctx.fillStyle = `rgba(234,242,255, ${baseAlpha})`
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2)
    ctx.fill()

    if (r > 1.1) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(37,117,252, ${baseAlpha * 0.08})`
      ctx.arc(this.x, this.y, r * 3.0, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

function computeCount() {
  return clamp(Math.floor(area / 15000), 80, 1000)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  dpr = Math.max(1, window.devicePixelRatio || 1)
  width = Math.max(300, window.innerWidth)
  height = Math.max(300, window.innerHeight)
  area = width * height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function rebuildParticles() {
  const particleCount = computeCount()
  if (stars.length < particleCount) {
    const add = particleCount - stars.length
    for (let i = 0; i < add; i++) {
      stars.push(new StarDot())
    }
  } else if (stars.length > particleCount) {
    stars.length = particleCount
  }
}

function loop(now: number) {
  if (!running) {
    last = now
    rafId = requestAnimationFrame(loop)
    return
  }
  if (!ctx) return

  const dt = Math.min(0.05, (now - last) / 1000)
  last = now

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(4,6,12,0.12)'
  ctx.fillRect(0, 0, width, height)

  const baseSpeed = 0.6 + area / (1400 * 1400)
  const speedFactor = baseSpeed * 0.65

  const mouseInfluence = { ax: 0, ay: 0 }
  if (pointer.x !== null && pointer.y !== null) {
    const nx = (pointer.x / width - 0.5) * 2
    const ny = (pointer.y / height - 0.5) * 2
    mouseInfluence.ax = clamp(nx, -1, 1) * 0.5
    mouseInfluence.ay = clamp(ny, -1, 1) * 0.5
  }

  for (const s of stars) {
    s.update(dt, speedFactor, mouseInfluence)
    s.draw()
  }

  rafId = requestAnimationFrame(loop)
}

function onPointerMove(event: PointerEvent) {
  pointer.x = event.clientX
  pointer.y = event.clientY
}

function onPointerLeave() {
  pointer.x = null
  pointer.y = null
}

function onVisibilityChange() {
  running = document.visibilityState === 'visible'
}

function onResize() {
  resizeCanvas()
  rebuildParticles()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  resizeCanvas()
  rebuildParticles()
  for (const s of stars) {
    s.x = Math.random() * width
    s.y = Math.random() * height
  }

  last = performance.now()
  rafId = requestAnimationFrame(loop)

  window.addEventListener('resize', onResize, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave, { passive: true })
  document.addEventListener('visibilitychange', onVisibilityChange)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <canvas id="dc-canvas" ref="canvasRef" aria-hidden="true"></canvas>
</template>
