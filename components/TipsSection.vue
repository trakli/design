<template>
  <aside class="tips-container" :aria-label="titleText">
    <div class="tips-content">
      <div class="tips-header">
        <slot name="title">
          <h2 class="tips-title">
            {{ titleText }}
          </h2>
        </slot>
      </div>
      <div class="tips-text-content">
        <slot>
          <p class="tips-text">
            {{ descriptionText }}
          </p>
        </slot>
      </div>
    </div>
    <div class="tips-footer">
      <slot name="illustration">
        <img :src="bulbIcon" alt="Bulb Icon" class="bulb-image" />
      </slot>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import bulbIcon from '../assets/bulbIcon.svg';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k, params) => {
  if (params?.item) {
    if (k.includes('Tips for')) return `Tips for adding ${params.item}`;
    if (k.includes('Always check')) return `Always check everything before submitting a new ${params.item}.`;
  }
  return k;
});

const props = defineProps({
  pageName: {
    type: String,
    default: 'item'
  },
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
});

const titleText = computed(() => {
  if (props.title) return props.title;
  return t('Tips for adding {item}', { item: t(props.pageName).toLowerCase() });
});

const descriptionText = computed(() => {
  if (props.text) return props.text;
  return t('Always check everything before submitting a new {item}.', {
    item: t(props.pageName).toLowerCase()
  });
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.tips-container {
  width: 380px;
  min-height: 480px;
  background-color: rgba(var(--color-warning-rgb), 0.12);
  border: 1px solid rgba(var(--color-warning-rgb), 0.25);
  padding: 2rem;
  border-radius: $radius-xl;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 2rem;
  margin: 0;
  align-self: flex-start;

  @media (max-width: 1200px) {
    width: 340px;
  }

  @media (max-width: $breakpoint-lg) {
    display: none;
  }

  @media (max-width: $breakpoint-md) {
    display: flex;
    width: 100%;
    min-height: auto;
    position: static;
    padding: 1.25rem;
  }
}

.tips-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tips-title {
  color: var(--color-warning-text, $warning);
  font-weight: $font-bold;
  font-size: 1.75rem;
  line-height: 120%;
  margin: 0;

  @media (max-width: $breakpoint-lg) {
    font-size: 1.5rem;
  }

  @media (max-width: $breakpoint-md) {
    font-size: 1.25rem;
  }
}

.tips-text-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tips-text {
  color: $text-secondary;
  line-height: 1.5;
  font-size: $font-size-base;
  font-weight: $font-normal;
  margin: 0;

  @media (max-width: $breakpoint-lg) {
    font-size: $font-size-sm;
  }
}

.tips-footer {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 2rem;

  @media (max-width: $breakpoint-md) {
    margin-top: 1.5rem;
  }
}

.bulb-image {
  width: 150px;
  height: auto;
  object-fit: contain;

  @media (max-width: $breakpoint-lg) {
    width: 130px;
  }

  @media (max-width: $breakpoint-md) {
    width: 110px;
  }
}
</style>
