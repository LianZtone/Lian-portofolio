<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { designCategories } from '@/data/projects'
</script>

<template>
  <section id="design-projects" class="section">
    <h2 class="section-title" v-reveal>Design & Creative Works</h2>
    <p class="muted" v-reveal>Eksplorasi visual dalam UI/UX design dan creative projects</p>

    <div class="design-categories">
      <div v-for="group in designCategories" :key="group.title" class="category-group" v-reveal>
        <h3><i :class="group.icon"></i> {{ group.title }}</h3>
        <div class="cards">
          <ProjectCard
            v-for="work in group.works"
            :key="work.title"
            :title="work.title"
            :description="work.description"
            :badges="work.badges"
            :image="work.image"
            :link-text="work.linkText"
            :link-url="work.linkUrl"
            v-reveal
          />
        </div>
      </div>
    </div>
  </section>
</template>
