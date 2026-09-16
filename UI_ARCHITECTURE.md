# UI Design System: Component Architecture Inventory & Migration Tracker

> **Architecture Note**: This codebase follows a **pragmatic 5-layer component hierarchy** rather than the modern 6-layer headless-first pattern:
> 
> ```
> Layer 0: Design Tokens & Utilities
> Layer 1: Base Components (Atoms) — Styled building blocks
> Layer 2: Composite Components (Molecules) — Reusable patterns
> Layer 3: Domain Components — Business logic & data-bound
> Layer 4: Layouts & Pages — Application structure & routes
> ```
> 
> **Key Difference**: This codebase does **not** have a dedicated headless primitive layer (like Radix UI, Ark UI, or React Aria). Base components (Layer 1) serve dual roles as both behavioral and visual primitives. When migrating to a headless-first architecture, Layer 1 components should be refactored to compose headless primitives with styled wrappers.

> **Tracking Legend**:
> - `[ ]` = Pending migration
> - `[x]` = Migrated to the modern headless/token-driven standard

---

## ▸ Layer 0: Design Tokens, Foundation Scales & Utilities

> The absolute foundation. Raw design variables, scale systems, formatters, and stateless utility logic. Zero dependency on components or business domain data.

> The absolute ground floor. Raw values, algorithms, formatters, and stateless UI logic only. Zero dependency on business domain data.

---

### 0.1 Color Tokens & CSS Custom Properties
**File:** [assets/scss/_variables.scss](file:///home/lantum/Desktop/Projects/webui/assets/scss/_variables.scss)

#### Brand & Interaction Palette
- [x] `--color-primary` — Core brand green (`#047844` / dark: `#059669`)
- [x] `--color-primary-rgb` — RGB channel split for alpha mixing
- [x] `--color-primary-hover` — Hover darkened shade
- [x] `--color-primary-light` — Tinted fill for chips, surfaces
- [x] `--color-primary-dark` — Deep/contrast accent
- [x] `--color-primary-lighter` — Soft accent for highlights
- [x] `--color-primary-border` — Focused ring / active border colour
- [x] `--color-primary-muted` — Subtle badge and indicator
- [x] `--color-primary-toggle` — Switch/toggle active state
- [x] `--color-success` / `--color-success-rgb`
- [x] `--color-error` / `--color-error-rgb` / `--color-error-dark`
- [x] `--color-warning` / `--color-warning-rgb` / `--color-warning-bg` / `--color-warning-text`
- [x] `--color-info` / `--color-info-rgb`
- [x] `--color-accent` — Callout / flash highlight

#### Financial Domain Semantics
- [x] `--color-income` / `--color-income-rgb` / `--color-income-soft`
- [x] `--color-expense` / `--color-expense-rgb` / `--color-expense-soft`
- [x] `--color-neutral-soft` — Transfers / balanced entries
- [x] `--color-chart-grid` — SVG/Canvas axis grid lines
- [x] `--color-table-header` — Sticky table header background

#### Typography & Surface Tokens
- [x] `--color-text-primary` / `--color-text-secondary` / `--color-text-muted` / `--color-text-inverse`
- [x] `--color-bg-light` / `--color-bg-gray` / `--color-bg-white` / `--color-bg-slate` / `--color-bg-card`
- [x] `--color-input-bg`
- [x] `--color-border` / `--color-border-light` / `--color-border-medium` / `--color-border-gray`
- [x] `--glass-bg` / `--glass-bg-strong` — Glassmorphic backdrop fills
- [x] `--hover-overlay` / `--press-overlay` — State layer overlays

---

### 0.2 Elevation & Shadow Scales
**File:** [assets/scss/_variables.scss](file:///home/lantum/Desktop/Projects/webui/assets/scss/_variables.scss)

- [x] `--shadow-sm` / `--shadow-md` / `--shadow-lg` / `--shadow-xl`
- [x] `--elevation-0` — Flat / no shadow
- [x] `--elevation-1` — Subtle ambient (base cards)
- [x] `--elevation-2` — Raised cards & dropdowns
- [x] `--elevation-3` — Floating panels
- [x] `--elevation-4` — Dialogs & popovers
- [x] `--elevation-5` — Critical overlays

---

### 0.3 Design Scales: Spacing, Radius, Typography, Breakpoints, Z-Index & Motion
**File:** [assets/scss/_variables.scss](file:///home/lantum/Desktop/Projects/webui/assets/scss/_variables.scss)

#### Spacing Scale
- [x] `$spacing-1` (4px) · `$spacing-2` (8px) · `$spacing-3` (12px) · `$spacing-4` (16px)
- [x] `$spacing-5` (20px) · `$spacing-6` (24px) · `$spacing-8` (32px) · `$spacing-10` (40px) · `$spacing-12` (48px)

#### Border Radius Scale
- [x] `$radius-sm` (2px) · `$radius-md` (4px) · `$radius-lg` (6px) · `$radius-xl` (8px)

#### Typography Scale & Font Weights
- [x] `$font-family-sans` — `'Ubuntu', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif`
- [x] `$font-size-xs` (12px) · `$font-size-sm` (14px) · `$font-size-base` (16px) · `$font-size-lg` (18px) · `$font-size-xl` (20px) · `$font-size-2xl` (24px)
- [x] `$font-normal` (400) · `$font-medium` (500) · `$font-semibold` (600) · `$font-bold` (700)

#### Responsive Breakpoints
- [x] `$breakpoint-sm` (640px) · `$breakpoint-md` (768px) · `$breakpoint-lg` (1024px) · `$breakpoint-xl` (1280px) · `$breakpoint-2xl` (1536px)

#### Z-Index Scale
- [x] `$z-index-dropdown` (1000) · `$z-index-sticky` (1020) · `$z-index-fixed` (1030)
- [x] `$z-index-modal-backdrop` (1040) · `$z-index-modal` (1050) · `$z-index-popover` (1060) · `$z-index-tooltip` (1070)

#### Motion & Easing Curves (Material 3)
- [x] `$easing-standard` `cubic-bezier(0.2, 0, 0, 1)` — Everyday micro-interactions
- [x] `$easing-emphasized` `cubic-bezier(0.3, 0, 0, 1)` — Hero / page-level transitions
- [x] `$easing-decelerate` `cubic-bezier(0, 0, 0, 1)` — Entering animations
- [x] `$easing-accelerate` `cubic-bezier(0.3, 0, 1, 1)` — Exiting animations
- [x] `$duration-fast` (150ms) · `$duration-base` (250ms) · `$duration-slow` (400ms) · `$duration-deliberate` (600ms)

#### Layout Structural Constants
- [x] `$navbar-height` (52px) · `$navbar-icon-button-height` (36px)
- [x] `$sidebar-width` (300px) · `$sidebar-width-collapsed` (80px) · `$sidebar-mobile-width` (280px)
- [x] `$table-cell-padding` / `$table-header-padding`

---

### 0.4 Global CSS Surface & Utility Primitives

#### Surface Variants — [assets/scss/_surfaces.scss](file:///home/lantum/Desktop/Projects/webui/assets/scss/_surfaces.scss)
- [x] `.surface` base class + `--surface-bg` / `--surface-ink` / `--surface-accent` / `--surface-deep` scoped custom properties
- [x] `.surface--brand` / `.surface--brand-soft`
- [x] `.surface--income` / `.surface--expense` / `.surface--neutral`
- [x] `.surface--investment` / `.surface--loan` / `.surface--gift`
- [x] `.display-1` / `.display-2` / `.display-3` — Fluid `clamp()` hero headings
- [x] `.eyebrow` — 11px uppercased section labels
- [x] `.glass-pill` — Backdrop-blurred pill tag
- [x] `.tone-card` — Responsive tone surface card wrapper

#### Form Structural Class Primitives — [assets/scss/_form-styles.scss](file:///home/lantum/Desktop/Projects/webui/assets/scss/_form-styles.scss)
- [x] `.entity-form` — Max-width constrained column layout form container
- [x] `.card-form` — Modal card wrapper for forms
- [x] `.form-group` — Flex column with gap
- [x] `.form-label` / `.error-text`
- [x] `.form-input` / `.form-select` / `.form-textarea` — Full-featured input atoms with hover, focus, disabled, error states
- [x] `.form-header` / `.form-actions` — Structured header + footer button rows
- [x] `.name-col` / `.name-icon-row` / `.two-col-row` — Grid layout helpers
- [x] `.btn` / `.btn-primary` / `.btn-secondary` — Generic button class set
- [x] `.submit-btn` / `.close-btn` — Specialised form action buttons
- [x] `.icon-trigger` / `.icon-popover` — Icon picker trigger button + floating container

#### Layout Utility Primitives — [assets/scss/_utilities.scss](file:///home/lantum/Desktop/Projects/webui/assets/scss/_utilities.scss)
- [x] `.only-mobile` / `.only-tablet` / `.only-desktop` — Viewport-conditional visibility
- [x] `.hide-mobile` / `.hide-tablet` / `.hide-desktop` — Viewport-conditional hiding
- [x] `.chip` / `.chip--primary` / `.chip--report` / `.chip-icon` — Pill geometry primitive
- [x] `.icon-button` — 28–32px icon-only bounding box button
- [x] `.search-container` — Responsive flex search wrapper

---

### 0.5 Headless UI Helpers, Algorithms & Formatters

#### Color Utilities — [utils/colors.ts](file:///home/lantum/Desktop/Projects/webui/utils/colors.ts)
- [x] `hashString(str)` — Deterministic 32-bit string-to-integer hash
- [x] `generateHSLColor(input, saturation, lightness)` — Infinite algorithmic colour generator
- [x] `getColorForItem(item, index, opts)` — Base palette first, then HSL fallback
- [x] `generateColorPalette(items, opts)` — Bulk unique colour mapping for lists/charts
- [x] `getChartColors(data, opts)` — Chart dataset colour enricher
- [x] `THEME_COLORS` — Semantic colour constants map (`income`, `expense`, `balance`, `neutral`, `success`, `warning`, `danger`, `info`)

#### Currency & Data Formatters — [utils/currency.ts](file:///home/lantum/Desktop/Projects/webui/utils/currency.ts)
- [x] `formatCurrency(amount, currency, locale)` — `Intl.NumberFormat` localized money formatter

#### Headless UI State Composables
- [x] `useTheme()` — Light/Dark/System state machine, `localStorage` persistence, `prefers-color-scheme` listener ([composables/useTheme.ts](file:///home/lantum/Desktop/Projects/webui/composables/useTheme.ts))
- [x] `useDropdown()` — Click-outside DOM listener, open/close toggle, `rootRef` anchor ([composables/useDropdown.ts](file:///home/lantum/Desktop/Projects/webui/composables/useDropdown.ts))
- [x] `useSidebar()` — Mobile drawer state, viewport resize listener, desktop collapse persistence ([composables/useSidebar.js](file:///home/lantum/Desktop/Projects/webui/composables/useSidebar.js))
- [x] `usePasswordToggle()` — Input `type` toggle (`password` ↔ `text`) ([composables/usePasswordToggle.js](file:///home/lantum/Desktop/Projects/webui/composables/usePasswordToggle.js))
- [x] `useAvatar()` — Deterministic initials parser and fallback avatar background resolver ([composables/useAvatar.ts](file:///home/lantum/Desktop/Projects/webui/composables/useAvatar.ts))
- [x] `useMarkdown()` — SSR-safe, HTML-escaped Markdown-It renderer (`html: false`, `linkify: true`) ([composables/useMarkdown.ts](file:///home/lantum/Desktop/Projects/webui/composables/useMarkdown.ts))

---

## ▸ Layer 1: Base Components (Atoms)

> Lowest-level styled `.vue` building blocks. These are **already styled components** (not headless primitives). They serve dual roles as both behavioral and visual atoms. Zero business/domain logic. Stateless or local-state only.
>
> **Migration Path**: When adopting a headless-first architecture, these should be refactored to compose headless primitives (Radix UI, Ark UI, or Reka UI) with a thin styled wrapper layer.

| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [x] | **TButton** | [TButton.vue](file:///home/lantum/Desktop/Projects/webui/components/TButton.vue) | Polymorphic button atom. Variants: `primary`, `secondary`, `outline`, `text`. Sizes: `small`, `medium`, `large`. States: `loading` (spinner), `disabled`, `fullWidth`. Renders as `<NuxtLink>` when `to` prop provided. |
| [x] | **TDropdown** | [TDropdown.vue](file:///home/lantum/Desktop/Projects/webui/components/TDropdown.vue) | Headless floating overlay container. Click-outside detection. `trigger` + default content slots. Scale + fade animated transitions. |
| [x] | **TDropdownItem** | [TDropdownItem.vue](file:///home/lantum/Desktop/Projects/webui/components/TDropdownItem.vue) | Slot-based menu item button. 40px touch target. Standardised hover / focus-visible / active states. |
| [x] | **TCard** | [TCard.vue](file:///home/lantum/Desktop/Projects/webui/components/TCard.vue) | Structural card container with elevation tokens. `header`, body, and `footer` slots. |
| [x] | **TTabs** | [TTabs.vue](file:///home/lantum/Desktop/Projects/webui/components/TTabs.vue) | Pill-style tab bar. Dynamic named slot switching per active tab. Icon + label per tab. |
| [x] | **SearchInput** | [SearchInput.vue](file:///home/lantum/Desktop/Projects/webui/components/SearchInput.vue) | Debounced `v-model` text input with built-in search icon and focus-expand animation. |
| [x] | **LoadingSkeleton** | [LoadingSkeleton.vue](file:///home/lantum/Desktop/Projects/webui/components/LoadingSkeleton.vue) | Shimmer-animated skeleton. Variants: `default`, `list`, `card`, `table`. Props: `count`, `columns`. |
| [x] | **EmptyState** | [EmptyState.vue](file:///home/lantum/Desktop/Projects/webui/components/EmptyState.vue) | Full-center empty state with customisable icon, i18n headline, subtitle, and CTA button (`@create`). |
| [x] | **ComponentLoader** | [ComponentLoader.vue](file:///home/lantum/Desktop/Projects/webui/components/ComponentLoader.vue) | State orchestration wrapper: loading → `LoadingSkeleton`, error → retry alert, empty → `EmptyState`, data → default slot. |
| [x] | **HamburgerMenu** | [HamburgerMenu.vue](file:///home/lantum/Desktop/Projects/webui/components/HamburgerMenu.vue) | Animated 3-line → X toggle button for mobile navigation. `isOpen` prop + `@toggle` emit. |
| [x] | **TInfoButton** | [TInfoButton.vue](file:///home/lantum/Desktop/Projects/webui/components/TInfoButton.vue) | 34×48px information icon button atom. |
| [x] | **TypingDots** | [ai/TypingDots.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/TypingDots.vue) | Aria-labelled 3-dot staggered bounce animation for AI streaming / loading states. |
| [x] | **TAvatar** | [TAvatar.vue](file:///home/lantum/Desktop/Projects/webui/components/TAvatar.vue) | User avatar trigger button with integrated account dropdown (Settings, Admin, Logout). Consumes `useDropdown` + `useAuth`. |
| [x] | **Logo** | [Logo.vue](file:///home/lantum/Desktop/Projects/webui/components/Logo.vue) | Brand logo image. Sizes: `small / medium / large`. Fallback path error handling. |
| [x] | **ViewToggle** | [ViewToggle.vue](file:///home/lantum/Desktop/Projects/webui/components/ViewToggle.vue) | Segmented 2-button control toggling `table` ↔ `cards` view mode via `v-model`. |
| [x] | **ThemeToggleButton** | [ThemeToggleButton.vue](file:///home/lantum/Desktop/Projects/webui/components/ThemeToggleButton.vue) | 40px round icon button calling `useTheme().toggleTheme()`. Swaps `Sun` / `Moon` icon based on `isDark`. |
| [x] | **GoogleIcon** | [icons/GoogleIcon.vue](file:///home/lantum/Desktop/Projects/webui/components/icons/GoogleIcon.vue) | Inline SVG Google brand logo. No props; purely presentational. |
| [x] | **AuthDivider** | [auth/AuthDivider.vue](file:///home/lantum/Desktop/Projects/webui/components/auth/AuthDivider.vue) | Horizontal "OR" divider with flanking lines for auth forms. Purely decorative layout atom. |
| [x] | **AuthFooterLink** | [AuthFooterLink.vue](file:///home/lantum/Desktop/Projects/webui/components/AuthFooterLink.vue) | Auth-page footer copy + link row. Props: `text`, `linkText`, `to`. |
| [x] | **ExtensionSlot** | [extensions/ExtensionSlot.vue](file:///home/lantum/Desktop/Projects/webui/components/extensions/ExtensionSlot.vue) | Renderless plugin injection point. Iterates slot contributions via `useExtensionSlots` and delegates to `DescriptorRenderer`. |

---

## ▸ Layer 2: Composite Components (Molecules & Organisms)

> Reusable widgets combining multiple Layer 1 atoms or SCSS primitives into richer interactive patterns. No product/domain logic. Safe to use across any context within the application.

| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **SearchableDropdown** | [SearchableDropdown.vue](file:///home/lantum/Desktop/Projects/webui/components/SearchableDropdown.vue) | Full-featured combobox. Text search, single & multi-select, chip removal, option highlight matching, outside-click detection, disabled options. |
| [ ] | **ThemeSelector** | [ThemeSelector.vue](file:///home/lantum/Desktop/Projects/webui/components/ThemeSelector.vue) | `.icon-button` trigger + themed dropdown panel exposing Light / Dark / System options. Consumes `useTheme` + `useDropdown`. |
| [ ] | **LanguageSelector** | [LanguageSelector.vue](file:///home/lantum/Desktop/Projects/webui/components/LanguageSelector.vue) | Flag-icon trigger + scrollable locale list dropdown. Consumes `useI18n` + `useDropdown`. |
| [ ] | **CollapsibleSection** | [settings/CollapsibleSection.vue](file:///home/lantum/Desktop/Projects/webui/components/settings/CollapsibleSection.vue) | Animated accordion with icon title, expand/collapse chevron, inline Edit/Done mode toggle, and slotted body content. |
| [ ] | **ConfirmModal** | [modals/ConfirmModal.vue](file:///home/lantum/Desktop/Projects/webui/components/modals/ConfirmModal.vue) | Backdrop modal dialog with animated entry, contextual icon, and confirm/cancel actions. Types: `warning`, `danger`, `info`. |
| [ ] | **TTableComponent** | [TTableComponent.vue](file:///home/lantum/Desktop/Projects/webui/components/TTableComponent.vue) | Generic data table with sticky header/footer, inline edit/delete/recurrent actions, income/expense/net totals tray, and paginator. |
| [ ] | **ContentCard** | [ContentCard.vue](file:///home/lantum/Desktop/Projects/webui/components/ContentCard.vue) | Generic entity list row. Dynamic Lucide icon, name, description, type badge, default badge, edit/delete actions. |
| [ ] | **ContentCardGrid** | [ContentCardGrid.vue](file:///home/lantum/Desktop/Projects/webui/components/ContentCardGrid.vue) | Responsive `auto-fill` grid for entity cards. Inline context menu (edit/delete) per card with outside-click handling. Supports dynamic `cardFields` rendering. |
| [ ] | **ContentTable** | [ContentTable.vue](file:///home/lantum/Desktop/Projects/webui/components/ContentTable.vue) | Generic entity tabular view with search, sortable columns, and per-row actions. |
| [ ] | **ContentListView** | [ContentListView.vue](file:///home/lantum/Desktop/Projects/webui/components/ContentListView.vue) | Master meta-component: wraps `ContentTable` + `ContentCardGrid` with `ViewToggle` switch, local search, and client-side pagination. |
| [ ] | **ContentSection** | [ContentSection.vue](file:///home/lantum/Desktop/Projects/webui/components/ContentSection.vue) | Page content region shell: header with title slot + primary CTA action slot + body area. |
| [ ] | **TTopCard** | [TTopCard.vue](file:///home/lantum/Desktop/Projects/webui/components/TTopCard.vue) | Branded page header hero card with SVG radial bloom decoration, breadcrumb nav, dynamic icon resolved from `pageName`, info button, action slot, and primary CTA via `TButton`. |
| [ ] | **TDashboardTopCard** | [TDashboardTopCard.vue](file:///home/lantum/Desktop/Projects/webui/components/TDashboardTopCard.vue) | Dashboard-scoped KPI hero card variant with trend delta indicator. |
| [ ] | **TTransactionCard** | [TTransactionCard.vue](file:///home/lantum/Desktop/Projects/webui/components/TTransactionCard.vue) | Mobile-friendly card row for a single transaction entry (amount, party, category, type badge). |
| [ ] | **TTransactionSubCard** | [TTransactionSubCard.vue](file:///home/lantum/Desktop/Projects/webui/components/TTransactionSubCard.vue) | Sub-item card for grouped or nested transaction entries. |
| [ ] | **SparkLine** | [reports/SparkLine.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/SparkLine.vue) | Pure SVG mini-chart. Gradient area fill, polyline path, terminal point dot. Takes `values[]` array + `color`. Zero chart library dependency. |
| [ ] | **KpiCard** | [reports/KpiCard.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/KpiCard.vue) | Label + large display-value card. `is-positive` / `is-negative` value colour modifier classes. |
| [ ] | **PeriodControl** | [reports/PeriodControl.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/PeriodControl.vue) | Period chip selector (predefined + custom date-range popover with transitions), compare toggle, and recap action CTA. |
| [ ] | **ReportsTabs** | [reports/ReportsTabs.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/ReportsTabs.vue) | Tab navigation bar specific to the reports section pages. |
| [ ] | **IconPicker** | [IconPicker.vue](file:///home/lantum/Desktop/Projects/webui/components/IconPicker.vue) | Searchable Lucide icon grid popover for selecting and binding an icon name string value. |
| [ ] | **StatsFilterModal** | [StatsFilterModal.vue](file:///home/lantum/Desktop/Projects/webui/components/StatsFilterModal.vue) | Modal overlay for filtering statistics by date range, wallets, and categories. |
| [ ] | **NotificationBell** | [NotificationBell.vue](file:///home/lantum/Desktop/Projects/webui/components/NotificationBell.vue) | Bell icon + unread badge counter with dropdown notification list. Fetches from `notificationsApi` on open, supports mark-as-read and mark-all-read. |
| [ ] | **NotificationsContainer** | [NotificationsContainer.vue](file:///home/lantum/Desktop/Projects/webui/components/NotificationsContainer.vue) | Toast/banner notification display container and notification queue manager. |
| [ ] | **DescriptorRenderer** | [extensions/DescriptorRenderer.vue](file:///home/lantum/Desktop/Projects/webui/components/extensions/DescriptorRenderer.vue) | Polymorphic extension renderer mapping slot contribution descriptors to dynamic component trees. |
| [ ] | **auth/AuthCarousel** | [auth/AuthCarousel.vue](file:///home/lantum/Desktop/Projects/webui/components/auth/AuthCarousel.vue) | Auto-advancing image/text carousel for the auth page marketing panel. |
| [ ] | **auth/AuthSocialLogin** | [auth/AuthSocialLogin.vue](file:///home/lantum/Desktop/Projects/webui/components/auth/AuthSocialLogin.vue) | Renders OAuth provider buttons (Google etc.) for social login flows. |
| [ ] | **DailyBarChart** | [reports/charts/DailyBarChart.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/charts/DailyBarChart.vue) | Daily cashflow bar chart visualisation. |
| [ ] | **CumulativeNetArea** | [reports/charts/CumulativeNetArea.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/charts/CumulativeNetArea.vue) | Cumulative net worth area chart over time. |
| [ ] | **CashflowLineChart** | [reports/charts/CashflowLineChart.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/charts/CashflowLineChart.vue) | Income vs expense cashflow trend line chart. |
| [ ] | **CategoryDonut** | [reports/charts/CategoryDonut.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/charts/CategoryDonut.vue) | Donut/pie chart for category spending breakdown. |

---

## ▸ Layer 3: Domain / Feature Components

> Components tightly coupled to product entities, API services, and application data models. Carry business logic, data fetching, mutations, or domain-specific validation. These are the highest-level reusable components before full page assembly.

### 3.1 Transaction Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **TransactionForm** | [TransactionForm.vue](file:///home/lantum/Desktop/Projects/webui/components/TransactionForm.vue) | Full transaction entry form: amount, date, category, party, wallet, notes, recurrence. |
| [ ] | **TransactionFormContainer** | [TransactionFormContainer.vue](file:///home/lantum/Desktop/Projects/webui/components/TransactionFormContainer.vue) | State wrapper managing transaction form submit, validation, API mutation. |
| [ ] | **TransactionFormSection** | [TransactionFormSection.vue](file:///home/lantum/Desktop/Projects/webui/components/TransactionFormSection.vue) | Section sub-layout within the transaction form. |
| [ ] | **FormSection** | [FormSection.vue](file:///home/lantum/Desktop/Projects/webui/components/FormSection.vue) | Transaction type tab switcher (Expense / Income / Transfer) that mounts either `TransactionFormContainer` or `TransferFormContainer`. |
| [ ] | **TransferForm** | [TransferForm.vue](file:///home/lantum/Desktop/Projects/webui/components/TransferForm.vue) | Inter-wallet transfer entry form (from wallet, to wallet, amount, date). |
| [ ] | **TransferFormContainer** | [TransferFormContainer.vue](file:///home/lantum/Desktop/Projects/webui/components/TransferFormContainer.vue) | State wrapper managing transfer submit and API mutation. |
| [ ] | **TransactionsContentSection** | [transactions/TransactionsContentSection.vue](file:///home/lantum/Desktop/Projects/webui/components/transactions/TransactionsContentSection.vue) | Full transactions page layout orchestrating table/card view, filters, search, and pagination. |
| [ ] | **TransactionsSpreadsheet** | [transactions/TransactionsSpreadsheet.vue](file:///home/lantum/Desktop/Projects/webui/components/transactions/TransactionsSpreadsheet.vue) | Inline-editable spreadsheet view of transactions. |
| [ ] | **TTransactionsCardList** | [transactions/TTransactionsCardList.vue](file:///home/lantum/Desktop/Projects/webui/components/transactions/TTransactionsCardList.vue) | Mobile card list rendering of paginated transaction entries. |
| [ ] | **TransactionFilters** | [transactions/TransactionFilters.vue](file:///home/lantum/Desktop/Projects/webui/components/transactions/TransactionFilters.vue) | Slide-in filter panel: date range, type, category, wallet, party, amount range. |

### 3.2 Wallet Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **WalletCard** | [WalletCard.vue](file:///home/lantum/Desktop/Projects/webui/components/WalletCard.vue) | Wallet summary card with balance, currency, type, and actions. |
| [ ] | **WalletListCard** | [WalletListCard.vue](file:///home/lantum/Desktop/Projects/webui/components/WalletListCard.vue) | Compact horizontal wallet row for list views. |
| [ ] | **WalletForm** | [WalletForm.vue](file:///home/lantum/Desktop/Projects/webui/components/WalletForm.vue) | Wallet create/edit form: name, currency, type, opening balance, icon. |
| [ ] | **WalletDetailPanel** | [wallets/WalletDetailPanel.vue](file:///home/lantum/Desktop/Projects/webui/components/wallets/WalletDetailPanel.vue) | Slide-out or full detail panel for a single wallet with balance history. |
| [ ] | **WalletsStatsStrip** | [wallets/WalletsStatsStrip.vue](file:///home/lantum/Desktop/Projects/webui/components/wallets/WalletsStatsStrip.vue) | Horizontal summary strip of aggregate wallet stats (total balance, count, currencies). |

### 3.3 Budget Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **BudgetCard** | [budgets/BudgetCard.vue](file:///home/lantum/Desktop/Projects/webui/components/budgets/BudgetCard.vue) | Budget card with progress bar, status chip, period, category/wallet scope pills, and edit/delete. Links to budget detail page. |
| [ ] | **BudgetForm** | [budgets/BudgetForm.vue](file:///home/lantum/Desktop/Projects/webui/components/budgets/BudgetForm.vue) | Budget create/edit form: name, amount, period type, target categories/wallets. |

### 3.4 Category Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **CategoryForm** | [categories/CategoryForm.vue](file:///home/lantum/Desktop/Projects/webui/components/categories/CategoryForm.vue) | Category create/edit form: name, type (income/expense), icon, colour, parent group. |

### 3.5 Party Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **PartiesForm** | [PartiesForm.vue](file:///home/lantum/Desktop/Projects/webui/components/PartiesForm.vue) | Party create/edit form: name, email, phone, notes. |
| [ ] | **PartyCard** | [PartyCard.vue](file:///home/lantum/Desktop/Projects/webui/components/PartyCard.vue) | Party summary card with contact info and action buttons. |
| [ ] | **PartyCardList** | [PartyCardList.vue](file:///home/lantum/Desktop/Projects/webui/components/PartyCardList.vue) | Grid/list of `PartyCard` items. |
| [ ] | **PartyDetailPanel** | [parties/PartyDetailPanel.vue](file:///home/lantum/Desktop/Projects/webui/components/parties/PartyDetailPanel.vue) | Full party detail panel with transaction history and contact details. |
| [ ] | **PartiesStatsStrip** | [parties/PartiesStatsStrip.vue](file:///home/lantum/Desktop/Projects/webui/components/parties/PartiesStatsStrip.vue) | Aggregate party stats strip (total parties, top payees, top payers). |

### 3.6 Group, Holdings & Reminders Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **GroupForm** | [groups/GroupForm.vue](file:///home/lantum/Desktop/Projects/webui/components/groups/GroupForm.vue) | Group create/edit form. |
| [ ] | **HoldingForm** | [holdings/HoldingForm.vue](file:///home/lantum/Desktop/Projects/webui/components/holdings/HoldingForm.vue) | Investment holding create/edit form. |
| [ ] | **ReminderForm** | [reminders/ReminderForm.vue](file:///home/lantum/Desktop/Projects/webui/components/reminders/ReminderForm.vue) | Reminder create/edit form: title, due date, frequency, linked transaction. |
| [ ] | **RecurringModal** | [modals/RecurringModal.vue](file:///home/lantum/Desktop/Projects/webui/components/modals/RecurringModal.vue) | Modal for managing transaction recurrence rules (frequency, end date). |
| [ ] | **LearningModal** | [modals/LearningModal.vue](file:///home/lantum/Desktop/Projects/webui/components/modals/LearningModal.vue) | Educational contextual modal explaining financial concepts in-app. |

### 3.7 Imports Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **ImportUpload** | [imports/ImportUpload.vue](file:///home/lantum/Desktop/Projects/webui/components/imports/ImportUpload.vue) | Hero upload section with animated document type carousel, drag-and-drop zone, and file type selector. |
| [ ] | **ImportAnalyzing** | [imports/ImportAnalyzing.vue](file:///home/lantum/Desktop/Projects/webui/components/imports/ImportAnalyzing.vue) | AI analysis in-progress state with streaming progress indicators. |
| [ ] | **ImportConfirmDialog** | [imports/ImportConfirmDialog.vue](file:///home/lantum/Desktop/Projects/webui/components/imports/ImportConfirmDialog.vue) | Confirmation step before committing parsed import data. |
| [ ] | **ImportSessionsList** | [imports/ImportSessionsList.vue](file:///home/lantum/Desktop/Projects/webui/components/imports/ImportSessionsList.vue) | List of past import sessions with status badges and re-open actions. |
| [ ] | **SuggestionReviewTable** | [imports/SuggestionReviewTable.vue](file:///home/lantum/Desktop/Projects/webui/components/imports/SuggestionReviewTable.vue) | Editable review table of AI-parsed transaction suggestions before acceptance. |

### 3.8 Dashboard Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **DashboardKPIs** | [dashboard/DashboardKPIs.vue](file:///home/lantum/Desktop/Projects/webui/components/dashboard/DashboardKPIs.vue) | Row of KPI metric cards (total income, expenses, net, savings rate). |
| [ ] | **RecentTransactions** | [dashboard/RecentTransactions.vue](file:///home/lantum/Desktop/Projects/webui/components/dashboard/RecentTransactions.vue) | Latest transactions widget with mini list and "view all" link. |
| [ ] | **CategoryBreakdown** | [dashboard/CategoryBreakdown.vue](file:///home/lantum/Desktop/Projects/webui/components/dashboard/CategoryBreakdown.vue) | Donut chart + ranked list showing spending by category for the period. |
| [ ] | **QuickInsights** | [dashboard/QuickInsights.vue](file:///home/lantum/Desktop/Projects/webui/components/dashboard/QuickInsights.vue) | AI-generated summary insight cards for the current period. |
| [ ] | **DashboardWalletSelector** | [dashboard/DashboardWalletSelector.vue](file:///home/lantum/Desktop/Projects/webui/components/dashboard/DashboardWalletSelector.vue) | Wallet filter chip strip for scoping dashboard data to specific wallets. |
| [ ] | **DashboardQuickActionModal** | [dashboard/DashboardQuickActionModal.vue](file:///home/lantum/Desktop/Projects/webui/components/dashboard/DashboardQuickActionModal.vue) | Quick-action floating modal for add transaction / transfer shortcut. |
| [ ] | **DashboardAgentHero** | [dashboard/DashboardAgentHero.vue](file:///home/lantum/Desktop/Projects/webui/components/dashboard/DashboardAgentHero.vue) | AI agent hero card with greeting, financial snapshot, and launch assistant CTA. |

### 3.9 Reports Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **CashflowHero** | [reports/CashflowHero.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/CashflowHero.vue) | Period income/expense/net hero summary with trend comparison. |
| [ ] | **MonthInReview** | [reports/MonthInReview.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/MonthInReview.vue) | Monthly recap modal/panel with AI highlights, top categories, and cashflow summary. |
| [ ] | **CategoryRanking** | [reports/CategoryRanking.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/CategoryRanking.vue) | Ranked bar list of categories by spend amount. |
| [ ] | **CategoryDrillModal** | [reports/CategoryDrillModal.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/CategoryDrillModal.vue) | Drill-down modal for a single category's transactions and trend. |
| [ ] | **FinancialRatios** | [reports/FinancialRatios.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/FinancialRatios.vue) | Computed ratio cards (savings rate, expense ratio, etc.). |
| [ ] | **NotableStrip** | [reports/NotableStrip.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/NotableStrip.vue) | Horizontal strip of notable outlier transactions for the period. |
| [ ] | **CalendarHeatmap** | [reports/CalendarHeatmap.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/CalendarHeatmap.vue) | GitHub-style calendar heatmap of daily spending intensity. |
| [ ] | **SankeyFlow** | [reports/SankeyFlow.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/SankeyFlow.vue) | Sankey flow diagram of income sources → expense categories. |
| [ ] | **ReportsEmpty** | [reports/ReportsEmpty.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/ReportsEmpty.vue) | Reports-specific empty state with onboarding prompt. |
| [ ] | **CategoriesTab** | [reports/CategoriesTab.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/CategoriesTab.vue) | Reports tab: category breakdown donut + ranking table. |
| [ ] | **ChartsTab** | [reports/ChartsTab.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/ChartsTab.vue) | Reports tab: cashflow line chart + cumulative area chart. |
| [ ] | **CalendarTab** | [reports/CalendarTab.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/CalendarTab.vue) | Reports tab: calendar heatmap + period totals. |
| [ ] | **FlowTab** | [reports/FlowTab.vue](file:///home/lantum/Desktop/Projects/webui/components/reports/FlowTab.vue) | Reports tab: Sankey flow diagram view. |

### 3.10 Settings Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **SettingsAccount** | [settings/SettingsAccount.vue](file:///home/lantum/Desktop/Projects/webui/components/settings/SettingsAccount.vue) | User profile edit section: first/last name, username, email, password change trigger. |
| [ ] | **SettingsDisplay** | [settings/SettingsDisplay.vue](file:///home/lantum/Desktop/Projects/webui/components/settings/SettingsDisplay.vue) | Display preferences: theme, language, currency, date format. |
| [ ] | **SettingsGeneral** | [settings/SettingsGeneral.vue](file:///home/lantum/Desktop/Projects/webui/components/settings/SettingsGeneral.vue) | General application configuration settings panel. |
| [ ] | **SettingsNotifications** | [settings/SettingsNotifications.vue](file:///home/lantum/Desktop/Projects/webui/components/settings/SettingsNotifications.vue) | Notification preferences toggle panel (email, push, reminders). |
| [ ] | **SettingsWallets** | [settings/SettingsWallets.vue](file:///home/lantum/Desktop/Projects/webui/components/settings/SettingsWallets.vue) | Wallet management section within settings. |
| [ ] | **SettingsConnections** | [settings/SettingsConnections.vue](file:///home/lantum/Desktop/Projects/webui/components/settings/SettingsConnections.vue) | Third-party integrations and connected services management. |
| [ ] | **PasswordModal** | [settings/PasswordModal.vue](file:///home/lantum/Desktop/Projects/webui/components/settings/PasswordModal.vue) | Modal for secure password change with current/new/confirm fields. |

### 3.11 AI / Chat Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **ChatExperience** | [ai/ChatExperience.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/ChatExperience.vue) | Full AI chat experience shell composing sidebar, message list, composer, and canvas panel. |
| [ ] | **ChatComposer** | [ai/ChatComposer.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/ChatComposer.vue) | Message input bar with attach, send, and slash-command detection. |
| [ ] | **ChatMessageList** | [ai/ChatMessageList.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/ChatMessageList.vue) | Scrollable message thread with user/assistant message rendering. |
| [ ] | **ChatSidebar** | [ai/ChatSidebar.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/ChatSidebar.vue) | Conversation history sidebar with new chat, session list, and rename/delete. |
| [ ] | **ChatResultRenderer** | [ai/ChatResultRenderer.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/ChatResultRenderer.vue) | Routes AI result payloads to the appropriate block renderer component. |
| [ ] | **CanvasPanel** | [ai/CanvasPanel.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/CanvasPanel.vue) | Expandable side canvas panel for AI-generated chart/table artifacts. |
| [ ] | **ChatLandingInsights** | [ai/ChatLandingInsights.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/ChatLandingInsights.vue) | Landing state insight prompt cards shown before first message. |
| [ ] | **ChatEmptyState** | [ai/ChatEmptyState.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/ChatEmptyState.vue) | Empty chat session landing with suggested prompts. |
| [ ] | **ChatProgressSteps** | [ai/ChatProgressSteps.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/ChatProgressSteps.vue) | Animated multi-step progress indicator for long-running AI operations. |
| [ ] | **DiscussionDropdown** | [ai/DiscussionDropdown.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/DiscussionDropdown.vue) | Conversation session selection and management dropdown. |
| [ ] | **ChatMarkdownBlock** | [ai/blocks/ChatMarkdownBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatMarkdownBlock.vue) | Renders AI markdown response safely via `useMarkdown`. |
| [ ] | **ChatChartBlock** | [ai/blocks/ChatChartBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatChartBlock.vue) | Renders AI-generated chart data inline in chat. |
| [ ] | **ChatTableBlock** | [ai/blocks/ChatTableBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatTableBlock.vue) | Renders tabular AI result data inline in chat. |
| [ ] | **ChatKpiBlock** | [ai/blocks/ChatKpiBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatKpiBlock.vue) | Renders KPI metrics returned by AI inline in chat. |
| [ ] | **ChatListBlock** | [ai/blocks/ChatListBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatListBlock.vue) | Renders AI list responses inline in chat. |
| [ ] | **ChatTimelineBlock** | [ai/blocks/ChatTimelineBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatTimelineBlock.vue) | Renders timeline/event-sequence AI results inline. |
| [ ] | **ChatComparisonBlock** | [ai/blocks/ChatComparisonBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatComparisonBlock.vue) | Side-by-side comparison result block from AI. |
| [ ] | **ChatCalloutBlock** | [ai/blocks/ChatCalloutBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatCalloutBlock.vue) | Styled callout/alert block from AI (tip, warning, info). |
| [ ] | **ChatProgressBlock** | [ai/blocks/ChatProgressBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatProgressBlock.vue) | Progress steps block shown as part of AI structured response. |
| [ ] | **ChatQuestionBlock** | [ai/blocks/ChatQuestionBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatQuestionBlock.vue) | AI clarification question block with interactive answer options. |
| [ ] | **ChatProposedActionBlock** | [ai/blocks/ChatProposedActionBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatProposedActionBlock.vue) | AI-proposed action with accept/reject confirmation UI. |
| [ ] | **ChatQuickActionsBlock** | [ai/blocks/ChatQuickActionsBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatQuickActionsBlock.vue) | Pill-style quick action suggestion chips from AI. |
| [ ] | **ChatImportReviewBlock** | [ai/blocks/ChatImportReviewBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatImportReviewBlock.vue) | AI import review result rendered inline with accept/edit flow. |
| [ ] | **ChatCanvasBlock** | [ai/blocks/ChatCanvasBlock.vue](file:///home/lantum/Desktop/Projects/webui/components/ai/blocks/ChatCanvasBlock.vue) | Triggers canvas panel with AI-generated visual artifact payload. |

### 3.12 Onboarding, Auth & Admin Domain
| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **OnboardingWizard** | [onboarding/OnboardingWizard.vue](file:///home/lantum/Desktop/Projects/webui/components/onboarding/OnboardingWizard.vue) | Animated horizontal step carousel for new user setup flow. |
| [ ] | **OnboardingEmptyState** | [onboarding/OnboardingEmptyState.vue](file:///home/lantum/Desktop/Projects/webui/components/onboarding/OnboardingEmptyState.vue) | Empty state with onboarding prompt for first-time users. |
| [ ] | **DashboardOnboarding** | [onboarding/DashboardOnboarding.vue](file:///home/lantum/Desktop/Projects/webui/components/onboarding/DashboardOnboarding.vue) | Dashboard-embedded onboarding task checklist. |
| [ ] | **LoginCard** | [LoginCard.vue](file:///home/lantum/Desktop/Projects/webui/components/LoginCard.vue) | Login form card: email, password, social login section, forgot password. |
| [ ] | **RegisterCard** | [RegisterCard.vue](file:///home/lantum/Desktop/Projects/webui/components/RegisterCard.vue) | Registration form card: name, email, password, confirm password. |
| [ ] | **FinancialPositionView** | [financial-position/FinancialPositionView.vue](file:///home/lantum/Desktop/Projects/webui/components/financial-position/FinancialPositionView.vue) | Net worth / financial position summary with asset and liability breakdown. |
| [ ] | **FinancialPositionDrill** | [financial-position/FinancialPositionDrill.vue](file:///home/lantum/Desktop/Projects/webui/components/financial-position/FinancialPositionDrill.vue) | Drill-down panel into a specific financial position category. |
| [ ] | **UserDetail** | [admin/UserDetail.vue](file:///home/lantum/Desktop/Projects/webui/components/admin/UserDetail.vue) | Admin panel user profile viewer and account management actions. |
| [ ] | **OutreachComposer** | [admin/OutreachComposer.vue](file:///home/lantum/Desktop/Projects/webui/components/admin/OutreachComposer.vue) | Admin tool for composing and sending user outreach messages. |
| [ ] | **TipsSection** | [TipsSection.vue](file:///home/lantum/Desktop/Projects/webui/components/TipsSection.vue) | Contextual in-app tips and hints panel. |


---

## ▸ Layer 4: Layouts, Navigation & Pages

> **Macro-level application structure**: This layer encompasses both the structural scaffolding (layouts, navigation chrome) and the routed page views themselves. It defines how the entire application is organized and accessed.
>
> - **4.A–4.C**: Layout shells and navigation components
> - **4.D–4.Z**: Routed page views and their orchestration

---

### 4.A Navigation Components

> Navigation chrome components used within layout shells. These are **composite components** (Layer 2 conceptually) but are documented here due to their structural role in the application frame.

| Status | Component | File | Description |
| :---: | :--- | :--- | :--- |
| [ ] | **TNavbar** | [TNavbar.vue](file:///home/lantum/Desktop/Projects/webui/components/TNavbar.vue) | Top navigation bar (52px fixed). Contains: hamburger menu (mobile), add transaction button, language selector, theme selector, notification bell, info/learning button, and user avatar with dropdown. Responsive to mobile/tablet/desktop breakpoints. |
| [ ] | **TSidebar** | [TSidebar.vue](file:///home/lantum/Desktop/Projects/webui/components/TSidebar.vue) | Main application sidebar navigation. Features: collapsible rail mode (desktop), mobile drawer with overlay, hierarchical nav items with sub-menus, extension slots, active route highlighting, branded logo header. Width: 300px expanded / 80px rail / 280px mobile. |

---

### 4.B Layout Shells

> Framework-level layout components that wrap page content and define structural regions (header, sidebar, main content area, footer).

| Status | Layout | File | Purpose & Structure |
| :---: | :--- | :--- | :--- |
| [ ] | **default** | [layouts/default.vue](file:///home/lantum/Desktop/Projects/webui/layouts/default.vue) | Minimal pass-through layout. Pure slot rendering with no chrome. Used for landing pages or custom full-viewport experiences. |
| [ ] | **dashboard** | [layouts/dashboard.vue](file:///home/lantum/Desktop/Projects/webui/layouts/dashboard.vue) | Main authenticated application shell. Structure: `TSidebar` (left, responsive collapse) + `TNavbar` (top fixed) + main content area (with rounded card container) + `NotificationsContainer` + `LearningModal`. Viewport: 100vh with scroll-within-content-area pattern. Provides `learningModal` context injection for child components. |
| [ ] | **auth** | [layouts/auth.vue](file:///home/lantum/Desktop/Projects/webui/layouts/auth.vue) | Authentication pages layout (login, register). Structure: full-viewport split-screen → marketing carousel (left, desktop only) + form slot (right, centered). Includes floating theme toggle button (top-right) and copyright footer. Background: decorative floating documents SVG with dark mode inversion. |
| [ ] | **onboarding** | [layouts/onboarding.vue](file:///home/lantum/Desktop/Projects/webui/layouts/onboarding.vue) | First-time user setup wizard layout. Structure: centered card with radial gradient brand background, logo header, theme toggle (top-right), and wizard slot. Max-width: 800px. Responsive padding adjustments for mobile. |
| [ ] | **admin** | [layouts/admin.vue](file:///home/lantum/Desktop/Projects/webui/layouts/admin.vue) | Administrative panel layout. Minimal shell: slot + `NotificationsContainer`. Background: `$bg-gray`. No sidebar or navbar; admin pages control their own structure. User authentication check on mount. |

---

### 4.C Layout Architecture & Behavior

```
┌─────────────────────────────────────────────────────────────────────┐
│ Application Layout Hierarchy                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │ dashboard.vue (main app shell)                            │     │
│  │ ┌───────────┬───────────────────────────────────────────┐ │     │
│  │ │ TSidebar  │ TNavbar (fixed top, 52px)                 │ │     │
│  │ │ (300/80px)│───────────────────────────────────────────│ │     │
│  │ │           │ Main Content Area (rounded card)          │ │     │
│  │ │  Primary  │ ┌─────────────────────────────────────┐   │ │     │
│  │ │  Nav      │ │  <NuxtPage /> (route slot)          │   │ │     │
│  │ │           │ │  - Dashboard pages                  │   │ │     │
│  │ │  - Home   │ │  - Transactions                     │   │ │     │
│  │ │  - Txns   │ │  - Wallets                          │   │ │     │
│  │ │  - Wallet │ │  - Budgets                          │   │ │     │
│  │ │  - Budget │ │  - Reports                          │   │ │     │
│  │ │  - Report │ │  - Settings                         │   │ │     │
│  │ │  - AI     │ └─────────────────────────────────────┘   │ │     │
│  │ │           │ NotificationsContainer (toast/banner)     │ │     │
│  │ │  Footer   │ LearningModal (contextual help)           │ │     │
│  │ │  - Prefs  │                                           │ │     │
│  │ │  - Help   │                                           │ │     │
│  │ └───────────┴───────────────────────────────────────────┘ │     │
│  └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │ auth.vue (authentication shell)                           │     │
│  │ ┌─────────────────────┬─────────────────────────────────┐ │     │
│  │ │ AuthCarousel        │ Form Slot                       │ │     │
│  │ │ (marketing content, │ ┌─────────────────────────────┐ │ │     │
│  │ │  desktop only)      │ │  LoginCard / RegisterCard   │ │ │     │
│  │ │                     │ │  - Social login buttons     │ │ │     │
│  │ │  - Hero images      │ │  - Email/password fields    │ │ │     │
│  │ │  - Feature bullets  │ │  - Auth footer links        │ │ │     │
│  │ │  - Auto-rotating    │ └─────────────────────────────┘ │ │     │
│  │ └─────────────────────┴─────────────────────────────────┘ │     │
│  │ ThemeToggleButton (top-right)                             │     │
│  │ Copyright footer                                          │     │
│  └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │ onboarding.vue (first-time setup)                         │     │
│  │         ThemeToggleButton (top-right)                     │     │
│  │ ┌─────────────────────────────────────────────────────┐   │     │
│  │ │            Logo (centered)                          │   │     │
│  │ │ ┌─────────────────────────────────────────────────┐ │   │     │
│  │ │ │  OnboardingWizard (slot)                        │ │   │     │
│  │ │ │  - Step 1: Welcome                              │ │   │     │
│  │ │ │  - Step 2: Create first wallet                  │ │   │     │
│  │ │ │  - Step 3: Set up categories                    │ │   │     │
│  │ │ │  - Step 4: Complete                             │ │   │     │
│  │ │ └─────────────────────────────────────────────────┘ │   │     │
│  │ └─────────────────────────────────────────────────────┘   │     │
│  │         (radial gradient brand background)                │     │
│  └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │ admin.vue (administrative panel)                          │     │
│  │ ┌─────────────────────────────────────────────────────┐   │     │
│  │ │  Admin pages control their own structure            │   │     │
│  │ │  (no enforced navigation chrome)                    │   │     │
│  │ │  - User management                                  │   │     │
│  │ │  - System analytics                                 │   │     │
│  │ │  - Outreach composer                                │   │     │
│  │ └─────────────────────────────────────────────────────┘   │     │
│  │ NotificationsContainer                                    │     │
│  └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐     │
│  │ default.vue (pass-through)                                │     │
│  │ ┌─────────────────────────────────────────────────────┐   │     │
│  │ │  <slot /> (pure pass-through, no chrome)            │   │     │
│  │ └─────────────────────────────────────────────────────┘   │     │
│  └───────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 4.D Key Layout Characteristics

#### **Responsive Breakpoints Usage**
All layouts respect the global breakpoint scale:
- `$breakpoint-sm` (640px) — Mobile phone landscape
- `$breakpoint-md` (768px) — Tablet portrait (sidebar collapses to mobile drawer)
- `$breakpoint-lg` (1024px) — Desktop (auth carousel visible)
- `$breakpoint-xl` (1280px) — Wide desktop
- `$breakpoint-2xl` (1536px) — Ultra-wide

#### **Sidebar Behavior (dashboard layout)**
- **Desktop (≥768px)**: Persistent sidebar, toggles between 300px expanded ↔ 80px rail
- **Mobile (<768px)**: Drawer overlay mode, hidden by default, hamburger menu trigger in navbar
- State managed via `useSidebar()` composable with localStorage persistence

#### **Content Scroll Patterns**
- **dashboard**: Fixed navbar + sidebar, scroll contained within `.dashboard-content` card
- **auth**: Full-page scroll (marketing content may exceed viewport)
- **onboarding**: Centered card, scroll within wizard steps if needed
- **admin**: Full-page scroll, no viewport constraints
- **default**: No enforced scroll structure

#### **Theme & Dark Mode Support**
All layouts support seamless theme switching via:
- Global CSS custom property updates (`--color-*` tokens)
- `useTheme()` composable state management
- `ThemeToggleButton` or `ThemeSelector` widget placement
- Dark mode adjustments for background SVGs and overlays (e.g., auth layout inverts decorative elements)

#### **Global Context Providers**
- **dashboard.vue** provides `learningModal` injection for triggering contextual help modals
- All layouts (except default) fetch and verify user authentication on mount
- **dashboard** and **admin** render `NotificationsContainer` for toast/banner notifications

---

### 4.E Migration Notes for Layouts

When modernizing layouts:

1. **Slot API Standardization**: Ensure all layouts expose documented, named slots for extensibility (header, sidebar-footer, content-actions, etc.)
2. **Layout Transition Animations**: Implement view transitions API support for smoother route changes within layouts
3. **Accessibility Landmarks**: Add ARIA `role` attributes (`banner`, `navigation`, `main`, `complementary`, `contentinfo`) to layout regions
4. **Responsive Container Queries**: Migrate from viewport-based media queries to container queries for sidebar/content areas where appropriate
5. **Skeleton UI States**: Add built-in loading skeletons at layout level for initial page hydration
6. **Persistent Layout State**: Ensure sidebar collapse state, theme, and language preferences sync across tabs via `localStorage` + `BroadcastChannel`

---

### 4.F Pages & Routes (View Entrypoints)

> Top-level routed views combining layouts, domain components, and page-level state management. These are the user-facing screens accessed via URLs.

---

#### 4.F.1 Public & Landing Routes

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/` | [index.vue](file:///home/lantum/Desktop/Projects/webui/pages/index.vue) | default | none | **Landing redirect**: Authenticated users → resolved landing path (home/dashboard); unauthenticated → `/login`. Shows loading spinner with logo during redirect. |
| [ ] | `/login` | [login.vue](file:///home/lantum/Desktop/Projects/webui/pages/login.vue) | auth | guest | **Login page**: Email/password form, social OAuth buttons (Google etc.), remember me checkbox, forgot password link, redirect to register. Form validation, loading states, error handling. |
| [ ] | `/register` | [register.vue](file:///home/lantum/Desktop/Projects/webui/pages/register.vue) | auth | guest | **Registration page**: Contact, first name, last name, password fields. Email verification code input. Social OAuth option. Password strength validation. Success redirects to onboarding. |
| [ ] | `/auth/[driver]/callback` | [auth/[driver]/callback.vue](file:///home/lantum/Desktop/Projects/webui/pages/auth/[driver]/callback.vue) | default | none | **OAuth callback handler**: Processes OAuth provider callback (Google, etc.). Exchanges code for tokens, creates session, redirects to dashboard or shows error. |

---

#### 4.F.B Onboarding Flow

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/onboarding` | [onboarding.vue](file:///home/lantum/Desktop/Projects/webui/pages/onboarding.vue) | onboarding | auth | **Onboarding wizard**: Multi-step setup flow (language, currency, first wallet, categories). Progress bar indicator. Step validation. Completion redirects to dashboard. Skippable for quick start. |

---

#### 4.F.C Dashboard & Home

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/home` | [home.vue](file:///home/lantum/Desktop/Projects/webui/pages/home.vue) | dashboard | auth | **AI-first landing page**: Full-viewport `ChatExperience` in landing mode. Personalized greeting, financial snapshot, suggested prompts. Alternative entry point to `/dashboard`. |
| [ ] | `/dashboard` | [dashboard/index.vue](file:///home/lantum/Desktop/Projects/webui/pages/dashboard/index.vue) | dashboard | auth | **Main dashboard**: `DashboardAgentHero`, conditional onboarding wizard, `TDashboardTopCard` with filters, `DashboardKPIs`, `CategoryBreakdown`, `RecentTransactions`, `QuickInsights`. Empty state for first-time users. Data refresh on mount. |

---

#### 4.F.D Transaction Management

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/transactions` | [transactions/index.vue](file:///home/lantum/Desktop/Projects/webui/pages/transactions/index.vue) | dashboard | auth | **Transactions list page**: Renders `TransactionsContentSection` orchestrating table/card view toggle, filters panel, search, pagination, bulk actions. View mode persistence. |
| [ ] | `/transactions/new` | [transactions/new.vue](file:///home/lantum/Desktop/Projects/webui/pages/transactions/new.vue) | dashboard | auth | **Create transaction page**: Full-page `TransactionFormSection` with type tabs (Expense/Income/Transfer). Form submission handler with API error handling. Success redirects to `/transactions`. |
| [ ] | `/transactions/edit/[id]` | [transactions/edit/[id].vue](file:///home/lantum/Desktop/Projects/webui/pages/transactions/edit/[id].vue) | dashboard | auth | **Edit transaction page**: Fetches existing transaction by ID, pre-populates `TransactionFormSection`. Update handler. Delete action. Cancel returns to `/transactions`. |

---

#### 4.F.E Wallet Management

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/wallets` | [wallets.vue](file:///home/lantum/Desktop/Projects/webui/pages/wallets.vue) | dashboard | auth | **Wallets page**: `ContentTopCard` with add button, `WalletsStatsStrip` aggregate metrics, inline `WalletForm` (create/edit), `ContentListView` with table/card toggle. Empty state onboarding. Sidebar tips section. |

---

#### 4.F.F Budget Management

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/budgets` | [budgets/index.vue](file:///home/lantum/Desktop/Projects/webui/pages/budgets/index.vue) | dashboard | auth | **Budgets list page**: `ContentTopCard` with add button, inline `BudgetForm` with educational sidebar ("How budgets work"), grid of `BudgetCard` components showing progress bars, status chips, period labels. Empty state. |
| [ ] | `/budgets/[id]` | [budgets/[id].vue](file:///home/lantum/Desktop/Projects/webui/pages/budgets/[id].vue) | dashboard | auth | **Budget detail page**: Back navigation to `/budgets`, budget summary card with status, progress bar, period, target scope pills. Transaction breakdown table filtered by budget criteria. Sparkline trends. Edit/delete actions. |

---

#### 4.F.G Category & Group Management

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/categories` | [categories/index.vue](file:///home/lantum/Desktop/Projects/webui/pages/categories/index.vue) | dashboard | auth | **Categories page**: `ContentTopCard`, inline `CategoryForm` (name, type, icon, color, parent group), `ContentListView` with income/expense filtering. Grouped display by parent. Empty state. Tips sidebar. |
| [ ] | `/groups` | [groups.vue](file:///home/lantum/Desktop/Projects/webui/pages/groups.vue) | dashboard | auth | **Groups page**: `ContentTopCard`, inline `GroupForm`, `ContentListView` for category groups. Hierarchical category organization. Empty state. Tips sidebar. |

---

#### 4.F.H Party Management

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/parties` | [parties.vue](file:///home/lantum/Desktop/Projects/webui/pages/parties.vue) | dashboard | auth | **Parties page** (payees/payers): `ContentTopCard`, `PartiesStatsStrip` (top payees/payers), inline `PartiesForm` (name, email, phone, notes), `ContentListView` with search. Transaction history per party. Empty state. Tips sidebar. |

---

#### 4.F.I Reports & Analytics

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/reports` | [reports.vue](file:///home/lantum/Desktop/Projects/webui/pages/reports.vue) | dashboard | auth | **Reports & analytics hub**: `ReportsTabs` (Charts, Categories, Calendar, Flow), `PeriodControl` with preset/custom ranges + compare toggle + month review. Tab content: `ChartsTab` (cashflow line + cumulative area), `CategoriesTab` (donut + ranking), `CalendarTab` (heatmap), `FlowTab` (Sankey). Currency conversion warnings. Transaction sweep truncation notices. |

---

#### 4.F.J Holdings & Investments

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/holdings` | [holdings/index.vue](file:///home/lantum/Desktop/Projects/webui/pages/holdings/index.vue) | dashboard | auth | **Holdings page** (assets: crypto, stocks, property): Header with refresh prices button, total value summary in brand surface card, holdings list with icons, quantities, current values. Inline `HoldingForm`. Price refresh API calls. Empty state. |

---

#### 4.F.K Financial Position

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/financial-position` | [financial-position/index.vue](file:///home/lantum/Desktop/Projects/webui/pages/financial-position/index.vue) | dashboard | auth | **Net worth / financial position page**: Renders `FinancialPositionView` showing assets vs liabilities breakdown, net worth calculation, trend over time, drill-down modals per category. |

---

#### 4.F.L Reminders

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/reminders` | [reminders.vue](file:///home/lantum/Desktop/Projects/webui/pages/reminders.vue) | dashboard | auth | **Reminders page**: `ContentTopCard`, inline `ReminderForm` (title, due date, frequency, linked transaction), list of upcoming/past reminders with status badges, snooze/complete actions. Empty state. |

---

#### 4.F.M Notifications

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/notifications` | [notifications.vue](file:///home/lantum/Desktop/Projects/webui/pages/notifications.vue) | dashboard | auth | **Notifications center**: Page header with bell icon and "mark all read" action. Chronological notification list (unread bold, read muted). Notification type icons, timestamps, action buttons. Empty state. Pagination. |

---

#### 4.F.N Imports

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/imports` | [imports.vue](file:///home/lantum/Desktop/Projects/webui/pages/imports.vue) | dashboard | auth | **Import & document parsing page**: `ImportUpload` (drag-and-drop zone, file type carousel), `ImportAnalyzing` progress state, `SuggestionReviewTable` for AI-parsed transactions, `ImportConfirmDialog` before commit. Past `ImportSessionsList`. Status polling during analysis. Error handling. |

---

#### 4.F.O AI Assistant

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/assistant` | [assistant.vue](file:///home/lantum/Desktop/Projects/webui/pages/assistant.vue) | dashboard | auth | **AI financial assistant page**: Full-page `ChatExperience` in full mode. Conversation history sidebar, message composer, result renderer with block types (markdown, chart, table, KPI, timeline). Canvas panel for artifacts. Streaming responses. |

---

#### 4.F.P Settings

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/settings` | [settings.vue](file:///home/lantum/Desktop/Projects/webui/pages/settings.vue) | dashboard | auth | **Settings page**: Tabbed interface (`TTabs`) with sections: Account (`SettingsAccount` - profile, password), General (`SettingsGeneral` - app config), Wallets (`SettingsWallets`), Display (`SettingsDisplay` - theme, language, currency), Notifications (`SettingsNotifications`), Integrations (`ExtensionSlot` for plugins), Connections (`SettingsConnections` - third-party services). Modal for password change. |

---

#### 4.F.Q Admin Panel

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/admin` | [admin/index.vue](file:///home/lantum/Desktop/Projects/webui/pages/admin/index.vue) | admin | auth (admin role) | **Admin console**: Sidebar rail navigation with sections (Users, Analytics, Outreach, System). User management table (`UserDetail` drill-down), system health metrics, `OutreachComposer` for bulk messaging. Admin badge. Exit button to return to main app. |

---

#### 4.F.R Development & Testing

| Status | Route | File | Layout | Middleware | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| [ ] | `/test-kit` | [test-kit.vue](file:///home/lantum/Desktop/Projects/webui/pages/test-kit.vue) | dashboard (likely) | none (dev only) | **Component testing playground**: Isolated environment for testing UI components, design tokens, and interactions. Development-only route, should not be accessible in production. |

---

#### 4.F.S Route Architecture Summary

```
Application Route Tree (Nuxt file-based routing)
├─ / (index.vue)
│  └─ Landing redirect logic
│
├─ Authentication (auth layout, guest middleware)
│  ├─ /login
│  ├─ /register
│  └─ /auth/[driver]/callback (OAuth)
│
├─ Onboarding (onboarding layout, auth middleware)
│  └─ /onboarding
│
├─ Main Application (dashboard layout, auth middleware)
│  ├─ Dashboard & Overview
│  │  ├─ /home (AI-first landing)
│  │  └─ /dashboard (traditional dashboard)
│  │
│  ├─ Core Financial Operations
│  │  ├─ /transactions
│  │  │  ├─ /transactions/new
│  │  │  └─ /transactions/edit/[id]
│  │  ├─ /wallets
│  │  ├─ /budgets
│  │  │  └─ /budgets/[id]
│  │  └─ /categories
│  │
│  ├─ Supporting Entities
│  │  ├─ /parties
│  │  ├─ /groups
│  │  ├─ /reminders
│  │  └─ /holdings
│  │
│  ├─ Reporting & Analysis
│  │  ├─ /reports
│  │  └─ /financial-position
│  │
│  ├─ Data & AI
│  │  ├─ /imports
│  │  └─ /assistant
│  │
│  └─ System
│     ├─ /notifications
│     └─ /settings
│
├─ Administration (admin layout, admin middleware)
│  └─ /admin
│
└─ Development
   └─ /test-kit (dev only)
```

---

#### 4.F.T Middleware & Meta Conventions

All pages use `definePageMeta()` to declare:

| Meta Property | Values | Purpose |
| :--- | :--- | :--- |
| `layout` | `default`, `auth`, `onboarding`, `dashboard`, `admin` | Specifies which layout shell wraps the page |
| `middleware` | `auth`, `guest`, `admin` | Route guards: `auth` requires authentication, `guest` redirects authenticated users, `admin` requires admin role |

**Common patterns:**
- Authenticated pages: `definePageMeta({ layout: 'dashboard', middleware: 'auth' })`
- Public pages: `definePageMeta({ layout: 'auth', middleware: 'guest' })`
- Admin pages: `definePageMeta({ layout: 'admin', middleware: ['auth', 'admin'] })`

---

#### 4.F.U Page-Level State Management Patterns

Most pages follow a consistent state orchestration pattern:

1. **Data Fetching**: `onMounted()` or `watchEffect()` triggers API calls via composables (`useTransactions`, `useWallets`, `useBudgets`, etc.)
2. **Loading States**: Boolean flags (`isLoading`, `isSubmitting`) control skeleton rendering via `ComponentLoader` or inline spinners
3. **Error Handling**: API errors captured in `error` refs, displayed as alert banners or inline error messages
4. **Form Management**: Inline form toggle (`showForm` ref), edit vs create mode discrimination (`editingItem` ref), validation state
5. **CRUD Orchestration**: Create/update/delete handlers call API services, update local state, trigger shared data refresh, show notifications
6. **Empty States**: Conditional rendering of `OnboardingEmptyState` or `EmptyState` when no data exists
7. **Responsive Behavior**: Viewport detection (`useViewport()`, `isTabletOrBelow`) adjusts layout (hide tips sidebar, switch to card view, collapse forms)

---

#### 4.F.V Migration Notes for Layer 5

When modernizing pages:

1. **Data Fetching Standardization**: Migrate to Nuxt 3 `useFetch` / `useAsyncData` with built-in SSR hydration and automatic error/pending states
2. **Route Transitions**: Implement View Transitions API for smoother page navigation (especially in dashboard shell)
3. **Page-Level Loading Skeletons**: Replace boolean loading flags with structured skeleton states matching page content layout
4. **Breadcrumb Navigation**: Add consistent breadcrumb trails to detail pages (budget detail, transaction edit, etc.)
5. **Deep Link Support**: Ensure all pages support direct URL access with proper state restoration (filter params, search queries, view modes)
6. **Meta Tags & SEO**: Add page-specific `<title>`, `<meta description>`, and Open Graph tags via `useHead()` composable
7. **Keyboard Shortcuts**: Implement consistent keyboard navigation (e.g., `Cmd+K` for command palette, `N` for new transaction)
8. **Optimistic UI Updates**: Add optimistic mutations for create/update/delete actions to improve perceived performance
9. **Infinite Scroll / Virtual Lists**: For large datasets (transactions, notifications), replace pagination with virtual scrolling
10. **Progressive Enhancement**: Ensure core functionality works without JavaScript (form submissions, navigation) before hydration



---
---

## 📊 Complete Architecture Summary

### Component Inventory by Layer

| Layer | Category | Count | Description |
| :---: | :--- | ---: | :--- |
| **0** | **Design Tokens & Utilities** | **68** | CSS variables, design scales, formatters, composables |
| | Color Tokens | 28 | Brand, semantic, financial domain colors |
| | Elevation & Shadow | 9 | Material-inspired shadow scale |
| | Design Scales | 31+ | Spacing, radius, typography, z-index, motion |
| | Global CSS Utilities | — | Surfaces, form styles, layout utilities |
| | Headless Utilities | 8 | colors.ts, currency.ts, 6 composables |
| **1** | **Base Components (Atoms)** | **21** | Styled foundational UI building blocks |
| | Interactive | 11 | TButton, TDropdown, TDropdownItem, SearchInput, etc. |
| | Display | 6 | TCard, TAvatar, Logo, LoadingSkeleton, EmptyState |
| | Navigation | 2 | HamburgerMenu, ViewToggle |
| | Utility | 2 | ComponentLoader, ExtensionSlot |
| **2** | **Composite Components (Molecules)** | **29** | Reusable complex patterns |
| | Forms & Inputs | 4 | SearchableDropdown, IconPicker, ThemeSelector, LanguageSelector |
| | Layout & Display | 8 | ContentCard, ContentCardGrid, ContentTable, ContentListView, etc. |
| | Modals & Overlays | 3 | ConfirmModal, StatsFilterModal, NotificationBell |
| | Data Visualization | 5 | SparkLine, KpiCard, 4 chart components |
| | Auth & Onboarding | 2 | AuthCarousel, AuthSocialLogin |
| | Settings & Config | 2 | CollapsibleSection, PeriodControl |
| | Other | 5 | TTableComponent, NotificationsContainer, DescriptorRenderer, etc. |
| **3** | **Domain Components** | **90+** | Business logic & data-bound components |
| | Transactions | 10 | TransactionForm, TransactionsSpreadsheet, filters, etc. |
| | Wallets | 5 | WalletCard, WalletForm, WalletDetailPanel, etc. |
| | Budgets | 2 | BudgetCard, BudgetForm |
| | Categories & Groups | 2 | CategoryForm, GroupForm |
| | Parties | 4 | PartyCard, PartiesForm, PartyDetailPanel, PartiesStatsStrip |
| | Holdings & Reminders | 2 | HoldingForm, ReminderForm |
| | Imports | 5 | ImportUpload, ImportAnalyzing, SuggestionReviewTable, etc. |
| | Dashboard | 7 | DashboardKPIs, RecentTransactions, CategoryBreakdown, etc. |
| | Reports | 19 | CashflowHero, MonthInReview, CalendarHeatmap, Sankey, etc. |
| | Settings | 7 | SettingsAccount, SettingsDisplay, PasswordModal, etc. |
| | AI / Chat | 24 | ChatExperience, ChatComposer, 16 block renderers, etc. |
| | Financial Position | 2 | FinancialPositionView, FinancialPositionDrill |
| | Auth & Onboarding | 5 | LoginCard, RegisterCard, OnboardingWizard, etc. |
| | Admin | 2 | UserDetail, OutreachComposer |
| **4** | **Layouts & Pages** | **33** | Application structure & routes |
| | Navigation Components | 2 | TNavbar, TSidebar |
| | Layout Shells | 5 | default, dashboard, auth, onboarding, admin |
| | Page Routes | 26 | Landing, auth, dashboard, transactions, reports, etc. |

**Total Tracked Components: 241+**

---

### Architecture Alignment with Industry Standards

| Aspect | Theoretical Best Practice | Trakli Current State | Migration Priority |
| :--- | :--- | :--- | :---: |
| **Headless Primitives** | Dedicated layer (Radix UI, Ark UI, React Aria) | ❌ Not implemented | 🔴 High |
| **Design Tokens** | Platform-agnostic JSON/YAML exported to CSS | ✓ SCSS variables (platform-specific) | 🟡 Medium |
| **Component Variants** | CVA (Class Variance Authority) + Tailwind | ❌ Manual SCSS classes | 🔴 High |
| **Styled Atoms** | Composition of headless + styled wrapper | ⚠️ Monolithic styled components | 🔴 High |
| **Type Safety** | Full TypeScript coverage | ⚠️ Mixed .vue/.ts, incomplete types | 🟡 Medium |
| **Accessibility** | WCAG AA/AAA compliance, automated testing | ⚠️ Manual ARIA, no automated tests | 🟡 Medium |
| **Dark Mode** | CSS custom properties + theme tokens | ✓ CSS variables + theme composable | 🟢 Low |
| **Responsive Design** | Container queries + viewport breakpoints | ⚠️ Media queries only | 🟡 Medium |
| **State Management** | Composables + shared state | ✓ Composables pattern | 🟢 Low |
| **Documentation** | Storybook / Histoire with stories | ❌ No component workshop | 🟡 Medium |

---

### Recommended Migration Path

#### Phase 1: Foundation Modernization (Weeks 1-4)
1. **Adopt Style Dictionary** for platform-agnostic design tokens
2. **Integrate CVA** (Class Variance Authority) for type-safe component variants
3. **Add Tailwind CSS** as utility-first styling layer
4. **Set up Histoire** or Storybook for component development

#### Phase 2: Headless Primitive Layer (Weeks 5-10)
5. **Install Reka UI** (Radix for Vue) as headless primitive foundation
6. **Refactor Layer 1 atoms** to compose Reka UI primitives with styled wrappers
   - Priority order: TDropdown → TButton → TTabs → SearchInput
7. **Establish component composition patterns** (primitive + wrapper convention)

#### Phase 3: Component Library Refinement (Weeks 11-16)
8. **Migrate SCSS to Tailwind + CVA** for all Layer 1 and Layer 2 components
9. **Add automated accessibility testing** (axe-core, Playwright)
10. **Implement container queries** for responsive components
11. **Complete TypeScript coverage** for all components and props

#### Phase 4: Distribution & Developer Experience (Weeks 17-20)
12. **Set up component CLI** (shadcn/ui-style copy-paste model)
13. **Create comprehensive Storybook documentation**
14. **Add visual regression testing** (Chromatic or Percy)
15. **Publish as npm package** (optional, for multi-repo usage)

---

### Key Files for Migration Attention

#### Immediate Refactor Candidates (High Impact)
```
components/TButton.vue           → Compose Reka UI Button + CVA variants
components/TDropdown.vue         → Replace with Reka UI DropdownMenu
components/SearchableDropdown.vue → Compose Reka UI Combobox
components/TTabs.vue             → Replace with Reka UI Tabs
assets/scss/_variables.scss      → Convert to Style Dictionary tokens
```

#### Token System Overhaul
```
assets/scss/_variables.scss → tokens/colors.json
                            → tokens/spacing.json
                            → tokens/typography.json
                            → tokens/motion.json
                            (Style Dictionary build → CSS custom properties)
```

#### Test Coverage Priority
```
1. Layer 1 atoms (TButton, TCard, TDropdown)
2. Layer 2 forms (SearchableDropdown, IconPicker)
3. Layer 3 critical paths (TransactionForm, WalletForm, BudgetForm)
4. Layer 4 layouts (dashboard.vue, auth.vue)
```

---

## 🎯 Migration Tracking

Use the checkboxes throughout this document to track component-by-component migration progress:

- `[ ]` → Component pending migration
- `[x]` → Component migrated to modern headless/token-driven architecture

**Migration Progress**: 0 / 241+ components (0%)

---

**Document Version**: 1.0  
**Last Updated**: 2026-08-31  
**Maintained by**: Trakli Engineering Team

