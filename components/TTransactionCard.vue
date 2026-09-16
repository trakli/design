<template>
  <div class="stats-section">
    <div class="kpis">
      <slot name="kpis">
        <KpiCard
          :label="t('Total Transactions')"
          :value="statistics?.transaction_count ?? 0"
        />
        <KpiCard
          :label="t('Total Income')"
          :value="formatAmount(statistics?.total_income ?? 0)"
          value-class="is-positive"
        />
        <KpiCard
          :label="t('Total Expenses')"
          :value="formatAmount(statistics?.total_expenses ?? 0)"
          value-class="is-negative"
        />
        <KpiCard
          :label="t('Net Balance')"
          :value="formatAmount(statistics?.total_balance ?? 0)"
          :value-class="(statistics?.total_balance ?? 0) >= 0 ? 'is-positive' : 'is-negative'"
        />
      </slot>
    </div>

    <div v-if="hasInsights" class="quick-insights">
      <div v-if="statistics?.income_insights?.biggest_source" class="insight-item income-insight">
        <div class="insight-left">
          <div class="insight-icon income-icon">
            <ArrowDownLeft :size="16" />
          </div>
          <span class="insight-label">{{ t('Top Income Source') }}</span>
        </div>
        <div class="insight-chips">
          <div class="insight-chip name-chip income-chip">
            {{ statistics.income_insights.biggest_source.party }}
          </div>
          <div class="insight-chip amount-chip income-amount-chip">
            {{ formatAmount(statistics.income_insights.biggest_source.amount) }}
          </div>
        </div>
      </div>

      <div
        v-if="statistics?.expense_insights?.biggest_expense"
        class="insight-item expense-insight"
      >
        <div class="insight-left">
          <div class="insight-icon expense-icon">
            <ArrowUpRight :size="16" />
          </div>
          <span class="insight-label">{{ t('Biggest Expense') }}</span>
        </div>
        <div class="insight-chips">
          <div class="insight-chip name-chip expense-chip">
            {{ statistics.expense_insights.biggest_expense.party }}
          </div>
          <div class="insight-chip amount-chip expense-amount-chip">
            {{ formatAmount(statistics.expense_insights.biggest_expense.amount) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next';
import KpiCard from './reports/KpiCard.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  statistics: {
    type: Object,
    default: () => ({})
  },
  currency: {
    type: String,
    default: 'USD'
  },
  formatCurrency: {
    type: Function,
    default: null
  }
});

const formatAmount = (val) => {
  if (props.formatCurrency) {
    return props.formatCurrency(val, props.currency);
  }
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: props.currency,
      notation: 'compact'
    }).format(val);
  } catch {
    return `${val} ${props.currency}`;
  }
};

const hasInsights = computed(() => {
  return (
    !!props.statistics?.income_insights?.biggest_source ||
    !!props.statistics?.expense_insights?.biggest_expense
  );
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.stats-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 140px;
}

.kpis {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-2;
  margin-bottom: $spacing-2;
  flex: 1;

  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.quick-insights {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-2;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.insight-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-lg;
  box-shadow: $elevation-1;
  gap: $spacing-2;
}

.insight-left {
  display: flex;
  align-items: center;
  gap: $spacing-2;
}

.insight-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.income-icon {
    background: $primary-light;
    color: $primary;
  }

  &.expense-icon {
    background: rgba(var(--color-error-rgb), 0.12);
    color: $error-color;
  }
}

.insight-label {
  font-size: $font-size-xs;
  font-weight: $font-medium;
  color: $text-secondary;
}

.insight-chips {
  display: flex;
  align-items: center;
  gap: 4px;
}

.insight-chip {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: $font-semibold;

  &.name-chip {
    background: $bg-light;
    color: $text-primary;
  }

  &.income-amount-chip {
    background: $primary-light;
    color: $primary;
  }

  &.expense-amount-chip {
    background: rgba(var(--color-error-rgb), 0.12);
    color: $error-color;
  }
}
</style>
