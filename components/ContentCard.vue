<template>
  <div class="entity-card" :class="{ 'is-default': isDefault }">
    <div class="entity-icon-name" :class="{ 'no-icon': !icon }">
      <component :is="resolvedIcon" v-if="icon" class="entity-icon" />
      <span class="name">{{ name }}</span>
      <span v-if="isDefault" class="default-badge" :title="defaultBadgeLabel">
        {{ defaultBadgeLabel }}
      </span>
    </div>

    <div class="entity-description">
      <slot name="description">{{ description }}</slot>
      <div
        v-if="typeBadge"
        class="category-type-badge"
        :class="`type-${typeBadge}`"
      >
        <slot name="type-badge">{{ typeBadgeLabel || typeBadge }}</slot>
      </div>
    </div>

    <div class="entity-actions">
      <slot name="actions">
        <TButton
          variant="text"
          size="small"
          :full-width="false"
          class="action-btn action-btn--edit"
          :aria-label="editLabel"
          :title="editLabel"
          @click="$emit('edit')"
        >
          <Edit :size="16" />
        </TButton>
        <TButton
          variant="text"
          size="small"
          :full-width="false"
          class="action-btn action-btn--delete"
          :aria-label="deleteLabel"
          :title="deleteLabel"
          @click="$emit('delete')"
        >
          <Trash2 :size="16" />
        </TButton>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Edit, Trash2 } from 'lucide-vue-next';
import * as LucideIcons from 'lucide-vue-next';
import TButton from './TButton.vue';

const props = defineProps({
  name: { type: String, default: '' },
  icon: { type: String, default: null },
  description: { type: String, default: '' },
  isDefault: { type: Boolean, default: false },
  defaultBadgeLabel: { type: String, default: 'Default' },
  typeBadge: { type: String, default: null },
  typeBadgeLabel: { type: String, default: '' },
  editLabel: { type: String, default: 'Edit' },
  deleteLabel: { type: String, default: 'Delete' }
});

defineEmits(['edit', 'delete']);

const resolvedIcon = computed(() => {
  if (!props.icon) return null;
  return LucideIcons[props.icon] || LucideIcons.Box;
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.entity-card {
  display: grid;
  grid-template-columns: 1.8fr 2.5fr auto;
  align-items: start;
  padding: $spacing-4;
  border-bottom: 1px solid $border-light;
  gap: $spacing-4;
  background: $bg-light;
  transition: transform $duration-fast $easing-standard,
    box-shadow $duration-fast $easing-standard,
    background-color $duration-fast $easing-standard;
  cursor: pointer;
  min-height: 60px;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1.6fr 2.2fr auto;
    padding: $spacing-3;
    gap: $spacing-3;
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1.5fr 2fr auto;
    padding: $spacing-2;
    gap: $spacing-2;
    min-height: 50px;
  }

  &.is-default {
    background: rgba(var(--color-success-rgb), 0.06);
    border-left: 3px solid $primary;
    padding-left: calc(#{$spacing-4} - 3px);
  }

  &:hover {
    background: $bg-white;
    box-shadow: $shadow-sm;

    &.is-default {
      background: rgba(var(--color-success-rgb), 0.1);
    }

    .entity-icon {
      transform: scale(1.08);
    }
  }
}

.entity-icon-name {
  display: flex;
  align-items: flex-start;
  gap: $spacing-2;
  min-width: 0;

  &.no-icon {
    padding-left: calc(24px + #{$spacing-2});

    @media (max-width: $breakpoint-sm) {
      padding-left: calc(20px + #{$spacing-2});
    }
  }
}

.entity-icon {
  width: 24px;
  height: 24px;
  color: $primary;
  transition: transform $duration-fast $easing-standard;
  flex-shrink: 0;

  @media (max-width: $breakpoint-sm) {
    width: 20px;
    height: 20px;
  }
}

.name {
  font-weight: $font-medium;
  color: $text-primary;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  font-size: $font-size-sm;
  flex: 1;
  min-width: 0;
  line-height: 1.3;
}

.default-badge {
  display: inline-flex;
  align-items: center;
  background: $primary;
  color: $text-inverse;
  font-size: 0.65rem;
  font-weight: $font-bold;
  padding: 2px 7px;
  border-radius: $radius-sm;
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.entity-description {
  color: $text-secondary;
  font-size: $font-size-sm;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  min-width: 0;
}

.category-type-badge {
  display: inline-flex;
  align-items: center;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: $font-size-xs;
  font-weight: $font-semibold;
  text-transform: capitalize;

  &.type-income {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: $primary;
  }

  &.type-expense {
    background: rgba(var(--color-error-rgb), 0.1);
    color: $error-color;
  }
}

.entity-actions {
  display: flex;
  gap: $spacing-1;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
}

.action-btn {
  padding: 4px;
  min-height: auto;
  width: 28px;
  height: 28px;
  border-radius: $radius-sm;

  &--edit {
    color: $primary;

    &:hover {
      background: rgba(var(--color-primary-rgb), 0.1);
      color: $primary-dark;
    }
  }

  &--delete {
    color: $error-color;

    &:hover {
      background: rgba(var(--color-error-rgb), 0.1);
    }
  }
}
</style>
