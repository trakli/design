<template>
  <div class="category-breakdown">
    <PieChart class="card-glyph" :size="128" :stroke-width="1" aria-hidden="true" />
    <div class="header">
      <h3 class="title">{{ t('Spending Overview') }}</h3>
      <div class="chart-tabs">
        <button
          v-for="tab in chartTabs"
          :key="tab.id"
          type="button"
          class="tab-btn"
          :class="{ active: activeChart === tab.id }"
          :aria-label="tab.label"
          @click="activeChart = tab.id"
        >
          <component :is="tab.icon" :size="16" />
        </button>
      </div>
    </div>

    <div v-if="!hasData" class="empty-state">
      <p>{{ t('No expense data available') }}</p>
    </div>

    <div v-else class="chart-section">
      <!-- Pie/Donut Chart -->
      <div v-if="activeChart === 'pie'" class="chart-container">
        <div class="donut-wrapper">
          <div class="donut" :style="{ background: gradient }" />
          <div class="donut-center">
            <span class="center-label">{{ t('Total') }}</span>
            <span class="center-value">{{ formattedTotal }}</span>
          </div>
        </div>
        <div class="chart-legend">
          <div
            v-for="(item, index) in topCategories"
            :key="index"
            class="legend-item"
            @click="$emit('select-category', item)"
          >
            <span class="legend-dot" :style="{ background: item.color }" />
            <span class="legend-name">{{ item.name }}</span>
            <span class="legend-percent">{{ formatPercent(item.value) }}%</span>
          </div>
        </div>
      </div>

      <!-- Vertical Bar Chart -->
      <div v-else-if="activeChart === 'bar'" class="chart-container bar-container">
        <div class="bar-chart">
          <div
            v-for="(item, index) in topCategories"
            :key="index"
            class="bar-column"
            @click="$emit('select-category', item)"
          >
            <div class="bar-value">{{ formatPercent(item.value) }}%</div>
            <div class="bar-track">
              <div
                class="bar-fill"
                :style="{ height: getBarHeight(item.value), background: item.color }"
              />
            </div>
            <div class="bar-label">{{ truncateName(item.name) }}</div>
          </div>
        </div>
      </div>

      <!-- Line Chart -->
      <div v-else-if="activeChart === 'line'" class="chart-container line-container">
        <svg class="line-chart" viewBox="0 0 280 160" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient
              v-for="(cat, idx) in topCategories"
              :id="'cb-gradient-' + idx"
              :key="'grad-' + idx"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" :style="`stop-color: ${cat.color}; stop-opacity: 0.3`" />
              <stop offset="100%" :style="`stop-color: ${cat.color}; stop-opacity: 0.05`" />
            </linearGradient>
          </defs>
          <!-- Grid lines -->
          <line x1="30" y1="20" x2="30" y2="130" class="grid-line" stroke-width="1" />
          <line x1="30" y1="130" x2="270" y2="130" class="grid-line" stroke-width="1" />
          <line
            x1="30"
            y1="75"
            x2="270"
            y2="75"
            class="grid-line"
            stroke-width="1"
            stroke-dasharray="4"
          />
          <!-- Lines for each category -->
          <path
            v-for="(cat, idx) in topCategories"
            :key="'line-' + idx"
            :d="getCategoryLinePath(idx)"
            fill="none"
            :stroke="cat.color"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <!-- Data points -->
          <circle
            v-for="(point, idx) in allDataPoints"
            :key="'point-' + idx"
            :cx="point.x"
            :cy="point.y"
            r="3"
            :fill="point.color"
          />
        </svg>
        <div class="line-legend">
          <div
            v-for="(cat, idx) in topCategories"
            :key="idx"
            class="line-legend-item"
            @click="$emit('select-category', cat)"
          >
            <span class="legend-dot" :style="{ background: cat.color }" />
            <span class="legend-text">{{ truncateName(cat.name, 10) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, markRaw } from 'vue';
import { PieChart, BarChart3, TrendingUp } from 'lucide-vue-next';
import { formatShortAmount } from '../../utils/currency';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const COLORS = [
  '#3b82f6', // Blue
  '#f59e0b', // Amber
  '#10b981', // Green
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#f97316' // Orange
];

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  currency: {
    type: String,
    default: 'USD'
  },
  initialChart: {
    type: String,
    default: 'pie'
  }
});

defineEmits(['select-category']);

const activeChart = ref(props.initialChart);

const chartTabs = [
  { id: 'pie', label: 'Pie chart', icon: markRaw(PieChart) },
  { id: 'bar', label: 'Bar chart', icon: markRaw(BarChart3) },
  { id: 'line', label: 'Line chart', icon: markRaw(TrendingUp) }
];

const topCategories = computed(() => {
  const list = props.categories || [];
  return list.slice(0, 5).map((cat, index) => ({
    name: cat.category || cat.name || 'Unknown',
    value: Number(cat.amount ?? cat.value ?? 0),
    color: cat.color || COLORS[index % COLORS.length]
  }));
});

const hasData = computed(() => topCategories.value.length > 0 && totalExpenses.value > 0);

const totalExpenses = computed(() => {
  return topCategories.value.reduce((sum, cat) => sum + cat.value, 0);
});

const formattedTotal = computed(() => {
  return formatShortAmount(`${totalExpenses.value} ${props.currency}`);
});

const gradient = computed(() => {
  if (!hasData.value) return 'var(--color-border)';

  const total = totalExpenses.value || 1;
  let current = 0;
  const stops = topCategories.value.map((cat) => {
    const start = (current / total) * 360;
    current += cat.value;
    const end = (current / total) * 360;
    return `${cat.color} ${start}deg ${end}deg`;
  });

  if (current < total) {
    stops.push(`var(--color-border) ${(current / total) * 360}deg 360deg`);
  }

  return `conic-gradient(${stops.join(', ')})`;
});

const formatPercent = (value) => {
  const total = totalExpenses.value || 1;
  return ((value / total) * 100).toFixed(0);
};

const getBarHeight = (value) => {
  const maxValue = topCategories.value[0]?.value || 1;
  return `${(value / maxValue) * 100}%`;
};

const truncateName = (name, max = 8) => {
  if (!name) return '';
  return name.length > max ? name.slice(0, max) + '…' : name;
};

const generateCategoryPoints = (categoryIndex) => {
  const cat = topCategories.value[categoryIndex];
  if (!cat) return [];

  const baseValue = cat.value;
  const numPoints = 5;
  const width = 240;
  const height = 110;
  const startX = 30;
  const startY = 20;

  const maxVal = topCategories.value[0]?.value || 1;
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const variation = 0.7 + Math.sin(categoryIndex + i * 1.5) * 0.3;
    const value = baseValue * variation;
    const x = startX + (i * width) / (numPoints - 1);
    const y = startY + height - (value / maxVal) * height;
    points.push({ x, y, color: cat.color });
  }

  return points;
};

const getCategoryLinePath = (categoryIndex) => {
  const points = generateCategoryPoints(categoryIndex);
  if (points.length === 0) return '';
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
};

const allDataPoints = computed(() => {
  const points = [];
  topCategories.value.forEach((_, idx) => {
    points.push(...generateCategoryPoints(idx));
  });
  return points;
});
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.category-breakdown {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(120% 100% at 100% 0%, rgba(var(--color-primary-rgb), 0.05), transparent 58%),
    $bg-white;
  border-radius: 16px;
  box-shadow: $elevation-1;
  border: 1px solid $border-light;
  padding: $spacing-4;
  min-height: 320px;
  display: flex;
  flex-direction: column;

  > *:not(.card-glyph) {
    position: relative;
  }
}

.card-glyph {
  position: absolute;
  right: -18px;
  bottom: -18px;
  color: $primary;
  opacity: 0.05;
  pointer-events: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-3;
  flex-shrink: 0;
}

.title {
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
}

.chart-tabs {
  display: flex;
  gap: $spacing-1;
  background: $bg-light;
  padding: 3px;
  border-radius: $radius-md;
}

.tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: $radius-sm;
  cursor: pointer;
  color: $text-muted;
  transition: all $duration-fast $easing-standard;

  &:hover {
    color: $text-primary;
  }

  &.active {
    background: $bg-white;
    color: $primary;
    box-shadow: $shadow-sm;
  }
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-muted;
  font-size: $font-size-sm;
}

.chart-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-4;
}

.donut-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
}

.donut {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 28%;
    background: $bg-white;
    border-radius: 50%;
  }
}

.donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.center-label {
  font-size: $font-size-xs;
  color: $text-muted;
}

.center-value {
  font-size: $font-size-base;
  font-weight: $font-bold;
  color: $text-primary;
  font-variant-numeric: tabular-nums;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  min-width: 120px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: $spacing-2;
  cursor: pointer;
  border-radius: $radius-sm;
  padding: 2px 4px;
  transition: background-color $duration-fast $easing-standard;

  &:hover {
    background-color: $bg-light;
  }
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: $radius-sm;
  flex-shrink: 0;
}

.legend-name {
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $text-primary;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

.legend-percent {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: $text-primary;
  font-variant-numeric: tabular-nums;
}

.bar-container {
  flex-direction: column;
  padding: $spacing-2 0;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: $spacing-4;
  height: 180px;
  width: 100%;
}

.bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-1;
  flex: 1;
  max-width: 50px;
  cursor: pointer;
}

.bar-value {
  font-size: $font-size-xs;
  font-weight: $font-semibold;
  color: $text-primary;
  font-variant-numeric: tabular-nums;
}

.bar-track {
  width: 100%;
  height: 120px;
  background: $bg-light;
  border-radius: $radius-md;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.bar-fill {
  width: 100%;
  border-radius: $radius-md;
  transition: height 0.3s ease;
}

.bar-label {
  font-size: $font-size-xs;
  font-weight: $font-medium;
  color: $text-primary;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.line-container {
  flex-direction: column;
  gap: $spacing-2;
}

.line-chart {
  width: 100%;
  max-width: 280px;
  height: auto;
}

.line-legend {
  display: flex;
  justify-content: center;
  gap: $spacing-3;
  flex-wrap: wrap;
  margin-top: $spacing-2;
}

.line-legend-item {
  display: flex;
  align-items: center;
  gap: $spacing-1;
  cursor: pointer;
}

.legend-text {
  font-size: $font-size-xs;
  font-weight: $font-medium;
  color: $text-primary;
}

.grid-line {
  stroke: $border-color;
}
</style>
