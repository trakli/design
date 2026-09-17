<template>
  <section class="card">
    <header class="card-head">
      <div>
        <h2 class="card-title">{{ title }}</h2>
        <p v-if="subtitle" class="card-sub">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions" />
      </div>
    </header>

    <div v-if="!buckets || buckets.length === 0" class="empty">
      <Inbox :size="32" />
      <p>{{ t('No spending in this period') }}</p>
    </div>

    <ol v-else class="rank-list">
      <li
        v-for="(b, i) in buckets"
        :key="b.name"
        class="row"
        :class="{ 'row--top': i === 0 }"
        @click="$emit('drill', b)"
      >
        <span class="rank-no">{{ i + 1 }}</span>
        <span class="swatch" :style="{ background: b.color || '#3b82f6' }" />
        <div class="row-main">
          <div class="row-head">
            <span class="row-name">{{ b.name }}</span>
            <span class="row-amount">{{ format(b.amount) }}</span>
          </div>
          <div class="row-bar">
            <span
              class="row-fill"
              :style="{
                width: `${Math.min(100, (b.amount / maxAmount) * 100)}%`,
                background: b.color || '#3b82f6'
              }"
            />
          </div>
          <div class="row-meta">
            <span class="meta-chip">{{ (b.percentage ?? 0).toFixed(1) }}%</span>
            <span v-if="b.count !== undefined" class="meta-chip meta-chip--ghost">
              {{ t('{n} tx', { n: b.count }) }}
            </span>
            <span
              v-if="showDelta && b.prevAmount > 0"
              class="meta-delta"
              :class="b.delta < 0 ? 'is-good' : b.delta > 0 ? 'is-bad' : 'is-flat'"
            >
              <component
                :is="b.delta > 0 ? ArrowUpRight : b.delta < 0 ? ArrowDownRight : Minus"
                :size="12"
              />
              <span>{{ b.delta > 0 ? '+' : '' }}{{ b.delta }}%</span>
            </span>
          </div>
        </div>
        <div class="row-spark">
          <SparkLine
            v-if="b.trend && b.trend.length"
            :values="b.trend"
            :color="b.color || '#3b82f6'"
            :height="32"
          />
        </div>
        <ChevronRight class="row-chevron" :size="16" />
      </li>
    </ol>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { ArrowUpRight, ArrowDownRight, Minus, ChevronRight, Inbox } from 'lucide-vue-next';
import SparkLine from './SparkLine.vue';
import { formatShortAmount } from '../../utils/currency';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k, params) => {
  if (params?.n !== undefined) return `${params.n} tx`;
  return k;
});

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  buckets: {
    type: Array,
    default: () => []
  },
  showDelta: {
    type: Boolean,
    default: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  formatter: {
    type: Function,
    default: null
  }
});

defineEmits(['drill']);

const maxAmount = computed(() => {
  const amounts = (props.buckets || []).map((b) => Number(b.amount || 0));
  return Math.max(1, ...amounts);
});

const format = (amt) => {
  if (props.formatter) return props.formatter(amt, props.currency);
  return formatShortAmount(`${amt ?? 0} ${props.currency}`);
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.card {
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: 14px;
  box-shadow: $elevation-1;
  padding: $spacing-4;
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
  width: 100%;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: $spacing-3;
  flex-wrap: wrap;
}

.card-title {
  font-size: $font-size-lg;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
}

.card-sub {
  font-size: $font-size-xs;
  color: $text-muted;
  margin: 2px 0 0;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-8 $spacing-4;
  color: $text-muted;

  p {
    margin: 0;
    font-size: $font-size-sm;
  }
}

.rank-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.row {
  display: grid;
  grid-template-columns: 24px 12px 1fr 90px 16px;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-3;
  border-radius: 12px;
  cursor: pointer;
  transition: all $duration-fast $easing-standard;
  border: 1px solid transparent;

  &:hover {
    background: $bg-light;
    border-color: $border-color;

    .row-chevron {
      transform: translateX(2px);
      color: $primary;
    }
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 20px 12px 1fr 16px;

    .row-spark {
      display: none;
    }
  }
}

.rank-no {
  font-size: $font-size-xs;
  color: $text-muted;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.row--top .rank-no {
  color: $primary;
  font-weight: $font-bold;
}

.swatch {
  width: 8px;
  height: 36px;
  border-radius: 4px;
}

.row-main {
  min-width: 0;
}

.row-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-2;
}

.row-name {
  font-weight: $font-semibold;
  color: $text-primary;
  font-size: $font-size-sm;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-amount {
  font-weight: $font-bold;
  font-variant-numeric: tabular-nums;
  color: $text-primary;
  font-size: $font-size-sm;
}

.row-bar {
  height: 6px;
  background: $bg-light;
  border-radius: 4px;
  margin-top: 6px;
  overflow: hidden;
}

.row-fill {
  display: block;
  height: 100%;
  border-radius: 4px;
  transition: width $duration-slow $easing-standard;
}

.row-meta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.meta-chip {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 999px;
  background: $bg-light;
  color: $text-secondary;
  font-variant-numeric: tabular-nums;

  &--ghost {
    background: transparent;
    color: $text-muted;
    padding: 1px 0;
  }
}

.meta-delta {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 999px;
  font-variant-numeric: tabular-nums;
  font-weight: $font-semibold;

  &.is-good {
    background: var(--color-income-soft, rgba(16, 185, 129, 0.15));
    color: var(--color-income, #10b981);
  }

  &.is-bad {
    background: var(--color-expense-soft, rgba(239, 68, 68, 0.15));
    color: var(--color-expense, #ef4444);
  }

  &.is-flat {
    background: $bg-light;
    color: $text-muted;
  }
}

.row-spark {
  height: 32px;
  width: 90px;
}

.row-chevron {
  color: $text-muted;
  transition: transform $duration-fast $easing-standard;
}
</style>
