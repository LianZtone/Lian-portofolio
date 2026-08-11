<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const navLinksRef = ref<HTMLDivElement | null>(null)
const navToggleRef = ref<HTMLButtonElement | null>(null)
const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}

function onToggle() {
  isOpen.value = !isOpen.value
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (!navLinksRef.value?.contains(target) && !navToggleRef.value?.contains(target)) {
    closeMenu()
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" role="banner">
    <nav class="nav">
      <div class="brand">Lian</div>
      <button
        class="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="isOpen"
        aria-controls="navLinks"
        @click="onToggle"
      >
        <i class="fa-solid fa-bars"></i>
      </button>
      <div id="navLinks" ref="navLinksRef" class="nav-links" :class="{ open: isOpen }">
        <a href="#projects" @click="closeMenu">Projects</a>
        <a href="#design-projects" @click="closeMenu">Design Projects</a>
        <a href="#about" @click="closeMenu">About</a>
        <a href="#contact" @click="closeMenu">Contact</a>
      </div>
    </nav>
  </header>
</template>
