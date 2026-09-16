<template>
  <div class="table-container">
    <div v-if="showHeader" class="table-heading">
      <slot name="header-title">
        <h2 class="table-heading-text">{{ title || t('All Transactions') }}</h2>
      </slot>
      <div class="input-controls">
        <SearchInput
          v-if="showSearch"
          :model-value="searchQuery"
          :placeholder="searchPlaceholder || t('Search...')"
          :debounce="0"
          @update:model-value="$emit('update:searchQuery', $event)"
        />
        <TButton
          v-if="showFilterButton"
          variant="secondary"
          size="small"
          :full-width="false"
          class="filter-toggle-btn"
          aria-label="Toggle filters"
          @click="$emit('toggle-filters')"
        >
          <Filter :size="16" class="filter-toggle-icon" />
          <span v-if="activeFilterCount" class="filter-count-badge">{{ activeFilterCount }}</span>
        </TButton>
      </div>
    </div>

    <div class="table-wrapper">
      <div class="table-scroll">
        <table class="custom-table" :class="{ 'expense-table': headerType === 'expense' }">
          <thead>
            <tr>
              <slot name="header-columns">
                <th>{{ t('Date Time') }}</th>
                <th>{{ t('Type') }}</th>
                <th>{{ t('Party') }}</th>
                <th>{{ t('Amount') }}</th>
                <th>{{ t('Category') }}</th>
                <th>{{ t('Action') }}</th>
              </slot>
            </tr>
          </thead>
          <tbody class="table-body">
            <template v-if="displayedTransactions.length">
              <tr v-for="(txn, index) in displayedTransactions" :key="txn.id || index">
                <slot name="row" :item="txn" :index="index">
                  <td>
                    <div class="date-main">{{ formatDate(txn) }}</div>
                    <div class="date-sub">{{ formatTimeAgo(txn) }}</div>
                  </td>
                  <td>
                    <span :class="['type-badge', txn.type === 'INCOME' ? 'income' : 'outcome']">
                      {{ txn.type }}
                    </span>
                    <span v-if="txn.isTransfer" class="transfer-badge">
                      {{ t('Transfer') }}
                    </span>
                    <span v-if="txn.isRefund" class="refund-badge">
                      {{ t('Refund') }}
                    </span>
                    <span v-if="txn.isRecurring" class="recurring-badge">
                      {{ t('Recurring') }}
                    </span>
                  </td>
                  <td>
                    <span class="party">{{ txn.party || '—' }}</span>
                  </td>
                  <td>
                    <span :class="txn.type === 'INCOME' ? 'amount-income' : 'amount-outcome'">
                      {{ txn.amount }}
                    </span>
                  </td>
                  <td>{{ txn.category }}</td>
                  <td>
                    <div class="actions">
                      <TButton
                        variant="text"
                        size="small"
                        :full-width="false"
                        class="action-btn"
                        aria-label="Edit item"
                        @click="$emit('edit', txn)"
                      >
                        <Edit2 :size="15" class="action-icon" />
                      </TButton>
                      <TButton
                        variant="text"
                        size="small"
                        :full-width="false"
                        class="action-btn action-btn--recurring"
                        aria-label="Make recurrent"
                        @click="$emit('recurrent', txn)"
                      >
                        <Repeat :size="15" class="action-icon" />
                      </TButton>
                      <TButton
                        variant="text"
                        size="small"
                        :full-width="false"
                        class="action-btn action-btn--danger"
                        aria-label="Delete item"
                        @click="$emit('delete', txn)"
                      >
                        <Trash2 :size="15" class="action-icon" />
                      </TButton>
                    </div>
                  </td>
                </slot>
              </tr>
            </template>
            <tr v-else>
              <td colspan="6" class="empty-row">
                <slot name="empty">
                  <div class="empty-placeholder">{{ emptyText || t('No transactions found') }}</div>
                </slot>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="showTotals" class="totals-row">
              <td colspan="6" class="totals-cell">
                <div class="totals-grid">
                  <div class="total-section totals-label">
                    <span class="total-label">{{ t('Totals') }}</span>
                  </div>
                  <div class="total-section income">
                    <span class="total-label">{{ t('Income') }}</span>
                    <span class="total-value">{{ formatDisplayCurrency(computedTotals.income) }}</span>
                  </div>
                  <div class="total-section expense">
                    <span class="total-label">{{ t('Expenses') }}</span>
                    <span class="total-value">{{ formatDisplayCurrency(computedTotals.expenses) }}</span>
                  </div>
                  <div
                    class="total-section net"
                    :class="{ positive: computedTotals.net >= 0, negative: computedTotals.net < 0 }"
                  >
                    <span class="total-label">{{ t('Net') }}</span>
                    <span class="total-value">{{ formatDisplayCurrency(computedTotals.net) }}</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="showPagination" class="pagination-row">
              <td colspan="6">
                <div class="pagination-container">
                  <div class="pagination-controls">
                    <TButton
                      variant="secondary"
                      size="small"
                      :full-width="false"
                      class="pagination-btn"
                      :disabled="currentPage <= 1"
                      @click="$emit('page-change', currentPage - 1)"
                    >
                      {{ t('Previous') }}
                    </TButton>
                    <TButton
                      v-for="page in visiblePages"
                      :key="page"
                      :variant="page === currentPage ? 'primary' : 'secondary'"
                      size="small"
                      :full-width="false"
                      class="pagination-btn"
                      @click="$emit('page-change', page)"
                    >
                      {{ page }}
                    </TButton>
                    <TButton
                      variant="secondary"
                      size="small"
                      :full-width="false"
                      class="pagination-btn"
                      :disabled="currentPage >= pagesTotal"
                      @click="$emit('page-change', currentPage + 1)"
                    >
                      {{ t('Next') }}
                    </TButton>
                  </div>
                  <div class="pagination-info">
                    <span class="entries-text">
                      {{ paginationInfoText }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Edit2, Trash2, Repeat, Filter } from 'lucide-vue-next';
import { parseAmount, getCurrencySymbol } from '../utils/currency';
import SearchInput from './SearchInput.vue';
import TButton from './TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const CURRENCY_RATES = {
  USD: 1.0,
  EUR: 0.85,
  XAF: 600.0,
  GBP: 0.75,
  CAD: 1.35
};

const props = defineProps({
  title: { type: String, default: '' },
  showHeader: { type: Boolean, default: true },
  showSearch: { type: Boolean, default: true },
  showFilterButton: { type: Boolean, default: true },
  showTotals: { type: Boolean, default: true },
  showPagination: { type: Boolean, default: true },
  searchPlaceholder: { type: String, default: '' },
  emptyText: { type: String, default: '' },
  transactions: { type: Array, default: () => [] },
  searchQuery: { type: String, default: '' },
  currentPage: { type: Number, default: 1 },
  itemsPerPage: { type: Number, default: 10 },
  totalPages: { type: Number, default: 1 },
  totalEntries: { type: Number, default: 0 },
  headerType: { type: String, default: 'default' },
  allTransactions: { type: Array, default: () => [] },
  activeFilterCount: { type: Number, default: 0 },
  filteredTotals: { type: Object, default: null },
  defaultCurrency: { type: String, default: 'USD' }
});

defineEmits(['edit', 'delete', 'recurrent', 'page-change', 'update:searchQuery', 'toggle-filters']);

const displayedTransactions = computed(() => props.transactions);

const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  const fromRate = CURRENCY_RATES[fromCurrency] || 1;
  const toRate = CURRENCY_RATES[toCurrency] || 1;
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
};

const computedTotals = computed(() => {
  if (props.filteredTotals) {
    return props.filteredTotals;
  }

  const txns = props.allTransactions.length > 0 ? props.allTransactions : props.transactions;
  const targetCurrency = props.defaultCurrency;
  let income = 0;
  let expenses = 0;

  txns.forEach((txn) => {
    const { value, currency } = parseAmount(txn.amount);
    const convertedAmount = convertCurrency(value, currency || targetCurrency, targetCurrency);
    if (txn.type === 'INCOME') {
      income += convertedAmount;
    } else {
      expenses += convertedAmount;
    }
  });

  return {
    income,
    expenses,
    net: income - expenses
  };
});

const formatDisplayCurrency = (value) => {
  const currency = props.defaultCurrency;
  const symbol = getCurrencySymbol(currency);
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value || 0);
  return `${formatted} ${symbol}`;
};

const computedTotalEntries = computed(() => {
  if (props.totalEntries && props.totalEntries > 0) return props.totalEntries;
  return displayedTransactions.value.length;
});

const pagesTotal = computed(() => {
  if (props.totalPages && props.totalPages > 1) return props.totalPages;
  return Math.max(1, Math.ceil(computedTotalEntries.value / props.itemsPerPage));
});

const startEntry = computed(() => {
  if (computedTotalEntries.value === 0) return 0;
  return (props.currentPage - 1) * props.itemsPerPage + 1;
});

const endEntry = computed(() => {
  const end = props.currentPage * props.itemsPerPage;
  return Math.min(end, computedTotalEntries.value);
});

const paginationInfoText = computed(() => {
  return `Showing ${startEntry.value}-${endEntry.value} of ${computedTotalEntries.value} entries`;
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  const total = pagesTotal.value;
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(total, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const formatDate = (txn) => {
  const iso = txn?.date || '';
  const dateObj = new Date(`${iso}T${txn?.time || '00:00'}:00`);
  if (isNaN(dateObj.getTime())) return iso;
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return dateObj.toLocaleDateString(undefined, options);
};

const formatTimeAgo = (txn) => {
  const dateObj = new Date(`${txn?.date || ''}T${txn?.time || '00:00'}:00`);
  if (isNaN(dateObj.getTime())) return '';
  const diffMs = Date.now() - dateObj.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day ago`;
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.table-container {
  width: 100%;
  max-width: 100%;
  gap: $spacing-2;
  overflow: hidden;
}

.table-heading {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
  margin-bottom: $spacing-2;

  @media (min-width: $breakpoint-md) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-text {
    font-weight: $font-semibold;
    font-size: $font-size-lg;
    color: $text-primary;
    margin: 0;
  }
}

.input-controls {
  display: flex;
  align-items: center;
  gap: $spacing-3;
}

.filter-toggle-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: $radius-md;
}

.filter-count-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: $primary;
  color: $text-inverse;
  font-size: 10px;
  font-weight: $font-bold;
  padding: 2px 6px;
  border-radius: 999px;
  line-height: 1;
}

.table-wrapper {
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: $font-size-sm;

  thead {
    background: $bg-light;
    border-bottom: 1px solid $border-light;

    th {
      padding: 12px 16px;
      font-weight: $font-semibold;
      color: $text-secondary;
      white-space: nowrap;
    }
  }

  &.expense-table thead {
    background: rgba(var(--color-error-rgb), 0.05);
  }

  tbody {
    tr {
      border-bottom: 1px solid $border-light;
      transition: background-color $duration-fast $easing-standard;

      &:hover {
        background: rgba(0, 0, 0, 0.015);
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 12px 16px;
      color: $text-primary;
      vertical-align: middle;
    }
  }
}

.date-main {
  font-weight: $font-medium;
  color: $text-primary;
}

.date-sub {
  font-size: $font-size-xs;
  color: $text-muted;
}

.type-badge {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: $font-size-xs;
  font-weight: $font-semibold;
  margin-right: 4px;

  &.income {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: $primary;
  }

  &.outcome {
    background: rgba(var(--color-error-rgb), 0.1);
    color: $error-color;
  }
}

.transfer-badge,
.refund-badge,
.recurring-badge {
  display: inline-flex;
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: $font-medium;
  margin-right: 4px;
}

.transfer-badge {
  background: rgba(var(--color-info-rgb), 0.1);
  color: $info;
}

.refund-badge {
  background: rgba(var(--color-warning-rgb), 0.1);
  color: $warning;
}

.recurring-badge {
  background: $bg-gray;
  color: $text-muted;
}

.party {
  font-weight: $font-medium;
}

.amount-income {
  color: $primary;
  font-weight: $font-semibold;
}

.amount-outcome {
  color: $text-primary;
  font-weight: $font-semibold;
}

.actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn {
  padding: 4px;
  min-height: auto;
  border-radius: $radius-sm;
  color: $text-muted;

  &:hover {
    color: $primary;
    background: $bg-light;
  }

  &--recurring:hover {
    color: $info;
  }

  &--danger:hover {
    color: $error-color;
  }
}

.empty-row {
  text-align: center;
  padding: 3rem 1rem !important;
}

.empty-placeholder {
  color: $text-muted;
  font-size: $font-size-sm;
}

.totals-row {
  background: $bg-light;
  border-top: 2px solid $border-medium;
}

.totals-cell {
  padding: 0 !important;
}

.totals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  padding: 12px 16px;
  gap: $spacing-4;

  .total-section {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .total-label {
      font-size: $font-size-xs;
      font-weight: $font-medium;
      color: $text-muted;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .total-value {
      font-size: $font-size-base;
      font-weight: $font-bold;
      color: $text-primary;
    }

    &.income .total-value {
      color: $primary;
    }

    &.expense .total-value {
      color: $error-color;
    }

    &.net.positive .total-value {
      color: $primary;
    }

    &.net.negative .total-value {
      color: $error-color;
    }
  }
}

.pagination-row {
  background: $bg-white;
  border-top: 1px solid $border-light;

  td {
    padding: 12px 16px;
  }
}

.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-3;

  @media (min-width: $breakpoint-md) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pagination-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
}

.pagination-info {
  font-size: $font-size-xs;
  color: $text-muted;
}
</style>
