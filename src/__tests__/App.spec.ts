import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'
import HomeView from '@/views/HomeView.vue'
import { vReveal } from '@/directives/reveal'

describe('App', () => {
  it('renders the portfolio layout', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', name: 'home', component: HomeView }],
    })
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
        directives: { reveal: vReveal },
      },
    })

    expect(wrapper.find('.site-header').exists()).toBe(true)
    expect(wrapper.find('.site-footer').exists()).toBe(true)
    expect(wrapper.find('.hero-title').text()).toContain('Hai, Aku')

    wrapper.unmount()
  })
})
