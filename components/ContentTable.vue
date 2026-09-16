<template>
  <ComponentLoader
    :is-loading="isLoading"
    :error="error"
    :has-data="entities.length > 0"
    :show-empty="false"
    skeleton-variant="table"
    :skeleton-count="8"
    :skeleton-columns="computedColumns.length + 1"
  >
    <div class="entity-list">
      <div v-if="!hideHeader" class="header-row">
        <slot name="header-title">
          <h2 class="header-title">{{ title }}</h2>
        </slot>
        <SearchInput
          v-model="internalSearchQuery"
          :placeholder="searchPlaceholder"
        />
      </div>

      <div class="table-wrapper">
        <div class="table-scroll">
          <table class="content-table" :class="{ 'expense-table': headerType === 'expense' }">
            <thead>
              <tr>
                <th
                  v-for="col in computedColumns"
                  :key="col.key"
                  :style="col.width ? { width: col.width } : {}"
                  :class="[`col-${col.key}`, col.align ? `text-${col.align}` : '']"
                >
                  {{ col.label }}
                </th>
                <th class="col-action">{{ actionColumnLabel }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entity in paginatedEntities"
                :key="entity.id"
                class="entity-row"
                :class="{ 'is-default': String(entity.id) === defaultItemId }"
              >
                <td
                  v-for="col in computedColumns"
                  :key="col.key"
                  :class="[`col-${col.key}`, col.align ? `text-${col.align}` : '']"
                >
                  <template v-if="col.key === 'name'">
                    <div class="name-cell">
                      <component :is="getIcon(entity)" v-if="getIcon(entity)" class="entity-icon" />
                      <span class="name-text">{{ entity.name }}</span>
                      <span v-if="String(entity.id) === defaultItemId" class="default-badge">
                        {{ defaultBadgeLabel }}
                      </span>
                    </div>
                  </template>
                  <template v-else-if="col.render">
                    {{ col.render(entity[col.key], entity) }}
                  </template>
                  <template v-else>
                    {{ getCellValue(entity, col.key) }}
                  </template>
                </td>
                <td class="col-action">
                  <div class="entity-actions">
                    <slot name="row-actions" :entity="entity">
                      <TButton
                        variant="text"
                        size="small"
                        :full-width="false"
                        class="action-btn action-btn--edit"
                        :aria-label="editLabel"
                        :title="editLabel"
                        @click="$emit('edit', entity)"
                      >
                        <Edit :size="15" />
                      </TButton>
                      <TButton
                        variant="text"
                        size="small"
                        :full-width="false"
                        class="action-btn action-btn--delete"
                        :aria-label="deleteLabel"
                        :title="deleteLabel"
                        @click="$emit('delete', entity)"
                      >
                        <Trash2 :size="15" />
                      </TButton>
                    </slot>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedEntities.length === 0">
                <td :colspan="computedColumns.length + 1" class="empty-row">
                  <slot name="empty">{{ emptyText }}</slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination-row">
          <div class="pagination-controls">
            <TButton
              variant="text"
              size="small"
              :full-width="false"
              :disabled="currentPage <= 1"
              :aria-label="prevPageLabel"
              class="pagination-nav-btn"
              @click="currentPage--"
            >
              <ChevronLeft :size="16" />
            </TButton>

            <template v-for="page in visiblePages" :key="page">
              <span v-if="page === '...'" class="pagination-ellipsis">…</span>
              <TButton
                v-else
                :variant="page === currentPage ? 'primary' : 'text'"
                size="small"
                :full-width="false"
                class="pagination-page-btn"
                @click="currentPage = page"
              >
                {{ page }}
              </TButton>
            </template>

            <TButton
              variant="text"
              size="small"
              :full-width="false"
              :disabled="currentPage >= totalPages"
              :aria-label="nextPageLabel"
              class="pagination-nav-btn"
              @click="currentPage++"
            >
              <ChevronRight :size="16" />
            </TButton>
          </div>

          <div class="page-info">
            <span>{{ showLabel }}</span>
            <select v-model="perPage" class="per-page-select">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
            <span>{{ perPageLabel }}</span>
          </div>
        </div>
      </div>
    </div>
  </ComponentLoader>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import * as LucideIcons from 'lucide-vue-next';
import ComponentLoader from './ComponentLoader.vue';
import SearchInput from './SearchInput.vue';
import TButton from './TButton.vue';

const props = defineProps({
  entities: { type: Array, default: () => [] },
  columns: { type: Array, default: null },
  isLoading: { type: Boolean, default: false },
  error: { type: String, default: null },
  headerType: { type: String, default: 'default' },
  defaultItemId: { type: String, default: null },
  hideHeader: { type: Boolean, default: false },
  searchQuery: { type: String, default: '' },
  // i18n / labels — pass pre-translated strings from the host app
  title: { type: String, default: '' },
  searchPlaceholder: { type: String, default: 'Search...' },
  actionColumnLabel: { type: String, default: 'Action' },
  defaultBadgeLabel: { type: String, default: 'Default' },
  editLabel: { type: String, default: 'Edit' },
  deleteLabel: { type: String, default: 'Delete' },
  emptyText: { type: String, default: 'No items found.' },
  showLabel: { type: String, default: 'Show' },
  perPageLabel: { type: String, default: 'per page' },
  prevPageLabel: { type: String, default: 'Previous page' },
  nextPageLabel: { type: String, default: 'Next page' },
  defaultColumns: {
    type: Array,
    default: () => [
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' }
    ]
  }
});

defineEmits(['edit', 'delete']);

const computedColumns = computed(() => props.columns || props.defaultColumns);

const getIcon = (entity) => {
  const iconValue = entity.icon?.path || entity.icon?.content || entity.icon;
  if (!iconValue) return null;
  return LucideIcons[iconValue] || LucideIcons.Box;
};

const getCellValue = (entity, key) => {
  if (key.includes('.')) {
    return key.split('.').reduce((obj, k) => obj?.[k], entity) ?? '';
  }
  return entity[key] ?? '';
};

const internalSearchQuery = ref('');
const currentPage = ref(1);
const perPage = ref(10);

const effectiveSearchQuery = computed(() =>
  props.hideHeader ? props.searchQuery : internalSearchQuery.value
);

const filteredEntities = computed(() => {
  if (!effectiveSearchQuery.value) return props.entities;
  const query = effectiveSearchQuery.value.toLowerCase();
  return props.entities.filter(
    (entity) =>
      entity.name?.toLowerCase().includes(query) ||
      entity.description?.toLowerCase().includes(query)
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredEntities.value.length / perPage.value))
);

const paginatedEntities = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredEntities.value.slice(start, start + perPage.value);
});

watch(effectiveSearchQuery, () => { currentPage.value = 1; });
watch(perPage, () => {
  const maxPage = Math.max(1, Math.ceil(filteredEntities.value.length / perPage.value));
  if (currentPage.value > maxPage) currentPage.value = maxPage;
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(start + 2, total - 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    pages.push(total);
  }

  return pages;
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.entity-list {
  width: 100%;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-4;
  gap: $spacing-4;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    align-items: stretch;
    gap: $spacing-3;
  }
}

.header-title {
  margin: 0;
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
}

.table-wrapper {
  width: 100%;
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  overflow: hidden;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
}

.content-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 500px;

  thead tr {
    background: rgba(var(--color-primary-rgb), 0.06);
  }

  thead th {
    color: $primary-dark;
    font-weight: $font-bold;
    text-align: left;
    padding: 8px 16px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
    border-bottom: 1px solid $border-light;

    &:first-child { padding-left: 20px; }
    &.text-right { text-align: right; }
    &.text-center { text-align: center; }
  }

  &.expense-table thead tr {
    background: rgba(var(--color-expense-rgb), 0.08);
    th { color: var(--color-expense); }
  }

  tbody {
    .entity-row {
      transition: background-color $duration-fast $easing-standard;

      &:hover { background: rgba(var(--color-primary-rgb), 0.03); }
      &.is-default { background: rgba(var(--color-success-rgb), 0.06); }
      &:last-child td { border-bottom: none; }

      td {
        padding: 8px 16px;
        border-bottom: 1px solid $border-light;
        font-size: $font-size-sm;
        vertical-align: middle;

        &:first-child { padding-left: 20px; }
        &.text-right { text-align: right; }
        &.text-center { text-align: center; }
      }
    }
  }
}

.name-cell {
  display: flex;
  align-items: center;
  gap: $spacing-2;
}

.entity-icon {
  width: 18px;
  height: 18px;
  color: $primary;
  flex-shrink: 0;
}

.name-text {
  font-weight: $font-medium;
  color: $text-primary;
}

.default-badge {
  display: inline-flex;
  background: $primary;
  color: $text-inverse;
  font-size: 0.6rem;
  font-weight: $font-bold;
  padding: 2px 6px;
  border-radius: $radius-sm;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.col-action {
  text-align: right;
  white-space: nowrap;
  width: 96px;
  padding-right: 20px !important;
}

.entity-actions {
  display: inline-flex;
  gap: 2px;
  justify-content: flex-end;
  align-items: center;
}

.action-btn {
  padding: 4px;
  min-height: auto;
  width: 28px;
  height: 28px;
  border-radius: $radius-sm;

  &--edit { color: $primary; &:hover { background: rgba(var(--color-primary-rgb), 0.1); } }
  &--delete { color: $error-color; &:hover { background: rgba(var(--color-error-rgb), 0.1); } }
}

.empty-row {
  text-align: center;
  padding: 2.5rem 1rem !important;
  color: $text-muted;
  font-size: $font-size-sm;
}

.pagination-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-3 $spacing-4;
  border-top: 1px solid $border-light;
  gap: $spacing-3;

  @media (max-width: $breakpoint-md) {
    flex-direction: column-reverse;
    gap: $spacing-2;
    padding: $spacing-3;
  }
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
}

.pagination-nav-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  min-height: auto;
  border-radius: $radius-md;
  color: $text-muted;
}

.pagination-page-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  min-height: auto;
  border-radius: $radius-md;
  font-variant-numeric: tabular-nums;
}

.pagination-ellipsis {
  color: $text-muted;
  padding: 0 4px;
  font-size: $font-size-sm;
  line-height: 32px;
}

.page-info {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  color: $text-muted;
  font-size: $font-size-sm;
  white-space: nowrap;
}

.per-page-select {
  padding: 4px 28px 4px 10px;
  border: 1px solid $border-medium;
  border-radius: $radius-md;
  background: $bg-white;
  color: $text-secondary;
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 6px center;
  background-repeat: no-repeat;
  background-size: 1.1em;
  height: 32px;

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.15);
  }
}
</style>
