<template>
  <TPanel :padding="4" class="heatmap-card">
    <header class="card-head">
      <div>
        <h2 class="card-title">{{ t('Spending calendar') }}</h2>
        <p class="card-sub">
          {{ t('Each tile is a day. Darker = more spent.') }}
        </p>
      </div>
      <div class="legend">
        <span class="legend-label">{{ t('Less') }}</span>
        <span v-for="step in 5" :key="step" class="legend-cell" :style="legendStyle(step - 1)" />
        <span class="legend-label">{{ t('More') }}</span>
      </div>
    </header>

    <div class="months">
      <article v-for="month in monthGroups" :key="month.label" class="month">
        <h3 class="month-label">{{ month.label }}</h3>
        <div class="grid">
          <span v-for="dow in dayHeaders" :key="dow" class="dow">{{ dow }}</span>
          <span
            v-for="(slot, i) in month.slots"
            :key="`${month.label}-${i}`"
            class="cell"
            :class="{
              'cell--empty': slot.empty,
              'cell--zero': !slot.empty && slot.expense === 0,
              'cell--today': slot.isToday,
              'cell--hover': hoveredKey === slot.date
            }"
            :style="!slot.empty ? cellStyle(slot.expense) : null"
            :title="cellTitle(slot)"
            @mouseenter="hoveredKey = slot.date"
            @mouseleave="hoveredKey = null"
            @click="!slot.empty && slot.expense > 0 && $emit('select-day', slot)"
          >
            <span v-if="!slot.empty" class="cell-num">{{ slot.dayNum }}</span>
          </span>
        </div>
      </article>
    </div>

    <footer v-if="hoveredSlot && !hoveredSlot.empty" class="hover-meta">
      <span class="hover-date">{{ formatDate(hoveredSlot.date) }}</span>
      <span class="hover-amt">
        <ArrowDownLeft :size="12" class="ico-in" />
        {{ formatAmount(hoveredSlot.income) }}
      </span>
      <span class="hover-amt">
        <ArrowUpRight :size="12" class="ico-out" />
        {{ formatAmount(hoveredSlot.expense) }}
      </span>
      <span class="hover-amt hover-amt--net">
        {{ t('Net') }} {{ formatAmount(hoveredSlot.net) }}
      </span>
    </footer>
  </TPanel>
</template>

<script setup>
import { computed, ref } from 'vue';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next';
import { formatShortAmount } from '../../utils/currency';
import TPanel from '../TPanel.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);
const locale = i18n?.locale || ref('en');

const props = defineProps({
  buckets: { type: Array, default: () => [] }, // DailyBucket[]: { date: 'YYYY-MM-DD', income, expense, net }
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: null }
});

defineEmits(['select-day']);

const hoveredKey = ref(null);
const todayISO = new Date().toISOString().slice(0, 10);

const dayHeaders = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const monthGroups = computed(() => {
  if (!props.buckets || !props.buckets.length) return [];
  const groups = new Map();
  props.buckets.forEach((b) => {
    const monthKey = b.date ? b.date.slice(0, 7) : '';
    if (!monthKey) return;
    if (!groups.has(monthKey)) groups.set(monthKey, []);
    groups.get(monthKey).push(b);
  });

  return Array.from(groups.entries()).map(([key, days]) => {
    const first = new Date(key + '-01T00:00:00');
    const startDow = (first.getDay() + 6) % 7; // Monday=0
    const slots = [];
    for (let i = 0; i < startDow; i += 1) {
      slots.push({ empty: true });
    }
    days.forEach((d) => {
      const dt = new Date(String(d.date).includes('T') ? d.date : `${d.date}T00:00:00`);
      slots.push({
        ...d,
        empty: false,
        dayNum: dt.getDate(),
        isToday: d.date === todayISO
      });
    });
    return {
      label: new Intl.DateTimeFormat(locale.value || 'en', { month: 'long', year: 'numeric' }).format(first),
      slots
    };
  });
});

const max = computed(() => {
  const list = (props.buckets || []).map((b) => Number(b.expense || 0));
  return Math.max(1, ...list);
});

const intensity = (amount) => {
  if (!amount) return 0;
  const pct = amount / max.value;
  return Math.min(1, Math.log10(1 + pct * 9));
};

const cellStyle = (amount) => {
  const i = intensity(amount);
  return {
    background:
      i === 0
        ? 'var(--color-bg-light, #f8fafc)'
        : `color-mix(in oklab, var(--color-expense, #ef4444) ${Math.round(i * 65)}%, var(--color-bg-light, #f8fafc))`,
    color: i > 0.55 ? 'rgba(255,255,255,0.9)' : 'var(--color-text-muted, #94a3b8)'
  };
};

const legendStyle = (step) => {
  const i = step / 4;
  return {
    background:
      i === 0
        ? 'var(--color-bg-light, #f8fafc)'
        : `color-mix(in oklab, var(--color-expense, #ef4444) ${Math.round(i * 65)}%, var(--color-bg-light, #f8fafc))`
  };
};

const hoveredSlot = computed(() => {
  if (!hoveredKey.value) return null;
  return props.buckets.find((b) => b.date === hoveredKey.value) || null;
});

const formatAmount = (n) => {
  if (props.formatter) return props.formatter(n, props.currency);
  return formatShortAmount(`${n ?? 0} ${props.currency}`);
};

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(String(iso).includes('T') ? iso : `${iso}T00:00:00`);
  try {
    return new Intl.DateTimeFormat(locale.value || 'en', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(d);
  } catch {
    return iso;
  }
};

const cellTitle = (slot) => {
  if (slot.empty) return '';
  return `${slot.date} · ${formatAmount(slot.expense)}`;
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.heatmap-card {
  border-radius: 14px;
  box-shadow: $elevation-1;
  gap: $spacing-3;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: $spacing-3;
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

.legend {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &-label {
    font-size: 10px;
    color: $text-muted;
  }

  &-cell {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.04);
  }
}

.months {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: $spacing-3;
}

.month {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.month-label {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: $text-secondary;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
}

.dow {
  font-size: 10px;
  color: $text-muted;
  text-align: center;
  font-weight: $font-medium;
}

.cell {
  aspect-ratio: 1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: $font-medium;
  cursor: pointer;
  transition: transform $duration-fast $easing-standard;
  user-select: none;

  &--empty {
    background: transparent !important;
    cursor: default;
  }

  &--today {
    outline: 2px solid var(--color-primary, #047844);
    outline-offset: -1px;
  }

  &--hover {
    transform: scale(1.15);
    z-index: 2;
    box-shadow: $elevation-2;
  }
}

.hover-meta {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-2 $spacing-3;
  background: $bg-light;
  border-radius: 8px;
  font-size: $font-size-xs;
  margin-top: $spacing-1;
}

.hover-date {
  font-weight: $font-semibold;
  color: $text-primary;
}

.hover-amt {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-variant-numeric: tabular-nums;
  font-weight: $font-medium;

  &--net {
    margin-left: auto;
    font-weight: $font-semibold;
    color: $text-primary;
  }
}

.ico-in {
  color: var(--color-income, #10b981);
}

.ico-out {
  color: var(--color-expense, #ef4444);
}
</style>
