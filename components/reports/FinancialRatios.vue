<template>
  <TPanel :padding="0" class="ratios-panel">
    <div class="ratios">
      <article v-for="ratio in ratios" :key="ratio.key" class="ratio">
        <header class="ratio-head">
          <span class="ratio-label">{{ ratio.label }}</span>
          <span class="ratio-pill" :class="`pill--${ratio.tone}`">{{ ratio.toneLabel }}</span>
        </header>
        <p class="ratio-value" :class="`value--${ratio.tone}`">{{ ratio.formatted }}</p>
      </article>
    </div>
  </TPanel>
</template>

<script setup>
import { computed } from 'vue';
import TPanel from '../TPanel.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k, params) => {
  if (params?.n !== undefined) return `${params.n} months`;
  return k;
});

const props = defineProps({
  totals: {
    type: Object,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  formatter: {
    type: Function,
    default: (n) => `${Math.round(n)}`
  }
});

const savingsRate = computed(() => (props.totals?.savingsRate ?? 0) * 100);
const expenseRatio = computed(() => (props.totals?.expenseRatio ?? 0) * 100);
const runway = computed(() => props.totals?.runwayMonths ?? 0);

const ratios = computed(() => [
  {
    key: 'savings',
    label: t('Savings rate'),
    formatted: `${savingsRate.value.toFixed(0)}%`,
    tone:
      savingsRate.value >= 20
        ? 'good'
        : savingsRate.value >= 10
          ? 'ok'
          : savingsRate.value >= 0
            ? 'warn'
            : 'bad',
    toneLabel:
      savingsRate.value >= 20
        ? t('Healthy')
        : savingsRate.value >= 10
          ? t('Building')
          : savingsRate.value >= 0
            ? t('Watch')
            : t('Deficit')
  },
  {
    key: 'expense',
    label: t('Expense ratio'),
    formatted: `${expenseRatio.value.toFixed(0)}%`,
    tone:
      expenseRatio.value <= 70
        ? 'good'
        : expenseRatio.value <= 90
          ? 'ok'
          : expenseRatio.value <= 100
            ? 'warn'
            : 'bad',
    toneLabel:
      expenseRatio.value <= 70
        ? t('Lean')
        : expenseRatio.value <= 90
          ? t('Steady')
          : expenseRatio.value <= 100
            ? t('Tight')
            : t('Over')
  },
  {
    key: 'runway',
    label: t('Runway'),
    formatted: runway.value > 0 ? t('{n} months', { n: runway.value.toFixed(1) }) : t('—'),
    tone:
      runway.value >= 6 ? 'good' : runway.value >= 3 ? 'ok' : runway.value >= 1 ? 'warn' : 'bad',
    toneLabel:
      runway.value >= 6
        ? t('Strong')
        : runway.value >= 3
          ? t('OK')
          : runway.value >= 1
            ? t('Short')
            : t('None')
  }
]);
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.ratios-panel {
  border-radius: 14px;
  box-shadow: $elevation-1;
}

.ratios {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.ratio {
  padding: $spacing-3 $spacing-4;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-right: 1px solid $border-color;

  &:last-child {
    border-right: none;
  }

  @media (max-width: $breakpoint-sm) {
    border-right: none;
    border-bottom: 1px solid $border-color;
    &:last-child {
      border-bottom: none;
    }
  }
}

.ratio-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-2;
}

.ratio-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: $font-semibold;
  color: $text-muted;
}

.ratio-pill {
  font-size: 10px;
  font-weight: $font-bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: 999px;
  white-space: nowrap;

  &.pill--good {
    background: var(--color-income-soft, rgba(16, 185, 129, 0.15));
    color: var(--color-income, #10b981);
  }
  &.pill--ok {
    background: rgba(var(--color-primary-rgb), 0.12);
    color: var(--color-primary, #047844);
  }
  &.pill--warn {
    background: rgba(var(--color-warning-rgb), 0.18);
    color: var(--color-warning, #f59e0b);
  }
  &.pill--bad {
    background: var(--color-expense-soft, rgba(239, 68, 68, 0.15));
    color: var(--color-expense, #ef4444);
  }
}

.ratio-value {
  font-size: 1.5rem;
  font-weight: $font-semibold;
  color: $text-primary;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.1;

  &.value--good {
    color: var(--color-income, #10b981);
  }
  &.value--ok {
    color: var(--color-primary, #047844);
  }
  &.value--warn {
    color: var(--color-warning, #f59e0b);
  }
  &.value--bad {
    color: var(--color-expense, #ef4444);
  }
}
</style>
