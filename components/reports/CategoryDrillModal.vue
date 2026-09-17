<template>
  <Transition name="modal">
    <div v-if="open" class="modal-root" @click.self="$emit('close')">
      <div class="modal-panel" role="dialog" aria-modal="true">
        <header class="modal-head">
          <div class="head-id">
            <span class="head-swatch" :style="{ background: bucket?.color || '#3b82f6' }" />
            <div>
              <h2 class="head-title">{{ bucket?.name || t('Category') }}</h2>
              <p class="head-sub">
                {{ t('Period overview · {n} transactions', { n: bucket?.count ?? 0 }) }}
              </p>
            </div>
          </div>
          <TButton
            variant="text"
            size="small"
            :full-width="false"
            class="close-btn"
            :aria-label="t('Close')"
            @click="$emit('close')"
          >
            <X :size="18" />
          </TButton>
        </header>

        <section class="kpi-row">
          <div class="kpi">
            <span class="kpi-label">{{ t('Total') }}</span>
            <span class="kpi-value">{{ formatAmount(bucket?.amount) }}</span>
          </div>
          <div class="kpi">
            <span class="kpi-label">{{ t('Avg / month') }}</span>
            <span class="kpi-value">{{ formatAmount(avgPerMonth) }}</span>
          </div>
          <div class="kpi">
            <span class="kpi-label">{{ t('Peak month') }}</span>
            <span class="kpi-value">{{ peakMonthLabel || '—' }}</span>
          </div>
          <div class="kpi">
            <span class="kpi-label">{{ t('vs prior period') }}</span>
            <span
              class="kpi-value"
              :class="bucket?.delta < 0 ? 'is-good' : bucket?.delta > 0 ? 'is-bad' : ''"
            >
              {{ bucket?.delta > 0 ? '+' : '' }}{{ bucket?.delta ?? 0 }}%
            </span>
          </div>
        </section>

        <section v-if="bucket?.trend && bucket.trend.length" class="trend-block">
          <h3 class="block-title">{{ t('Trend (last 6 months)') }}</h3>
          <div class="trend-bars">
            <div v-for="(v, i) in bucket.trend" :key="i" class="trend-bar-wrap">
              <span
                class="trend-bar"
                :style="{
                  height: `${Math.max(2, (v / trendMax) * 100)}%`,
                  background: bucket?.color || '#3b82f6'
                }"
              />
              <span class="trend-bar-label">{{ monthLabels[i] || '' }}</span>
            </div>
          </div>
        </section>

        <section class="block">
          <h3 class="block-title">
            {{ t('Top {kind}', { kind: bucket?.kind === 'income' ? t('sources') : t('payees') }) }}
          </h3>
          <ul v-if="topParties.length" class="party-list">
            <li v-for="p in topParties" :key="p.name" class="party-row">
              <span class="party-name">{{ p.name }}</span>
              <span class="party-bar-wrap">
                <span
                  class="party-bar"
                  :style="{
                    width: `${(p.amount / topParties[0].amount) * 100}%`,
                    background: bucket?.color || '#3b82f6'
                  }"
                />
              </span>
              <span class="party-amt">{{ formatAmount(p.amount) }}</span>
            </li>
          </ul>
          <p v-else class="empty">{{ t('No transactions match.') }}</p>
        </section>

        <section class="block">
          <h3 class="block-title">{{ t('Transactions') }}</h3>
          <div v-if="visibleTxs.length" class="tx-list">
            <article v-for="tx in visibleTxs" :key="tx.id" class="tx">
              <div class="tx-main">
                <span class="tx-party">{{ tx.party || tx.description || t('Unknown') }}</span>
                <span class="tx-date">{{ formatDate(tx.date) }}</span>
              </div>
              <span class="tx-amount" :class="isIncome(tx) ? 'is-in' : 'is-out'">
                {{ isIncome(tx) ? '+' : '-' }}{{ formatAmount(tx.amount) }}
              </span>
            </article>
          </div>
          <p v-else class="empty">{{ t('No transactions match.') }}</p>
          <TButton
            v-if="filteredTxs.length > visibleCount"
            variant="text"
            size="small"
            :full-width="false"
            class="more-btn"
            @click="visibleCount += 10"
          >
            {{ t('Show {n} more', { n: Math.min(10, filteredTxs.length - visibleCount) }) }}
          </TButton>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { X } from 'lucide-vue-next';
import { formatShortAmount } from '../../utils/currency';
import TButton from '../TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k, params) => {
  if (params) {
    return Object.entries(params).reduce(
      (str, [key, val]) => str.replace(new RegExp('\\{' + key + '\\}', 'g'), val),
      k
    );
  }
  return k;
});
const locale = i18n?.locale || ref('en');

const props = defineProps({
  open: { type: Boolean, default: false },
  bucket: { type: Object, default: null },
  transactions: { type: Array, default: () => [] },
  range: { type: Object, default: null }, // { start: Date, end: Date }
  trailingMonths: { type: Array, default: () => [] }, // [{ month: 'YYYY-MM' }]
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: null }
});

defineEmits(['close']);

const visibleCount = ref(10);

watch(
  () => props.open,
  (o) => {
    if (o) visibleCount.value = 10;
  }
);

const isIncome = (tx) => {
  const type = String(tx?.type || '').toUpperCase();
  return type === 'INCOME' || type === 'CREDIT';
};

const formatAmount = (val) => {
  if (props.formatter) return props.formatter(val, props.currency);
  return formatShortAmount(`${val ?? 0} ${props.currency}`);
};

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(String(iso).includes('T') ? iso : `${iso}T00:00:00`);
  try {
    return new Intl.DateTimeFormat(locale.value || 'en', {
      month: 'short',
      day: 'numeric'
    }).format(d);
  } catch {
    return iso;
  }
};

const filteredTxs = computed(() => {
  if (!props.bucket) return [];
  const wantedType = props.bucket.kind === 'income' ? 'INCOME' : 'EXPENSE';
  return (props.transactions || [])
    .filter((tx) => {
      if (tx.isTransfer) return false;
      const type = String(tx.type || '').toUpperCase();
      if (type !== wantedType) return false;
      if (props.bucket.name && (tx.category || 'Uncategorized') !== props.bucket.name) return false;
      if (props.range?.start && props.range?.end) {
        const d = new Date(String(tx.date).includes('T') ? tx.date : `${tx.date}T00:00:00`);
        return d >= props.range.start && d <= props.range.end;
      }
      return true;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

const visibleTxs = computed(() => filteredTxs.value.slice(0, visibleCount.value));

const trendMax = computed(() => {
  const trend = props.bucket?.trend || [];
  return Math.max(1, ...trend);
});

const avgPerMonth = computed(() => {
  const trend = props.bucket?.trend || [];
  if (!trend.length) return props.bucket?.amount || 0;
  const sum = trend.reduce((acc, v) => acc + Number(v || 0), 0);
  return sum / trend.length;
});

const monthLabels = computed(() => {
  return (props.trailingMonths || []).map((m) => {
    if (!m?.month) return '';
    const parts = m.month.split('-');
    return parts[1] || m.month;
  });
});

const peakMonthLabel = computed(() => {
  const trend = props.bucket?.trend || [];
  if (!trend.length) return '';
  let maxIdx = 0;
  let maxVal = -Infinity;
  trend.forEach((v, i) => {
    if (v > maxVal) {
      maxVal = v;
      maxIdx = i;
    }
  });
  return monthLabels.value[maxIdx] || '';
});

const topParties = computed(() => {
  const map = new Map();
  filteredTxs.value.forEach((tx) => {
    const name = tx.party || tx.description || 'Unknown';
    map.set(name, (map.get(name) || 0) + Number(tx.amount || 0));
  });
  return Array.from(map.entries())
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
});
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.modal-root {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  z-index: $z-index-modal;
  padding: $spacing-4;
}

.modal-panel {
  background: $bg-white;
  border-radius: 16px;
  width: 100%;
  max-width: 580px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: $elevation-3;
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
  padding: $spacing-5;
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.head-id {
  display: flex;
  align-items: center;
  gap: $spacing-3;
}

.head-swatch {
  width: 12px;
  height: 38px;
  border-radius: 6px;
}

.head-title {
  margin: 0;
  font-size: $font-size-xl;
  font-weight: $font-bold;
  color: $text-primary;
}

.head-sub {
  margin: 2px 0 0;
  font-size: $font-size-xs;
  color: $text-muted;
}

.close-btn {
  border: none;
  background: transparent;
  color: $text-muted;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  display: inline-flex;
  transition: all $duration-fast $easing-standard;

  &:hover {
    background: $bg-light;
    color: $text-primary;
  }
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-2;
  background: $bg-light;
  padding: $spacing-3;
  border-radius: 12px;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.kpi {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.kpi-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: $text-muted;
  font-weight: $font-semibold;
}

.kpi-value {
  font-size: $font-size-sm;
  font-weight: $font-bold;
  color: $text-primary;
  font-variant-numeric: tabular-nums;

  &.is-good {
    color: var(--color-income, #10b981);
  }
  &.is-bad {
    color: var(--color-expense, #ef4444);
  }
}

.block-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: $font-semibold;
  color: $text-muted;
  margin: 0 0 $spacing-2;
}

.trend-bars {
  display: flex;
  align-items: flex-end;
  gap: $spacing-3;
  height: 80px;
  padding-top: $spacing-2;
}

.trend-bar-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 100%;
  justify-content: flex-end;
}

.trend-bar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: height $duration-base $easing-standard;
}

.trend-bar-label {
  font-size: 10px;
  color: $text-muted;
}

.party-list,
.tx-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  margin: 0;
  padding: 0;
  list-style: none;
}

.party-row {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  font-size: $font-size-xs;
}

.party-name {
  width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: $text-secondary;
}

.party-bar-wrap {
  flex: 1;
  height: 6px;
  background: $bg-light;
  border-radius: 3px;
  overflow: hidden;
}

.party-bar {
  display: block;
  height: 100%;
  border-radius: 3px;
}

.party-amt {
  font-weight: $font-semibold;
  color: $text-primary;
  font-variant-numeric: tabular-nums;
  width: 70px;
  text-align: right;
}

.tx {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-2;
  border-radius: 8px;
  background: $bg-light;
}

.tx-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tx-party {
  font-size: $font-size-xs;
  font-weight: $font-semibold;
  color: $text-primary;
}

.tx-date {
  font-size: 10px;
  color: $text-muted;
}

.tx-amount {
  font-size: $font-size-xs;
  font-weight: $font-bold;
  font-variant-numeric: tabular-nums;

  &.is-in {
    color: var(--color-income, #10b981);
  }
  &.is-out {
    color: var(--color-expense, #ef4444);
  }
}

.more-btn {
  margin-top: $spacing-2;
  width: 100%;
  padding: 6px;
  border: 1px dashed $border-color;
  border-radius: 8px;
  background: transparent;
  color: $text-secondary;
  font-size: $font-size-xs;
  font-weight: $font-medium;
  cursor: pointer;

  &:hover {
    background: $bg-light;
    border-color: $text-secondary;
  }
}

.empty {
  font-size: $font-size-xs;
  color: $text-muted;
  margin: $spacing-2 0;
}
</style>
