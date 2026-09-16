<template>
  <section class="hero surface surface--brand">
    <div class="hero-ambient" aria-hidden="true">
      <BarChart3 class="amb a1" :size="72" :stroke-width="1" />
      <Wallet class="amb a2" :size="64" :stroke-width="1" />
      <Coins class="amb a3" :size="56" :stroke-width="1" />
      <TrendingUp class="amb a4" :size="60" :stroke-width="1" />
      <PieChart class="amb a5" :size="52" :stroke-width="1" />
    </div>

    <div class="hero-body">
      <div class="hero-greeting">
        <h2 class="hero-title">{{ title || t('Overview') }}</h2>
        <p class="hero-sub">
          {{ subtitle || t('Showing {period}.', { period: currentPeriodLabel }) }}
        </p>
      </div>

      <div v-if="showFilters" class="hero-controls">
        <slot name="wallet-selector" />

        <div class="hero-chips">
          <TButton
            v-for="period in periodsList.slice(0, 3)"
            :key="period.value"
            type="button"
            :variant="currentPeriodValue === period.value && !isCustomActive ? 'primary' : 'secondary'"
            size="small"
            :full-width="false"
            class="hero-chip"
            @click="handlePresetClick(period.value)"
          >
            {{ t(period.label) }}
          </TButton>

          <TButton
            type="button"
            :variant="isCustomActive ? 'primary' : 'secondary'"
            size="small"
            :full-width="false"
            class="hero-chip hero-chip--custom"
            @click="toggleCustomPeriod"
          >
            <span>{{ t('Custom') }}</span>
            <template #right-icon>
              <ChevronDown
                :size="14"
                class="chip-icon"
                :class="{ 'chip-icon--rotated': showFilterModal }"
              />
            </template>
          </TButton>
        </div>
      </div>
    </div>

    <StatsFilterModal
      v-if="showFilterModal"
      :initial-filters="customFilters"
      :wallets="wallets"
      :current-period="currentPeriodValue"
      @close="showFilterModal = false"
      @apply="handleFiltersApply"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ChevronDown, BarChart3, Wallet, Coins, TrendingUp, PieChart } from 'lucide-vue-next';
import StatsFilterModal from './StatsFilterModal.vue';
import TButton from './TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((key, params) => {
  if (params?.period) return `Showing ${params.period}.`;
  return key;
});
const locale = i18n?.locale || ref('en');

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  showFilters: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: String,
    default: 'current_month'
  },
  periods: {
    type: Array,
    default: () => [
      { label: 'This Week', value: 'current_week' },
      { label: 'This Month', value: 'current_month' },
      { label: 'Last 3 months', value: 'last_3_months' },
      { label: 'This Year', value: 'current_year' }
    ]
  },
  wallets: {
    type: Array,
    default: () => []
  },
  customRange: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'apply-filters', 'change']);

const showFilterModal = ref(false);
const customFilters = ref(props.customRange);
const internalPeriod = ref(props.modelValue);

const currentPeriodValue = computed(() => props.modelValue || internalPeriod.value);
const periodsList = computed(() => props.periods || []);

const isCustomActive = computed(() => {
  return currentPeriodValue.value === 'custom' && customFilters.value !== null;
});

const currentPeriodLabel = computed(() => {
  if (isCustomActive.value && customFilters.value) {
    const start = customFilters.value.startDate;
    const end = customFilters.value.endDate;
    if (start && end) {
      return `${formatDate(start)} - ${formatDate(end)}`;
    }
  }
  const period = periodsList.value.find((p) => p.value === currentPeriodValue.value);
  return period ? t(period.label).toLowerCase() : t('this period');
});

const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(locale.value || 'en', { month: 'short', day: 'numeric' }).format(date);
  } catch {
    return dateStr;
  }
};

const toggleCustomPeriod = () => {
  showFilterModal.value = !showFilterModal.value;
};

const handlePresetClick = (periodValue) => {
  customFilters.value = null;
  internalPeriod.value = periodValue;
  emit('update:modelValue', periodValue);
  emit('change', periodValue);
};

const handleFiltersApply = (filters) => {
  customFilters.value = filters;
  internalPeriod.value = 'custom';
  emit('update:modelValue', 'custom');
  emit('apply-filters', filters);
  showFilterModal.value = false;
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.hero {
  position: relative;
  width: 100%;
  border-radius: 18px;
  padding: 1rem 1.25rem;
  overflow: hidden;
  background: var(--surface-brand, $bg-white);
  border: 1px solid $border-light;
  box-shadow: $elevation-1;
}

.hero-ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  .amb {
    position: absolute;
    color: var(--surface-deep, $primary);
    opacity: 0.07;
  }
  .a1 {
    top: -10px;
    right: 6%;
    transform: rotate(-10deg);
  }
  .a2 {
    bottom: -14px;
    right: 22%;
    transform: rotate(8deg);
  }
  .a3 {
    top: 20%;
    right: 38%;
    transform: rotate(10deg);
  }
  .a4 {
    bottom: -8px;
    left: 6%;
    transform: rotate(-8deg);
  }
  .a5 {
    top: -8px;
    left: 30%;
    transform: rotate(12deg);
  }
}

.hero-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-3;

  @media (min-width: $breakpoint-sm) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-3;
  }
}

.hero-greeting {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.hero-title {
  margin: 0;
  color: var(--surface-ink, $text-primary);
  font-size: $font-size-lg;
  font-weight: $font-bold;
  letter-spacing: -0.015em;
  line-height: 1.2;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-base;
  }
}

.hero-sub {
  margin: 0;
  color: var(--surface-ink, $text-secondary);
  opacity: 0.7;
  font-size: $font-size-sm;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-xs;
  }
}

.hero-controls {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  flex-wrap: wrap;

  @media (min-width: $breakpoint-sm) {
    justify-content: flex-end;
  }
}

.hero-chips {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  padding: 4px;
  background: var(--glass-bg, $bg-light);
  border: 1px solid $border-light;
  border-radius: 999px;
  backdrop-filter: blur(10px);
  box-shadow: $elevation-1;
  width: fit-content;
}

.hero-chip {
  border-radius: 999px;
  height: 30px;
  padding: 0 12px;
  font-size: $font-size-xs;
}

.chip-icon {
  margin-left: 2px;
  transition: transform $duration-fast $easing-standard;

  &--rotated {
    transform: rotate(180deg);
  }
}
</style>
