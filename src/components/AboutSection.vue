<script setup lang="ts">
import foto from '@/assets/img/.foto.png'

interface Skill {
  icon: string
  label: string
}

const skills: Skill[] = [
  { icon: 'fa-brands fa-figma', label: 'UI/UX Design' },
  { icon: 'fa-solid fa-palette', label: 'Canva' },
  { icon: 'fa-solid fa-code', label: 'Frontend Development' },
  { icon: 'fa-solid fa-database', label: 'Backend Development' },
  { icon: 'fa-brands fa-vuejs', label: 'Vue + Vite' },
  { icon: 'fa-brands fa-node-js', label: 'Node.js' },
  { icon: 'fa-brands fa-laravel', label: 'Laravel' },
  { icon: 'fa-solid fa-wand-magic-sparkles', label: 'Creative Coding with AI' },
]
</script>

<template>
  <section id="about" class="section">
    <h2 class="section-title" v-reveal>About</h2>
    <div class="about-container" v-reveal>
      <div class="about-image">
        <div class="image-placeholder">
          <img :src="foto" alt="Portrait of Lian">
        </div>
      </div>
      <div class="about-text">
        <p>
          Hai, saya <strong>Lian</strong> — Saya adalah seorang frontend developer dan UI/UX designer yang terus
          belajar
        </p>
        <p>
          Saya menikmati proses menciptakan pengalaman digital yang interaktif, imersif, dan berfokus pada detail
          visual. Pendekatan saya menggabungkan logika teknis dengan sentuhan estetika desain untuk menghasilkan karya
          yang fungsional sekaligus menarik.
        </p>
        <p>
          Saat ini saya fokus memperdalam kemampuan di bidang <strong>frontend development</strong>, dan
          <strong>creative coding</strong> untuk membangun dunia digital yang lebih ekspresif.
        </p>
        <p>
          Sebagian proyek saya dikembangkan dengan bantuan AI untuk mempercepat eksplorasi ide, prototyping, dan
          iterasi desain.
        </p>
        <div class="skills-container">
          <div v-for="skill in skills" :key="skill.label" class="skill-tag">
            <i :class="skill.icon"></i> {{ skill.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
