<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const textArray = ['Lian', 'Orang biasa', 'UI/UX', 'Punya Ide']

const typedText = ref('')
const isShimmering = ref(false)

let textIndex = 0
let charIndex = 0
let isDeleting = false
let typeTimer: ReturnType<typeof setTimeout> | undefined
let shimmerInterval: ReturnType<typeof setInterval> | undefined
let shimmerTimer: ReturnType<typeof setTimeout> | undefined

function typeEffect() {
  const currentText = textArray[textIndex]
  if (!currentText) return
  const speed = isDeleting ? 80 : 150

  typedText.value = currentText.substring(0, charIndex)

  if (!isDeleting && charIndex < currentText.length) {
    charIndex += 1
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1
  } else if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true
    typeTimer = setTimeout(typeEffect, 1000)
    return
  } else {
    isDeleting = false
    textIndex = (textIndex + 1) % textArray.length
  }

  typeTimer = setTimeout(typeEffect, speed)
}

function flashShimmer() {
  isShimmering.value = true
  shimmerTimer = setTimeout(() => {
    isShimmering.value = false
  }, 1800)
}

onMounted(() => {
  typeEffect()
  shimmerInterval = setInterval(flashShimmer, 5200)
})

onBeforeUnmount(() => {
  if (typeTimer !== undefined) clearTimeout(typeTimer)
  if (shimmerInterval !== undefined) clearInterval(shimmerInterval)
  if (shimmerTimer !== undefined) clearTimeout(shimmerTimer)
})
</script>

<template>
  <section id="home" class="hero" role="region" aria-label="Hero">
    <div class="hero-inner">
      <h1 id="heroTitle" class="hero-title" :class="{ shimmer: isShimmering }" @mouseenter="flashShimmer">
        Hai, Aku <span class="accent-name typing-target">{{ typedText }}</span>
      </h1>
      <p class="hero-sub">
        Saya adalah seorang pengembang dan desainer yang terus belajar mengembangkan keterampilan di bidang
        teknologi kreatif. Saya berfokus pada pembuatan pengalaman digital yang interaktif, imersif, dan inovatif.
        Jelajahi hasil eksplorasi saya dalam ruang digital yang menggabungkan seni, kode, dan imajinasi.
      </p>
      <div class="hero-ctas">
        <a class="btn primary" href="#projects">View Projects</a>
        <a class="btn ghost" href="#contact">Contact Me</a>
      </div>
    </div>
  </section>
</template>
