<template>
  <TCard class="transaction-sub-card">
    <div class="transaction-sub-card-content">
      <h1 class="transaction-sub-card-title" :style="{ color: titleColor }">
        {{ title }}<sup v-if="currency" class="currency-superscript" :style="{ color: titleColor }">{{ currency }}</sup>
      </h1>
      <span class="transaction-sub-card-text" :style="{ color: textColor }">{{ text }}</span>
    </div>
  </TCard>
</template>

<script setup>
import TCard from './TCard.vue';

defineProps({
  title: {
    type: [String, Number],
    default: '0'
  },
  text: {
    type: String,
    default: ''
  },
  titleColor: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  },
  currency: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.transaction-sub-card {
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease;

  @media (max-width: $breakpoint-md) {
    padding: 0.625rem 0.875rem;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 0.5rem 0.75rem;
  }
}

.transaction-sub-card-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.transaction-sub-card-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: $font-bold;
  line-height: 1.2;
  color: $text-primary;
  display: flex;
  align-items: baseline;
  gap: 2px;

  @media (max-width: $breakpoint-md) {
    font-size: 1.25rem;
  }

  @media (max-width: $breakpoint-sm) {
    font-size: 1.125rem;
  }
}

.currency-superscript {
  font-size: 0.75rem;
  font-weight: $font-semibold;
  top: -0.5em;
}

.transaction-sub-card-text {
  font-size: $font-size-sm;
  color: $text-muted;
  font-weight: $font-medium;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-xs;
  }
}
</style>
