<template>
  <div class="transaction-filters">
    <div class="filters-panel">
      <TButton
        variant="text"
        size="small"
        :full-width="false"
        class="filters-close"
        :aria-label="t('Close')"
        @click="$emit('close')"
      >
        <XMarkIcon class="filters-close__icon" />
      </TButton>

      <div class="filters-row">
        <!-- Type filter -->
        <div class="filter-group filter-group--type">
          <label class="filter-label">{{ t('Type') }}</label>
          <div class="type-toggle">
            <TButton
              variant="text"
              size="small"
              :full-width="false"
              class="type-btn"
              :class="{ active: !localFilters.type }"
              @click="setType(undefined)"
            >
              {{ t('All') }}
            </TButton>
            <TButton
              variant="text"
              size="small"
              :full-width="false"
              class="type-btn type-btn--income"
              :class="{ active: localFilters.type === 'income' }"
              @click="setType('income')"
            >
              {{ t('Income') }}
            </TButton>
            <TButton
              variant="text"
              size="small"
              :full-width="false"
              class="type-btn type-btn--expense"
              :class="{ active: localFilters.type === 'expense' }"
              @click="setType('expense')"
            >
              {{ t('Expenses') }}
            </TButton>
          </div>
        </div>

        <!-- Date range -->
        <div class="filter-group filter-group--dates">
          <label class="filter-label">{{ t('Date Range') }}</label>
          <div class="date-inputs">
            <input
              type="date"
              :value="localFilters.date_from"
              :placeholder="t('Start date')"
              class="date-input"
              @input="
                localFilters.date_from = ($event.target).value || undefined;
                emitFilters();
              "
            />
            <span class="date-separator">-</span>
            <input
              type="date"
              :value="localFilters.date_to"
              :placeholder="t('End date')"
              class="date-input"
              @input="
                localFilters.date_to = ($event.target).value || undefined;
                emitFilters();
              "
            />
          </div>
          <div class="date-presets">
            <TButton
              variant="text"
              size="small"
              :full-width="false"
              class="preset-btn"
              @click="setDatePreset('this-month')"
            >
              {{ t('This Month') }}
            </TButton>
            <TButton
              variant="text"
              size="small"
              :full-width="false"
              class="preset-btn"
              @click="setDatePreset('last-3-months')"
            >
              {{ t('Last 3 months') }}
            </TButton>
            <TButton
              variant="text"
              size="small"
              :full-width="false"
              class="preset-btn"
              @click="setDatePreset('this-year')"
            >
              {{ t('This Year') }}
            </TButton>
            <TButton
              variant="text"
              size="small"
              :full-width="false"
              class="preset-btn"
              @click="setDatePreset('last-year')"
            >
              {{ t('Last Year') }}
            </TButton>
          </div>
        </div>
      </div>

      <div class="filters-row">
        <!-- Wallet filter -->
        <div class="filter-group">
          <label class="filter-label">{{ t('Wallets') }}</label>
          <SearchableDropdown
            :options="wallets"
            :model-value="localFilters.wallet_ids || []"
            :multiple="true"
            :placeholder="t('All Wallets')"
            option-label="name"
            option-key="id"
            @update:model-value="handleWalletChange"
          />
        </div>

        <!-- Category filter -->
        <div class="filter-group">
          <label class="filter-label">{{ t('Category') }}</label>
          <SearchableDropdown
            :options="categories"
            :model-value="localFilters.category_ids || []"
            :placeholder="t('All Categories')"
            :multiple="true"
            option-label="name"
            option-key="id"
            @update:model-value="handleCategoryChange"
          />
        </div>
      </div>

      <div class="filters-actions">
        <TButton
          :text="t('Reset')"
          variant="outline"
          size="small"
          :full-width="false"
          @click="reset"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import SearchableDropdown from '../SearchableDropdown.vue';
import TButton from '../TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  },
  wallets: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:filters', 'close']);

const localFilters = reactive({ ...props.filters });

function emitFilters() {
  emit('update:filters', { ...localFilters });
}

function setType(type) {
  localFilters.type = type;
  emitFilters();
}

// Format a Date as YYYY-MM-DD using local time so presets match the
// user's calendar view (avoids UTC drift from toISOString on timezones
// east of UTC near month/year boundaries).
function toLocalDateString(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function setDatePreset(preset) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  switch (preset) {
    case 'this-month': {
      localFilters.date_from = toLocalDateString(new Date(year, month, 1));
      localFilters.date_to = toLocalDateString(new Date(year, month + 1, 0));
      break;
    }
    case 'last-3-months': {
      localFilters.date_from = toLocalDateString(new Date(year, month - 2, 1));
      localFilters.date_to = toLocalDateString(now);
      break;
    }
    case 'this-year':
      localFilters.date_from = `${year}-01-01`;
      localFilters.date_to = `${year}-12-31`;
      break;
    case 'last-year':
      localFilters.date_from = `${year - 1}-01-01`;
      localFilters.date_to = `${year - 1}-12-31`;
      break;
  }
  emitFilters();
}

function extractIds(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === 'object' ? item.id : item));
}

function handleWalletChange(value) {
  localFilters.wallet_ids = extractIds(value);
  emitFilters();
}

function handleCategoryChange(value) {
  localFilters.category_ids = extractIds(value);
  emitFilters();
}

function reset() {
  localFilters.type = undefined;
  localFilters.date_from = undefined;
  localFilters.date_to = undefined;
  localFilters.wallet_ids = undefined;
  localFilters.category_ids = undefined;
  localFilters.search = undefined;
  emitFilters();
}
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.transaction-filters {
  width: 100%;
}

.filters-panel {
  position: relative;
  padding: $spacing-4;
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
  background: $bg-white;
  border-radius: $radius-lg;
  border: 1px solid $border-light;
  box-shadow: $shadow-sm;
}

.filters-close {
  position: absolute;
  top: $spacing-2;
  right: $spacing-2;
  padding: 0;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: $radius-md;
  background: transparent;
  color: $text-muted;
  transition: all 0.15s ease;

  &:hover {
    background: $bg-gray;
    color: $text-primary;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}

.filters-row {
  display: flex;
  gap: $spacing-4;
  flex-wrap: wrap;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
  }
}

.filter-group {
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: $spacing-1;

  &--type {
    flex: 0 0 auto;
  }

  &--dates {
    flex: 2;
  }
}

.filter-label {
  font-size: $font-size-xs;
  font-weight: $font-medium;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.type-toggle {
  display: flex;
  gap: 0;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  overflow: hidden;
}

.type-btn {
  padding: 6px 12px;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  background: $bg-white;
  border: none;
  border-radius: 0;
  color: $text-muted;
  transition: all 0.15s ease;

  &:not(:last-child) {
    border-right: 1px solid $border-light;
  }

  &.active {
    background-color: $primary;
    color: white;
  }

  &--income.active {
    background-color: #059669;
  }

  &--expense.active {
    background-color: #dc2626;
  }
}

.date-inputs {
  display: flex;
  align-items: center;
  gap: $spacing-2;
}

.date-input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  font-size: $font-size-sm;
  color: $text-primary;
  background: $bg-white;

  &:focus {
    outline: none;
    border-color: $primary;
  }
}

.date-separator {
  color: $text-muted;
  font-size: $font-size-sm;
}

.date-presets {
  display: flex;
  gap: $spacing-2;
  flex-wrap: wrap;
  margin-top: $spacing-1;
}

.preset-btn {
  padding: 2px 8px;
  font-size: $font-size-xs;
  background: transparent;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  color: $text-muted;
  transition: all 0.15s ease;

  &:hover {
    border-color: $primary;
    color: $primary;
  }
}

.filters-actions {
  display: flex;
  gap: $spacing-2;
  justify-content: flex-start;
  padding-top: $spacing-2;
  border-top: 1px solid $border-light;
}
</style>
