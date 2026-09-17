<template>
  <div class="quick-insights">
    <Lightbulb class="card-glyph" :size="128" :stroke-width="1" aria-hidden="true" />
    <div class="insights-header">
      <h3 class="title">{{ t('Insights') }}</h3>
      <span class="period">{{ periodLabel || t('This Period') }}</span>
    </div>

    <div class="insights-content">
      <div class="insight-stat">
        <div class="stat-icon income">
          <TrendingUp :size="18" />
        </div>
        <div class="stat-info">
          <span class="stat-label">{{ t('Top Income') }}</span>
          <span class="stat-value">{{ topIncome?.party || t('N/A') }}</span>
          <span v-if="topIncome" class="stat-amount income">
            {{ formatAmount(topIncome.amount) }}
          </span>
        </div>
      </div>

      <div class="divider" />

      <div class="insight-stat">
        <div class="stat-icon expense">
          <TrendingDown :size="18" />
        </div>
        <div class="stat-info">
          <span class="stat-label">{{ t('Top Expense') }}</span>
          <span class="stat-value">{{ topExpense?.party || t('N/A') }}</span>
          <span v-if="topExpense" class="stat-amount expense">
            {{ formatAmount(topExpense.amount) }}
          </span>
        </div>
      </div>

      <div class="divider" />

      <div class="insight-stat">
        <div class="stat-icon" :class="savingsClass">
          <Percent :size="18" />
        </div>
        <div class="stat-info">
          <span class="stat-label">{{ t('Savings Rate') }}</span>
          <span class="stat-value large" :class="savingsClass">{{ resolvedSavingsRate }}%</span>
        </div>
      </div>

      <div class="divider" />

      <div class="insight-stat">
        <div class="stat-icon" :class="riskClass">
          <Shield :size="18" />
        </div>
        <div class="stat-info">
          <span class="stat-label">{{ t('Risk Level') }}</span>
          <span class="stat-value" :class="riskClass">{{ displayRiskLevel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { TrendingUp, TrendingDown, Percent, Shield, Lightbulb } from 'lucide-vue-next';
import { formatShortAmount } from '../../utils/currency';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  topIncome: {
    type: Object,
    default: null
  },
  topExpense: {
    type: Object,
    default: null
  },
  savingsRate: {
    type: Number,
    default: 0
  },
  riskLevel: {
    type: String,
    default: 'low'
  },
  periodLabel: {
    type: String,
    default: ''
  },
  currency: {
    type: String,
    default: 'USD'
  }
});

const resolvedSavingsRate = computed(() => {
  return Math.round(Number(props.savingsRate ?? 0));
});

const savingsClass = computed(() => {
  const rate = resolvedSavingsRate.value;
  if (rate >= 20) return 'good';
  if (rate >= 10) return 'moderate';
  return 'low';
});

const displayRiskLevel = computed(() => {
  const level = String(props.riskLevel || '').toLowerCase();
  if (level === 'low') return t('Low');
  if (level === 'medium') return t('Medium');
  if (level === 'high') return t('High');
  return t('Unknown');
});

const riskClass = computed(() => {
  const level = String(props.riskLevel || '').toLowerCase();
  if (level === 'low') return 'good';
  if (level === 'medium') return 'moderate';
  return 'low';
});

const formatAmount = (value) => {
  return formatShortAmount(`${value || 0} ${props.currency}`);
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.quick-insights {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(120% 120% at 100% 0%, rgba(var(--color-warning-rgb), 0.06), transparent 58%),
    $bg-white;
  border-radius: 16px;
  box-shadow: $elevation-1;
  border: 1px solid $border-light;
  padding: $spacing-4;

  > *:not(.card-glyph) {
    position: relative;
  }
}

.card-glyph {
  position: absolute;
  right: -18px;
  bottom: -18px;
  color: $warning;
  opacity: 0.06;
  pointer-events: none;
}

.insights-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-3;
}

.title {
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
}

.period {
  font-size: $font-size-xs;
  color: $text-muted;
}

.insights-content {
  display: flex;
  align-items: stretch;
  gap: $spacing-4;

  @media (max-width: $breakpoint-md) {
    flex-wrap: wrap;
  }

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-3;
  }
}

.insight-stat {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: $spacing-3;
  min-width: 0;

  @media (max-width: $breakpoint-md) {
    flex: 1 1 calc(50% - $spacing-4);
  }

  @media (max-width: $breakpoint-sm) {
    flex: 1 1 100%;
  }
}

.divider {
  width: 1px;
  background: $border-color;
  align-self: stretch;

  @media (max-width: $breakpoint-sm) {
    width: 100%;
    height: 1px;
  }
}

.stat-icon {
  width: 36px;
  height: 36px;
  border-radius: $radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &.income {
    background: rgba(var(--color-success-rgb), 0.12);
    color: $success;
  }

  &.expense {
    background: rgba(var(--color-error-rgb), 0.12);
    color: $error-color;
  }

  &.good {
    background: rgba(var(--color-primary-rgb), 0.12);
    color: $primary;
  }

  &.moderate {
    background: rgba(var(--color-warning-rgb), 0.15);
    color: var(--color-warning-text, $warning);
  }

  &.low {
    background: rgba(var(--color-error-rgb), 0.12);
    color: $error-color;
  }
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.stat-label {
  font-size: $font-size-xs;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.stat-value {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: $text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.large {
    font-size: $font-size-lg;
  }

  &.good {
    color: $primary;
  }

  &.moderate {
    color: var(--color-warning-text, $warning);
  }

  &.low {
    color: $error-color;
  }
}

.stat-amount {
  font-size: $font-size-xs;
  font-weight: $font-medium;
  font-variant-numeric: tabular-nums;

  &.income {
    color: $success;
  }

  &.expense {
    color: $error-color;
  }
}
</style>
