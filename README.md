# my-portoflio-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deploy

Build output ada di folder `dist` (`npm run build`). SPA menggunakan `createWebHistory`, jadi platform hosting perlu fallback ke `index.html` (sudah disiapkan):

- **Netlify**: hubungkan repo, build command `npm run build`, publish directory `dist`. SPA redirect otomatis lewat `public/_redirects`.
- **Vercel**: hubungkan repo, build command `npm run build`, output directory `dist`. Rewrite SPA sudah diatur di `vercel.json`.
- **GitHub Pages**: push ke branch `main` — workflow `.github/workflows/deploy.yml` akan build & deploy otomatis. Sebelumnya, atur `base: '/<nama-repo>/'` di `vite.config.ts` (untuk project pages), lalu di repo: Settings → Pages → Source: *GitHub Actions*.

Setelah deploy, ganti path absolut di `index.html`:
- `og:image` → URL lengkap, contoh `https://<domain>/og-image.jpg`
- tambahkan `<meta property="og:url" content="https://<domain>/">`
