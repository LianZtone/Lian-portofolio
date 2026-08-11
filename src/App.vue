<script setup lang="ts">
import ParticleBackground from '@/components/ParticleBackground.vue'
import SiteNavbar from '@/components/SiteNavbar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <ParticleBackground />
  <SiteNavbar />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>
