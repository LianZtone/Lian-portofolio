<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero" role="region" aria-label="Halaman tidak ditemukan">
    <div class="hero-inner">
      <h1 class="hero-title">404</h1>
      <p class="hero-sub">Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan.</p>
      <div class="hero-ctas">
        <RouterLink to="/" class="btn primary">Kembali ke Beranda</RouterLink>
      </div>
    </div>
  </section>
</template>
