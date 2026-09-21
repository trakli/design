<template>
  <section class="empty-card">
    <div class="empty-art" aria-hidden="true">
      <svg viewBox="0 0 240 160" width="200" height="140">
        <defs>
          <linearGradient id="ec-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" :stop-color="primaryColor" stop-opacity="0.18" />
            <stop offset="100%" :stop-color="primaryColor" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 10 120 L 50 90 L 90 100 L 130 60 L 170 80 L 210 40 L 230 50"
          :stroke="primaryColor"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
        />
        <path
          d="M 10 120 L 50 90 L 90 100 L 130 60 L 170 80 L 210 40 L 230 50 L 230 150 L 10 150 Z"
          fill="url(#ec-grad)"
        />
        <circle cx="50" cy="90" r="4" :fill="primaryColor" />
        <circle cx="130" cy="60" r="4" :fill="primaryColor" />
        <circle cx="210" cy="40" r="5" :fill="primaryColor" />
        <g class="dots">
          <circle cx="210" cy="40" r="10" :fill="primaryColor" fill-opacity="0.18" />
        </g>
      </svg>
    </div>
    <h2 class="empty-title">{{ title || t('Reports are waiting on data') }}</h2>
    <p class="empty-text">
      {{
        description ||
        t(
          'Log a few transactions and your income, expenses, ratios, and patterns will appear here.'
        )
      }}
    </p>
    <component
      :is="to ? 'NuxtLink' : 'button'"
      :to="to || undefined"
      class="cta"
      @click="$emit('action')"
    >
      <Plus :size="16" />
      <span>{{ actionText || t('Add your first transaction') }}</span>
    </component>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { Plus } from 'lucide-vue-next';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  primary: {
    type: String,
    default: '#047844'
  },
  to: {
    type: String,
    default: '/transactions/new'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  actionText: {
    type: String,
    default: ''
  }
});

defineEmits(['action']);

const primaryColor = computed(() => props.primary || '#047844');
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.empty-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $spacing-3;
  padding: $spacing-8 $spacing-4;
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: 14px;
  box-shadow: $elevation-1;
  width: 100%;
}

.empty-art .dots {
  transform-origin: 210px 40px;
  animation: pulse 2.2s $easing-standard infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.2;
  }
}

.empty-title {
  font-size: $font-size-xl;
  font-weight: $font-bold;
  color: $text-primary;
  margin: 0;
}

.empty-text {
  font-size: $font-size-sm;
  color: $text-muted;
  max-width: 380px;
  margin: 0;
  line-height: 1.5;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: $spacing-2;
  padding: 10px 18px;
  border-radius: 999px;
  background: $primary;
  color: $text-inverse;
  font-weight: $font-semibold;
  font-size: $font-size-sm;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all $duration-fast $easing-standard;

  &:hover {
    filter: brightness(0.95);
    color: $text-inverse;
  }
}
</style>
