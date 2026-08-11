import type { Directive } from 'vue'

const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('show')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.2 },
      )
    : null

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('motion')

    if (observer) {
      observer.observe(el)
    } else {
      el.classList.add('show')
    }
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
