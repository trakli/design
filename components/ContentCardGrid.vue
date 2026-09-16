<template>
  <div class="card-grid">
    <div
      v-for="entity in entities"
      :key="entity.id"
      class="entity-card"
      :class="{ 'is-default': String(entity.id) === defaultItemId }"
    >
      <div class="card-header">
        <div class="entity-info">
          <div v-if="getIcon(entity)" class="entity-icon">
            <component :is="getIcon(entity)" />
          </div>
          <div class="entity-details">
            <h3 class="entity-name">{{ entity.name }}</h3>
            <span v-if="String(entity.id) === defaultItemId" class="default-badge">
              {{ defaultBadgeLabel }}
            </span>
          </div>
        </div>
        <div class="card-actions" @click.stop>
          <TDropdown class="action-menu-container">
            <template #trigger>
              <TButton
                variant="text"
                size="small"
                :full-width="false"
                class="action-menu-btn"
                :aria-label="moreActionsLabel"
                :title="moreActionsLabel"
              >
                <MoreVertical :size="16" />
              </TButton>
            </template>
            <slot name="card-menu" :entity="entity">
              <TDropdownItem class="action-item action-item--edit" @click="handleEdit(entity)">
                <Edit :size="14" />
                <span>{{ editLabel }}</span>
              </TDropdownItem>
              <TDropdownItem class="action-item action-item--delete" @click="handleDelete(entity)">
                <Trash2 :size="14" />
                <span>{{ deleteLabel }}</span>
              </TDropdownItem>
            </slot>
          </TDropdown>
        </div>
      </div>

      <div v-if="entity.description" class="card-description">
        {{ entity.description }}
      </div>

      <div v-if="cardFields && cardFields.length > 0" class="card-fields">
        <div v-for="field in cardFields" :key="field.key" class="field-row">
          <span class="field-label">{{ field.label }}</span>
          <span class="field-value" :class="field.class">
            <template v-if="field.render">
              {{ field.render(entity[field.key], entity) }}
            </template>
            <template v-else>
              {{ getCellValue(entity, field.key) }}
            </template>
          </span>
        </div>
      </div>

      <slot name="card-footer" :entity="entity" />
    </div>

    <div v-if="entities.length === 0" class="empty-state">
      <slot name="empty">
        <p>{{ emptyText }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { MoreVertical, Edit, Trash2 } from 'lucide-vue-next';
import * as LucideIcons from 'lucide-vue-next';
import TButton from './TButton.vue';
import TDropdown from './TDropdown.vue';
import TDropdownItem from './TDropdownItem.vue';

defineProps({
  entities: { type: Array, default: () => [] },
  cardFields: { type: Array, default: () => [] },
  defaultItemId: { type: String, default: null },
  defaultBadgeLabel: { type: String, default: 'Default' },
  moreActionsLabel: { type: String, default: 'More actions' },
  editLabel: { type: String, default: 'Edit' },
  deleteLabel: { type: String, default: 'Delete' },
  emptyText: { type: String, default: 'No items found.' }
});

const emit = defineEmits(['edit', 'delete']);

const handleEdit = (entity) => emit('edit', entity);
const handleDelete = (entity) => emit('delete', entity);

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
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: $spacing-3;
  width: 100%;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    gap: $spacing-2;
  }
}

.entity-card {
  background: $bg-white;
  border-radius: $radius-lg;
  padding: $spacing-3;
  box-shadow: $shadow-sm;
  border-left: 3px solid $border-medium;
  transition: box-shadow $duration-fast $easing-standard;

  &:hover {
    box-shadow: $shadow-md;
  }

  &.is-default {
    border-left-color: $primary;
    background: rgba(var(--color-primary-rgb), 0.03);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: $spacing-2;
}

.entity-info {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  flex: 1;
  min-width: 0;
}

.entity-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(var(--color-primary-rgb), 0.1);
  color: $primary;

  svg {
    width: 1rem;
    height: 1rem;
  }
}

.entity-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.entity-name {
  margin: 0;
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.default-badge {
  display: inline-flex;
  align-items: center;
  background: $primary;
  color: $text-inverse;
  font-size: 0.6rem;
  font-weight: $font-bold;
  padding: 2px 6px;
  border-radius: $radius-sm;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
}

.card-actions {
  flex-shrink: 0;
}

.action-menu-btn {
  padding: 4px;
  min-height: auto;
  border-radius: $radius-md;
  color: $text-muted;

  &:hover {
    background: $bg-gray;
    color: $text-secondary;
  }
}

.action-item {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  width: 100%;
  font-size: $font-size-sm;

  &--edit {
    color: $primary;

    &:hover {
      background: rgba(var(--color-primary-rgb), 0.08);
    }
  }

  &--delete {
    color: $error-color;

    &:hover {
      background: rgba(var(--color-error-rgb), 0.08);
    }
  }
}

.card-description {
  color: $text-muted;
  font-size: $font-size-xs;
  line-height: 1.4;
  margin-bottom: $spacing-2;
}

.card-fields {
  border-top: 1px solid $border-light;
  padding-top: $spacing-2;
  margin-top: $spacing-2;
}

.field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  font-size: $font-size-xs;

  &:not(:last-child) {
    border-bottom: 1px dashed $border-light;
    padding-bottom: 0.375rem;
    margin-bottom: 0.25rem;
  }
}

.field-label {
  color: $text-muted;
  font-weight: $font-medium;
}

.field-value {
  color: $text-primary;
  font-weight: $font-semibold;

  &.positive { color: $primary; }
  &.negative { color: $error-color; }
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: $spacing-8;
  color: $text-muted;
  font-size: $font-size-sm;
}
</style>
