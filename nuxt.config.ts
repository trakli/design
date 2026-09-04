// Trakli design system Nuxt layer.
// Consumed by a host app via `extends`, e.g.
//   export default defineNuxtConfig({ extends: ['github:trakli/design'] })
// Components in `components/` are auto-imported into the host with the same names.
export default defineNuxtConfig({
  components: [
    // Only .vue files are components; stories and specs live alongside them.
    { path: './components', pathPrefix: false, extensions: ['vue'] },
  ],
  // Ship the default token values. A host overrides them by redefining the
  // CSS custom properties in its own global stylesheet, loaded after this.
  css: ['@trakli/design/assets/css/tokens.css'],
})
