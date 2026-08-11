<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { featuredProjects } from '@/data/projects'
</script>

<template>
  <section id="projects" class="section">
    <h2 class="section-title" v-reveal>Selected Projects</h2>
    <div class="cards" v-reveal>
      <ProjectCard
        v-for="project in featuredProjects"
        :key="project.title"
        :title="project.title"
        :description="project.description"
        :badges="project.badges"
        :links="project.links"
        v-reveal
      />
    </div>
    <div class="show-all-projects" v-reveal>
      <a href="#design-projects" class="primary">View All Projects</a>
    </div>
  </section>
</template>
