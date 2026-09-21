---
description: Component migration and primitive design guidelines for @trakli/ui-kit
globs: components/**/*.vue, composables/**/*.ts, utils/**/*.ts
---

# Component Migration & UI Kit Quality Rules

When migrating components from `webui` into `@trakli/ui-kit`:

1. **No String Concatenation for Copy (i18n)**:
   - Do NOT construct text via template literals (`You don't have any ${pageName.toLowerCase()}...`).
   - Expose explicit `title`, `description`, `actionLabel` props and slots (`#title`, `#description`, `#actions`) so consumers provide translated strings.

2. **Self-Contained Static Assets**:
   - Do NOT reference external public URLs like `/logo.svg` or `/_nuxt/logo.svg`.
   - Bundle SVGs/images directly into `assets/` and import them statically (`import logoUrl from '../assets/logo.svg'`).

3. **Strict Primitive Composition**:
   - Do NOT render raw HTML interactive/layout tags (`<input>`, `<button>`, `<div class="card">`, `<hr>`) when primitives exist.
   - Always compose: `TInput`, `TButton`, `TCard`, `TDivider`, `TDropdown`, `TDropdownItem`.

4. **Preserve Dynamic Polymorphism & Escape Hatches**:
   - Never collapse dynamic descriptor branches into hardcoded constants.
   - Always keep plugin component escape hatches (`resolveComponent(ui.component)`), slot variants, and fallbacks.

5. **Extensible Menus & Navigation**:
   - Do NOT hardcode domain-specific menus (e.g., Settings/Admin/Logout) into UI kit primitives.
   - Provide an `items` array prop (`MenuItem[]`) and `#menu` / `#header` slots with sensible defaults.

6. **Zero Migration Noise & Strict Types**:
   - Never commit scaffolding/transitional comments (`Migrated from webui/...`, `Tier 0 primitive`, `mirrors ...`).
   - Never use `@ts-nocheck` to silence TypeScript errors. Fix types properly.
