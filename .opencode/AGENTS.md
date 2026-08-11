# AGENTS.md — My Portfolio Vue

## Project Identity

This project is `my-portofolio-vue`.

It is a migration of an existing personal portfolio originally developed using:

- HTML
- CSS
- JavaScript

The current implementation uses:

- Vue 3
- Vite
- Vue Router
- Pinia

The existing portfolio implementation and design are the primary reference for the migration.

---

# 1. Core Rule

**Do not redesign the portfolio unless explicitly instructed.**

The purpose of this project is to migrate the existing HTML/CSS/JavaScript implementation to Vue + Vite while preserving the existing:

- Design
- Layout
- Colors
- Typography
- Spacing
- Animations
- Interactions
- Content
- Responsive behavior
- Navigation behavior

When there is a choice between changing the design and preserving the existing implementation, preserve the existing implementation.

---

# 2. Development Philosophy

Before modifying code:

1. Inspect the existing implementation.
2. Understand how the current feature works.
3. Identify existing components and utilities.
4. Reuse existing code when appropriate.
5. Make the smallest change necessary.
6. Validate the result.

Do not make assumptions about the project architecture when the repository can be inspected.

---

# 3. Vue

Use Vue 3 Composition API.

Prefer:

```vue
<script setup>
```

over the Options API.

Use Vue's reactive primitives appropriately:

- `ref`
- `reactive`
- `computed`
- `watch`

Do not introduce unnecessary reactivity.

---

# 4. Component Architecture

Do not put the entire application inside `App.vue`.

Use reusable components when appropriate.

Recommended structure:

```text
src/
├── components/
├── composables/
├── router/
├── stores/
├── views/
├── services/
├── utils/
└── assets/
```

Components should have a clear responsibility.

Do not create components merely for the sake of creating more files.

---

# 5. Vue Router

Use Vue Router for application navigation.

For internal navigation, prefer:

```vue
<RouterLink>
```

For programmatic navigation:

```ts
router.push()
```

Do not use `window.location` for normal SPA navigation.

Keep route configuration inside:

```text
src/router/
```

Page-level components belong in:

```text
src/views/
```

Use route parameters for resource-specific routes.

Use query parameters for filters, searches, and pagination when appropriate.

---

# 6. Pinia

Use Pinia for shared application state.

Appropriate use cases include:

- Global application state
- Theme state
- Shared portfolio data
- Authentication state if authentication is introduced
- State shared between unrelated components

Do not use Pinia for simple local component state.

For example:

```ts
const isMenuOpen = ref(false)
```

should remain local to the Navbar if no other component needs it.

Store files belong in:

```text
src/stores/
```

Keep stores focused on state and state-related operations.

---

# 7. Migration Rules

When converting existing HTML/CSS/JavaScript:

### HTML

Convert reusable sections into Vue components.

Do not blindly copy the entire HTML page into one Vue component.

### JavaScript

Do not blindly copy DOM manipulation into Vue.

Avoid unnecessary use of:

```js
document.querySelector()
document.getElementById()
element.classList.add()
element.classList.remove()
```

Prefer Vue's reactive state and directives:

```text
ref()
computed()
v-if
v-show
v-for
v-model
:class
@click
@submit
```

### CSS

Preserve the existing CSS behavior.

Do not rewrite working CSS simply because the project is being migrated to Vue.

---

# 8. UI Preservation

When migrating an existing section, compare the Vue implementation against the original implementation.

Verify:

- Dimensions
- Positioning
- Typography
- Colors
- Spacing
- Responsive behavior
- Hover states
- Animations
- Transitions

Do not introduce a new design system unless explicitly requested.

---

# 9. Responsive Design

The portfolio must work on:

- Mobile
- Tablet
- Desktop

Preserve existing responsive breakpoints where possible.

Do not introduce arbitrary breakpoints without a reason.

Do not create horizontal scrolling unless explicitly required.

---

# 10. Dependencies

Before installing a dependency:

1. Check `package.json`.
2. Determine whether an existing dependency already provides the functionality.
3. Determine whether Vue or native browser functionality is sufficient.
4. Only install a dependency when necessary.

Do not upgrade unrelated dependencies while implementing a feature.

---

# 11. Environment Variables

Do not hardcode environment-specific configuration.

For Vite client-side variables use:

```text
VITE_*
```

Example:

```env
VITE_API_URL=
```

Never expose:

- Passwords
- Private keys
- Database credentials
- Server secrets
- Private API keys

through client-side environment variables.

---

# 12. API

If the portfolio communicates with an API:

Do not put complex API requests directly inside UI components.

Prefer:

```text
src/services/
```

for reusable API communication.

Do not hardcode production API URLs.

Use:

```ts
import.meta.env.VITE_API_URL
```

when appropriate.

Handle:

- Loading
- Success
- Empty state
- Error

appropriately.

---

# 13. Debugging

When an error occurs:

1. Read the complete error message.
2. Identify the affected file.
3. Determine the root cause.
4. Inspect related code.
5. Apply the smallest reliable fix.
6. Validate the result.

Do not randomly modify multiple files.

Do not reinstall all dependencies unless dependency corruption is actually suspected.

Do not delete `node_modules` as a first troubleshooting step.

---

# 14. Validation

After significant changes, run the project's available validation commands.

At minimum, when applicable:

```bash
npm run build
```

Also run:

```bash
npm run lint
```

if the project provides a lint script.

Do not claim that a test or build was successful unless it was actually executed.

---

# 15. Git Safety

Treat existing uncommitted changes as intentional.

Never overwrite unrelated user changes.

Never automatically run destructive commands such as:

```bash
git reset --hard
git clean -fd
git checkout .
```

Do not create commits unless explicitly requested.

Do not push to remote repositories unless explicitly requested.

---

# 16. Scope Control

Only modify files relevant to the requested task.

If asked to fix a specific component, do not redesign unrelated components.

Do not perform large refactors unless they are necessary or explicitly requested.

Avoid changing:

- Dependencies
- Configuration
- Architecture
- Styling
- Routing

when they are unrelated to the task.

---

# 17. Priority Rules

When instructions conflict, follow this priority:

1. Explicit user instructions
2. Existing project requirements
3. Existing project architecture
4. `AGENTS.md`
5. Project skills
6. General coding conventions

The agent must inspect the project before making architectural assumptions.

---

# 18. Final Report

After completing a task, provide a concise summary containing:

### Changes

What was changed.

### Files

Important files modified or created.

### Validation

Commands actually executed.

### Remaining Issues

Any known unresolved problems.

Do not claim work was completed if it was not actually completed.