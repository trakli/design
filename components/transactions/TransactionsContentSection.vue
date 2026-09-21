<template>
  <div class="content-area">
    <TTopCard :page-name="'Transaction'" :page-name-plural="'Transactions'" @add="emit('add')">
      <template #summary>
        <div v-if="hasTotals" class="totals-summary">
          <span class="total-item">
            <span class="total-label">{{ t('Income') }}</span>
            <span class="total-value income">{{ formatCurrency(totals.income) }}</span>
          </span>
          <span class="total-item">
            <span class="total-label">{{ t('Expenses') }}</span>
            <span class="total-value expense">{{ formatCurrency(totals.expenses) }}</span>
          </span>
          <span class="total-item">
            <span class="total-label">{{ t('Net') }}</span>
            <span class="total-value" :class="totals.net >= 0 ? 'income' : 'expense'">{{
              formatCurrency(totals.net)
            }}</span>
          </span>
        </div>
      </template>
      <template #actions>
        <TButton
          variant="text"
          size="small"
          :full-width="false"
          class="spreadsheet-trigger"
          :aria-label="t('Spreadsheet mode')"
          :title="t('Open spreadsheet view')"
          @click="showSpreadsheet = true"
        >
          <TableCellsIcon class="icon" />
        </TButton>
      </template>
    </TTopCard>

    <TransactionsSpreadsheet v-if="showSpreadsheet" @close="showSpreadsheet = false" />

    <TransactionFilters
      v-show="showFiltersPanel"
      :filters="filters"
      @update:filters="(f) => emit('filter-change', f)"
      @close="showFiltersPanel = false"
    />

    <ComponentLoader
      :is-loading="isLoadingOrNotReady"
      :error="error"
      :has-data="transactions.length > 0"
      :show-empty="true"
      skeleton-variant="table"
      :skeleton-count="6"
      :skeleton-columns="5"
      empty-state-name="transactions"
      @create="emit('add')"
    >
      <template #empty>
        <div v-if="activeFilterCount > 0" class="no-filter-results">
          <div class="no-filter-results__icon-wrapper">
            <FunnelIcon class="no-filter-results__icon" />
          </div>
          <h3 class="no-filter-results__title">{{ t('No results found') }}</h3>
          <p class="no-filter-results__text">
            {{ t('No transactions match your current filters. Try adjusting or clearing them.') }}
          </p>
          <TButton
            :text="t('Clear all filters')"
            variant="primary"
            size="small"
            :full-width="false"
            @click="emit('reset-filters')"
          />
        </div>
        <OnboardingEmptyState v-else page-type="transactions" @create="emit('add')" />
      </template>

      <!-- Mobile cards -->
      <TTransactionsCardList
        class="only-mobile"
        :transactions="transactions"
        :search-query="filters.search || ''"
        :current-page="currentPage"
        :items-per-page="perPage"
        :total-pages="totalPages"
        :total-entries="totalItems"
        :active-filter-count="activeFilterCount"
        @update:search-query="(q) => emit('search-change', q)"
        @page-change="(p) => emit('page-change', p)"
        @edit="(t) => emit('edit', t)"
        @delete="(t) => emit('delete', t)"
        @recurrent="handleRecurrent"
        @toggle-filters="toggleFilters"
      />

      <!-- Desktop table -->
      <TTableComponent
        class="only-desktop"
        :transactions="transactions"
        :all-transactions="transactions"
        :search-query="filters.search || ''"
        :current-page="currentPage"
        :items-per-page="perPage"
        :total-pages="totalPages"
        :total-entries="totalItems"
        :active-filter-count="activeFilterCount"
        :filtered-totals="totals"
        @update:search-query="(q) => emit('search-change', q)"
        @page-change="(p) => emit('page-change', p)"
        @edit="(t) => emit('edit', t)"
        @delete="(t) => emit('delete', t)"
        @recurrent="handleRecurrent"
        @toggle-filters="toggleFilters"
      />
    </ComponentLoader>

    <RecurringModal
      :is-open="showRecurringModal"
      :transaction="selectedTransaction"
      @save="handleRecurringSave"
      @remove="handleRecurringRemove"
      @cancel="showRecurringModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { FunnelIcon, TableCellsIcon } from '@heroicons/vue/24/outline';
import TTopCard from '../TTopCard.vue';
import OnboardingEmptyState from '../onboarding/OnboardingEmptyState.vue';
import TTableComponent from '../TTableComponent.vue';
import TTransactionsCardList from './TTransactionsCardList.vue';
import TransactionFilters from './TransactionFilters.vue';
import TransactionsSpreadsheet from './TransactionsSpreadsheet.vue';
import TButton from '../TButton.vue';
import ComponentLoader from '../ComponentLoader.vue';
import RecurringModal from '../modals/RecurringModal.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  transactions: { type: Array, default: () => [] },
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  totalItems: { type: Number, default: 0 },
  perPage: { type: Number, default: 10 },
  totals: {
    type: Object,
    default: () => ({ income: 0, expenses: 0, net: 0 })
  },
  filters: { type: Object, default: () => ({}) },
  activeFilterCount: { type: Number, default: 0 },
  isLoading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  isInitialized: { type: Boolean, default: false }
});

const emit = defineEmits([
  'add',
  'edit',
  'delete',
  'recurrent-save',
  'recurrent-remove',
  'page-change',
  'filter-change',
  'search-change',
  'reset-filters'
]);

const showRecurringModal = ref(false);
const showFiltersPanel = ref(false);
const showSpreadsheet = ref(false);
const selectedTransaction = ref(null);

function toggleFilters() {
  showFiltersPanel.value = !showFiltersPanel.value;
}

const hasTotals = computed(() => props.totalItems > 0);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const isLoadingOrNotReady = computed(() => props.isLoading || !props.isInitialized);

function handleRecurrent(txn) {
  selectedTransaction.value = txn;
  showRecurringModal.value = true;
}

function handleRecurringSave(config) {
  if (!selectedTransaction.value) return;
  emit('recurrent-save', { txn: selectedTransaction.value, config });
  showRecurringModal.value = false;
  selectedTransaction.value = null;
}

function handleRecurringRemove() {
  if (!selectedTransaction.value) return;
  emit('recurrent-remove', selectedTransaction.value);
  showRecurringModal.value = false;
  selectedTransaction.value = null;
}
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;
@use '../../assets/scss/_utilities.scss' as *;

.content-area {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  width: 100%;
}

.no-filter-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1.5rem;
  text-align: center;

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: $primary-light;
    margin-bottom: 0.25rem;
  }

  &__icon {
    width: 28px;
    height: 28px;
    color: $primary;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-semibold;
    color: $text-primary;
    margin: 0;
  }

  &__text {
    color: $text-muted;
    font-size: $font-size-sm;
    margin: 0;
    max-width: 320px;
    line-height: 1.5;
  }
}

.spreadsheet-trigger {
  width: 34px;
  height: 34px;
  padding: 0;
  background: var(--glass-bg);
  border: 1px solid $border-light;
  border-radius: 10px;
  color: var(--surface-deep);
  backdrop-filter: blur(6px);
  transition:
    background-color $duration-fast $easing-standard,
    color $duration-fast $easing-standard;

  .icon {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: var(--glass-bg-strong);
  }
}

.totals-summary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  flex-wrap: wrap;
}

.total-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--glass-bg);
  border: 1px solid $border-light;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  backdrop-filter: blur(6px);

  .total-label {
    color: var(--surface-ink);
    opacity: 0.7;
    font-weight: $font-semibold;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
  }

  .total-value {
    font-weight: $font-bold;
    color: var(--surface-ink);

    &.income {
      color: var(--color-income);
    }

    &.expense {
      color: var(--color-expense);
    }
  }
}
</style>
