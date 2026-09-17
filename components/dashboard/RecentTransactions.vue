<template>
  <div class="recent-transactions">
    <Receipt class="card-glyph" :size="128" :stroke-width="1" aria-hidden="true" />
    <div class="header">
      <h3 class="title">{{ t('Recent Transactions') }}</h3>
      <NuxtLink v-if="viewAllTo" :to="viewAllTo" class="view-all">
        {{ t('View All') }}
      </NuxtLink>
    </div>

    <div v-if="displayedTransactions.length === 0" class="empty-state">
      <p>{{ t('No transactions yet') }}</p>
    </div>

    <div v-else class="transaction-list">
      <div
        v-for="txn in displayedTransactions"
        :key="txn.id"
        class="transaction-row"
        @click="$emit('click-transaction', txn)"
      >
        <div class="txn-icon" :class="isIncome(txn) ? 'income' : 'expense'">
          <ArrowDownLeft v-if="isIncome(txn)" :size="16" />
          <ArrowUpRight v-else :size="16" />
        </div>
        <div class="txn-details">
          <span class="txn-party">{{ txn.party || txn.description || t('Unknown') }}</span>
          <span class="txn-category">{{ txn.category || t('Uncategorized') }}</span>
        </div>
        <div class="txn-right">
          <span class="txn-amount" :class="isIncome(txn) ? 'income' : 'expense'">
            {{ isIncome(txn) ? '+' : '-' }}{{ formatAmountValue(txn.amount) }}
          </span>
          <span class="txn-time">{{ formatRelativeTime(txn.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ArrowDownLeft, ArrowUpRight, Receipt } from 'lucide-vue-next';
import { formatAmount } from '../../utils/currency';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  },
  limit: {
    type: Number,
    default: 5
  },
  viewAllTo: {
    type: String,
    default: '/transactions'
  },
  currency: {
    type: String,
    default: 'USD'
  }
});

defineEmits(['click-transaction']);

const displayedTransactions = computed(() => {
  return (props.transactions || []).slice(0, props.limit);
});

const isIncome = (txn) => {
  const type = String(txn?.type || '').toUpperCase();
  return type === 'INCOME' || type === 'CREDIT';
};

const formatAmountValue = (amt) => {
  if (amt === undefined || amt === null) return '0.00';
  return formatAmount(`${Math.abs(amt)} ${props.currency}`);
};

const formatRelativeTime = (dateStr) => {
  if (!dateStr) return '';

  const date = new Date(String(dateStr).includes('T') ? dateStr : `${dateStr}T00:00:00`);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return t('Today');
  if (diffDays === 1) return t('Yesterday');
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.recent-transactions {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(120% 100% at 100% 0%, rgba(var(--color-info-rgb), 0.05), transparent 58%),
    $bg-white;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  border: 1px solid $border-color;
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
  color: var(--color-info, $info);
  opacity: 0.05;
  pointer-events: none;
}

.header {
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

.view-all {
  font-size: $font-size-xs;
  color: $primary;
  text-decoration: none;
  font-weight: $font-medium;

  &:hover {
    text-decoration: underline;
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

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  overflow-y: auto;
  flex: 1;
}

.transaction-row {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-2;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: background-color $duration-fast $easing-standard;

  &:hover {
    background: $bg-light;
  }
}

.txn-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
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
}

.txn-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.txn-party {
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.txn-category {
  font-size: $font-size-xs;
  color: $text-muted;
}

.txn-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.txn-amount {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  font-variant-numeric: tabular-nums;

  &.income {
    color: $success;
  }

  &.expense {
    color: $error-color;
  }
}

.txn-time {
  font-size: $font-size-xs;
  color: $text-muted;
}
</style>
