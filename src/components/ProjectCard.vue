<script setup lang="ts">
import type { ProjectLink } from '@/data/projects'

interface Props {
  title: string
  description: string
  badges: string[]
  image?: string
  links?: ProjectLink[]
  linkText?: string
  linkUrl?: string
}

withDefaults(defineProps<Props>(), {
  image: undefined,
  links: () => [],
  linkText: undefined,
  linkUrl: undefined,
})
</script>

<template>
  <article class="card">
    <div v-if="image" class="design-preview">
      <img :src="image" :alt="title">
    </div>
    <h4 v-if="image">{{ title }}</h4>
    <h3 v-else>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="badges">
      <span v-for="badge in badges" :key="badge" class="badge">{{ badge }}</span>
    </div>
    <div class="card-links">
      <template v-if="links.length">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
          class="btn-link"
        >
          <i v-if="link.icon" :class="link.icon"></i>
          <i v-else class="fa-solid fa-arrow-up-right-from-square"></i>
          {{ link.label }}
        </a>
      </template>
      <a v-else-if="linkUrl" :href="linkUrl" target="_blank" rel="noreferrer" class="btn-link">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> {{ linkText }}
      </a>
      <span v-else-if="linkText" class="btn-link disabled" aria-disabled="true">{{ linkText }}</span>
    </div>
  </article>
</template>
