---
name: my-portofolio-vue
description: Development standards and workflow for this Vue 3 + Vite project. Use this skill whenever creating, modifying, debugging, refactoring, or reviewing project code.
---

# Vue + Vite Project Development Skill

## 1. Purpose

This skill defines the development standards, architecture rules, coding conventions, debugging workflow, UI rules, API handling, and validation process for this project.

The primary goal is to produce code that is:

- Maintainable
- Reusable
- Consistent
- Type-safe
- Responsive
- Accessible
- Performant
- Easy to debug
- Compatible with the existing project architecture

Do not introduce unnecessary complexity.

---

# 2. Technology Stack

The project uses:

- Vue 3
- Vite
- Pania
- Vue Router
- JavaScript or TypeScript according to the existing project
- Vue Composition API
- `<script setup>`
- HTML
- CSS
- Tailwind CSS when installed
- Existing project UI/component libraries when available

Before writing code, inspect `package.json` and the existing source code to determine the exact installed versions and dependencies.

Do not assume a dependency exists.

---

# 3. Core Development Principles

Always follow these principles:

1. Understand existing code before modifying it.
2. Prefer modifying existing functionality over duplicating it.
3. Reuse components, composables, utilities, and services whenever possible.
4. Keep changes small and focused.
5. Do not rewrite unrelated code.
6. Do not introduce unnecessary dependencies.
7. Do not change the project architecture without a valid reason.
8. Preserve existing functionality unless the task explicitly requires changing it.
9. Follow existing naming and folder conventions.
10. Prefer simple solutions over unnecessarily complex abstractions.

---

# 4. Before Changing Code

Before implementing a feature or fixing a bug:

1. Inspect `package.json`.
2. Inspect the relevant source files.
3. Identify the application's routing structure.
4. Identify existing components.
5. Identify existing composables.
6. Identify API/service modules.
7. Identify state management.
8. Check existing styling conventions.
9. Check environment variables.
10. Determine whether the requested functionality already exists elsewhere.

Do not immediately create a new file if an existing file can reasonably handle the feature.

---

# 5. Vue Development Rules

## 5.1 Composition API

Prefer Vue 3 Composition API.

Use:

```vue
<script setup>
```

instead of the Options API unless the existing component already uses Options API and converting it would provide a clear benefit.

Example:

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

const doubled = computed(() => count.value * 2)
</script>

<template>
  <button @click="count++">
    {{ doubled }}
  </button>
</template>
```

---

# 6. Component Design

Components should have a single clear responsibility.

Prefer:

```text
components/
├── Navbar.vue
├── Footer.vue
├── Button.vue
├── Modal.vue
└── ProductCard.vue
```

Avoid creating large components containing unrelated functionality.

If a component becomes difficult to understand, consider extracting:

- reusable UI
- business logic
- API logic
- state logic
- composables

Do not split components excessively when doing so makes the project harder to understand.

---

# 7. Props and Emits

Use props for parent-to-child data.

Use emits for child-to-parent events.

Example:

```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})

defineEmits(['submit'])
</script>
```

Do not mutate props directly.

If a child needs to modify data owned by the parent, emit an event instead.

---

# 8. Composables

Reusable logic should be placed in composables when appropriate.

Example:

```text
src/
└── composables/
    ├── useAuth.ts
    ├── useFetch.ts
    └── useModal.ts
```

A composable should have a clear responsibility.

Prefer:

```ts
useAuth()
useProducts()
useTheme()
```

over placing large amounts of reusable logic inside components.

Do not create a composable for trivial logic that is only used once.

---

# 9. State Management

If the project uses Pinia, use Pinia for application-level shared state.

Examples:

- Authentication state
- User state
- Shopping cart
- Global preferences
- Application configuration

Do not put every piece of local component state into Pinia.

Use local Vue state for component-specific data.

Example:

```ts
const isOpen = ref(false)
```

does not need a global store.

---

# 10. Routing

If Vue Router is installed, follow the existing routing architecture.

Keep routes organized.

Example:

```text
src/
├── router/
│   └── index.ts
├── views/
│   ├── Home.vue
│   ├── About.vue
│   └── Contact.vue
└── components/
```

Do not place large page implementations directly inside the router configuration.

Use route guards when authentication or authorization requires them.

Do not duplicate authentication checks across multiple components if a router guard can handle them centrally.

---

# 11. API and Backend Communication

Never hardcode production API URLs inside components.

Bad:

```ts
fetch('https://example.com/api/users')
```

Prefer environment variables.

Example:

```env
VITE_API_URL=http://localhost:8787
```

Then:

```ts
const apiUrl = import.meta.env.VITE_API_URL
```

For Vite, only environment variables prefixed with `VITE_` are exposed to client-side code.

Never put secrets, passwords, private API keys, or server credentials in `VITE_` variables.

---

# 12. API Architecture

Avoid putting complex API requests directly into UI components.

Prefer a service layer.

Example:

```text
src/
└── services/
    ├── api.ts
    ├── auth.service.ts
    ├── user.service.ts
    └── product.service.ts
```

Example:

```ts
export async function getUsers() {
  const response = await fetch(`${API_URL}/users`)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}
```

Components should consume services rather than duplicate HTTP logic.

---

# 13. API State Handling

Every asynchronous operation should consider:

- Loading
- Success
- Empty state
- Error

Example:

```ts
const loading = ref(false)
const error = ref(null)
const data = ref([])

async function loadData() {
  loading.value = true
  error.value = null

  try {
    data.value = await getData()
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
```

The UI should provide appropriate feedback for these states.

---

# 14. Environment Variables

Use:

```text
.env
.env.local
.env.development
.env.production
```

according to the project's existing configuration.

Do not commit secrets.

If `.env` contains sensitive values, ensure it is included in `.gitignore`.

Use:

```env
VITE_API_URL=
```

for client-side configuration.

Never assume an environment variable exists. Validate important configuration when necessary.

---

# 15. Styling

Follow the project's existing styling system.

If Tailwind CSS is installed, prefer Tailwind utilities over introducing additional styling systems.

Do not mix multiple CSS frameworks without a clear reason.

Avoid excessive inline styles.

Prefer reusable classes or components for repeated visual patterns.

Maintain:

- consistent spacing
- typography
- colors
- borders
- shadows
- responsive behavior
- hover/focus states

Do not arbitrarily redesign existing UI when the task only asks for a functional change.

---

# 16. Responsive Design

Every new UI component should consider:

- Mobile
- Tablet
- Desktop

Do not assume desktop-only layouts.

Use responsive Tailwind utilities when Tailwind is available.

Example:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

Avoid fixed widths that cause horizontal scrolling unless explicitly required.

---

# 17. Accessibility

Use semantic HTML whenever possible.

Prefer:

```html
<button>
```

instead of:

```html
<div @click="...">
```

Interactive elements should be keyboard accessible.

Images should have meaningful `alt` text when appropriate.

Form controls should have associated labels.

Do not rely solely on color to communicate information.

Maintain visible focus states.

---

# 18. Forms

Forms should provide:

- Validation
- Loading state
- Error feedback
- Success feedback
- Disabled state during submission when appropriate

Do not silently ignore failed submissions.

Avoid submitting multiple requests accidentally.

---

# 19. TypeScript

If the project uses TypeScript:

- Prefer explicit types for public interfaces.
- Avoid `any` unless absolutely necessary.
- Use interfaces/types for API responses.
- Type component props and emits.
- Type composables.
- Type service responses.

Prefer:

```ts
interface User {
  id: number
  name: string
  email: string
}
```

instead of:

```ts
const user: any = ...
```

Do not suppress TypeScript errors without understanding the underlying problem.

Avoid unnecessary `as` assertions.

---

# 20. File and Folder Organization

Follow the existing project structure.

A recommended structure is:

```text
src/
├── assets/
├── components/
├── composables/
├── layouts/
├── router/
├── services/
├── stores/
├── types/
├── utils/
├── views/
├── App.vue
└── main.ts
```

Not every project needs every directory.

Do not create empty architectural folders simply to follow this example.

---

# 21. Naming Conventions

Use descriptive names.

Components:

```text
UserCard.vue
Navbar.vue
ProductList.vue
```

Composables:

```text
useAuth.ts
useProducts.ts
useTheme.ts
```

Services:

```text
auth.service.ts
product.service.ts
```

Utilities:

```text
formatDate.ts
validation.ts
```

Avoid names such as:

```text
thing.ts
test2.vue
newComponent.vue
temp.js
helper.js
```

unless they have a genuinely appropriate meaning.

---

# 22. Error Handling

Never silently swallow errors.

Avoid:

```ts
try {
  await doSomething()
} catch {}
```

Prefer:

```ts
try {
  await doSomething()
} catch (error) {
  console.error('Failed to perform operation:', error)
}
```

For user-facing operations, provide appropriate UI feedback.

Do not expose stack traces, credentials, tokens, or internal server information to users.

---

# 23. Debugging Workflow

When fixing an error:

1. Read the complete error message.
2. Identify the originating file.
3. Identify whether the problem is:
   - dependency
   - configuration
   - TypeScript
   - Vue
   - Vite
   - API
   - runtime
   - browser
   - environment
4. Inspect the relevant code.
5. Determine the root cause.
6. Apply the smallest appropriate fix.
7. Run validation commands.
8. Check for regressions.

Do not randomly modify multiple configuration files hoping the error disappears.

Do not reinstall the entire project unless dependency corruption is actually suspected.

---

# 24. Dependency Management

Before installing a dependency:

1. Check `package.json`.
2. Check whether the functionality already exists in the project.
3. Check whether it can be implemented without a dependency.
4. Only then consider installing a package.

Do not install duplicate libraries that perform the same function.

After installing a dependency, verify that:

```bash
npm install
npm run build
```

still work when applicable.

Do not downgrade or upgrade major dependencies without a clear reason.

---

# 25. Vite Configuration

Do not modify `vite.config.*` unless the task requires it.

When changing Vite configuration:

- Preserve existing plugins.
- Preserve aliases.
- Preserve environment configuration.
- Preserve development server configuration unless explicitly changing it.
- Verify the production build afterward.

Do not hardcode machine-specific paths.

---

# 26. Development Server

Use the project's existing npm scripts.

Typical commands:

```bash
npm run dev
npm run build
npm run preview
```

Do not change ports or host configuration unless required.

If the development server needs to be accessible from another device, inspect the existing Vite configuration before changing it.

---

# 27. Build Validation

After significant code changes, run:

```bash
npm run build
```

If the project has a lint command:

```bash
npm run lint
```

If the project has tests:

```bash
npm test
```

or the appropriate project-specific command.

Fix errors caused by your changes.

Do not ignore build failures.

---

# 28. Git Safety

Never automatically execute destructive Git commands.

Do not run:

```bash
git reset --hard
git clean -fd
git checkout .
```

unless explicitly instructed.

Do not delete user changes.

Do not create commits unless requested.

Do not push to remote repositories unless explicitly requested.

Before making large changes, inspect the current Git state when appropriate:

```bash
git status
```

---

# 29. Existing User Changes

Treat existing uncommitted changes as intentional.

Do not overwrite, revert, or delete them simply because they are unrelated to the current task.

When modifying a file that already contains user changes:

- Preserve unrelated changes.
- Modify only the required section.
- Avoid replacing the entire file unnecessarily.

---

# 30. Code Quality

Prefer code that is:

- Simple
- Explicit
- Reusable
- Testable
- Readable

Avoid:

- Premature abstraction
- Deeply nested logic
- Massive components
- Duplicate code
- Magic numbers
- Unnecessary dependencies
- Unnecessary watchers
- Excessive global state

---

# 31. Performance

Do not optimize prematurely.

However, avoid obvious performance problems such as:

- unnecessary API requests
- unnecessary watchers
- repeated expensive computations
- rendering huge lists without consideration
- loading large assets unnecessarily

Use Vue features such as:

```ts
computed()
```

when derived values need reactive caching.

Use lazy-loaded routes when appropriate.

---

# 32. Security

Never expose:

- API secrets
- private keys
- database credentials
- authentication secrets
- server-only environment variables

Never trust user input.

Validate data received from APIs.

Do not use `v-html` with untrusted content unless the content has been properly sanitized.

Avoid constructing unsafe HTML from user input.

---

# 33. Documentation

Add comments only when they explain something that is not obvious from the code.

Avoid comments like:

```ts
// increment count
count++
```

Prefer comments explaining:

- architectural decisions
- unusual workarounds
- complex algorithms
- browser-specific behavior
- important constraints

Do not generate excessive documentation for simple code.

---

# 34. Refactoring

When refactoring:

1. Understand current behavior.
2. Preserve existing behavior.
3. Make one logical refactor at a time.
4. Avoid mixing refactoring with unrelated features.
5. Validate afterward.

Do not refactor the entire project merely because one component is messy.

---

# 35. Feature Implementation Workflow

For a new feature:

### Step 1 — Understand

Inspect the existing architecture.

### Step 2 — Plan

Determine:

- components required
- views required
- state required
- API requirements
- reusable logic
- styling requirements

### Step 3 — Implement

Implement the smallest complete solution.

### Step 4 — Integrate

Connect:

- router
- state
- API
- components
- UI

as required.

### Step 5 — Validate

Run:

```bash
npm run build
```

and other available checks.

### Step 6 — Review

Check:

- responsive layout
- error handling
- loading states
- accessibility
- duplicated code
- console errors
- unintended changes

---

# 36. Bug Fix Workflow

For a bug:

### Identify

Determine the actual root cause.

### Reproduce

Understand when and why the problem occurs.

### Fix

Apply the smallest reliable fix.

### Validate

Confirm:

- original bug is fixed
- related functionality still works
- build succeeds

Do not mask errors with arbitrary fallbacks.

---

# 37. UI/UX Rules

When implementing UI:

- Follow the existing design language.
- Maintain consistent spacing.
- Maintain consistent typography.
- Use existing components before creating duplicates.
- Make interactive states obvious.
- Provide feedback for asynchronous actions.
- Avoid unnecessary animations.
- Keep mobile usability in mind.

Do not introduce a completely different visual style unless explicitly requested.

---

# 38. User Experience

For actions that take time:

Show an appropriate loading state.

For failed operations:

Show a useful error state.

For successful operations:

Provide confirmation when appropriate.

For empty collections:

Provide a meaningful empty state instead of displaying a blank screen.

---

# 39. Avoid Unnecessary Changes

When the task is:

> Fix button X.

Do not:

- redesign the page
- change unrelated components
- upgrade dependencies
- restructure the project
- modify the backend

unless those changes are necessary to solve the problem.

The scope of the implementation should match the scope of the request.

---

# 40. Final Response After Coding

After completing a coding task, report concisely:

### Changes

List what was changed.

### Files

List important files modified or created.

### Validation

Mention commands that were executed, for example:

```text
npm run build
npm run lint
```

### Remaining Issues

Mention any unresolved issue or limitation.

Do not claim that something was tested if it was not actually tested.

---

# 41. Important Rule

When uncertain about the existing project architecture:

DO NOT guess.

Inspect the project first.

When an existing implementation conflicts with these guidelines, prioritize:

1. Explicit user instructions
2. Existing project requirements
3. Existing architecture
4. This skill
5. General coding preferences

The goal is not to force the project into a predetermined architecture.

The goal is to make safe, consistent, maintainable changes within the project's existing architecture.