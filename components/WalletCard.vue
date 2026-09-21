<template>
  <div class="wallet-card-wrapper">
    <ComponentLoader
      :is-loading="isLoading"
      :has-data="!!computedStats"
      :show-empty="false"
      skeleton-variant="card"
      :on-retry="() => $emit('retry')"
    >
      <div class="card-container">
        <div class="background-ellipse" />
        <div class="card-content">
          <div class="card-header-content">
            <div class="card-header">
              <span class="total-balance-text">
                {{ selectedWalletName }}
              </span>
              <TDropdown v-if="wallets && wallets.length > 0">
                <template #trigger="{ isOpen }">
                  <button
                    type="button"
                    class="chevron-trigger"
                    :aria-expanded="isOpen"
                    :title="t('Select wallet')"
                  >
                    <ChevronDown
                      class="chevron-icon"
                      :class="{ rotated: isOpen }"
                      :size="16"
                    />
                  </button>
                </template>
                <div class="wallet-dropdown-menu">
                  <TDropdownItem
                    v-for="w in allWalletsOption"
                    :key="w.id ?? 'all'"
                    class="wallet-dropdown-item"
                    :class="{ 'is-selected': selectedId === w.id }"
                    @click="onSelectWallet(w.id)"
                  >
                    <span class="wallet-option__name">{{ w.name }}</span>
                    <span v-if="w.currency" class="wallet-option__currency">{{ w.currency }}</span>
                  </TDropdownItem>
                </div>
              </TDropdown>
            </div>
            <span class="balance-amount-text">
              {{ formattedBalance }}
            </span>
          </div>

          <slot name="actions">
            <TDropdown>
              <template #trigger>
                <button
                  type="button"
                  class="three-dots-button"
                  :aria-label="t('Wallet actions')"
                >
                  <MoreHorizontal class="three-dots" :size="20" />
                </button>
              </template>
              <div class="action-dropdown-menu">
                <TDropdownItem @click="$emit('edit', selectedWallet)">
                  {{ t('Edit wallet') }}
                </TDropdownItem>
                <TDropdownItem @click="$emit('transfer')">
                  {{ t('Transfer funds') }}
                </TDropdownItem>
              </div>
            </TDropdown>
          </slot>
        </div>

        <div class="card-footer">
          <button
            type="button"
            class="income-button"
            @click="$emit('income-click')"
          >
            <div class="income-button-content">
              <ArrowDownLeft class="income-arrow-icon" :size="16" />
              <span class="income-button-text">{{ t('Income') }}</span>
            </div>
            <span class="income-card-amount-text">
              {{ formattedIncome }}
            </span>
          </button>

          <button
            type="button"
            class="expense-button"
            @click="$emit('expense-click')"
          >
            <div class="expense-button-content">
              <ArrowUpRight class="expense-arrow-icon" :size="16" />
              <span class="expense-button-text">{{ t('Expense') }}</span>
            </div>
            <span class="expense-card-amount-text">
              {{ formattedExpense }}
            </span>
          </button>
        </div>
      </div>
    </ComponentLoader>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ChevronDown, MoreHorizontal, ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next';
import ComponentLoader from './ComponentLoader.vue';
import TDropdown from './TDropdown.vue';
import TDropdownItem from './TDropdownItem.vue';
import { formatAmount, formatShortAmount } from '../utils/currency';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    default: null
  },
  wallets: {
    type: Array,
    default: () => []
  },
  statistics: {
    type: Object,
    default: () => ({
      total_balance: 0,
      total_income: 0,
      total_expenses: 0
    })
  },
  currency: {
    type: String,
    default: 'USD'
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  'update:modelValue',
  'select-wallet',
  'income-click',
  'expense-click',
  'edit',
  'transfer',
  'retry'
]);

const selectedId = computed(() => props.modelValue);

const allWalletsOption = computed(() => [
  { id: null, name: t('All Wallets'), currency: '' },
  ...props.wallets
]);

const selectedWallet = computed(() => {
  if (selectedId.value === null || selectedId.value === undefined) return null;
  return props.wallets.find((w) => w.id === selectedId.value) || null;
});

const selectedWalletName = computed(() => {
  if (!selectedWallet.value) return t('All Wallets');
  return selectedWallet.value.name;
});

const activeCurrency = computed(() => {
  if (selectedWallet.value?.currency) return selectedWallet.value.currency;
  return props.currency;
});

const computedStats = computed(() => props.statistics);

const formattedBalance = computed(() => {
  const val = computedStats.value?.total_balance ?? 0;
  return formatAmount(`${val} ${activeCurrency.value}`);
});

const formattedIncome = computed(() => {
  const val = computedStats.value?.total_income ?? 0;
  return formatShortAmount(`${val} ${activeCurrency.value}`);
});

const formattedExpense = computed(() => {
  const val = computedStats.value?.total_expenses ?? 0;
  return formatShortAmount(`${val} ${activeCurrency.value}`);
});

const onSelectWallet = (walletId) => {
  emit('update:modelValue', walletId);
  emit('select-wallet', walletId);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.wallet-card-wrapper {
  position: relative;
  width: 100%;
}

.card-container {
  width: 100%;
  min-height: 158px;
  background-color: $bg-light;
  border: 0.5px solid $border-medium;
  border-radius: $radius-xl;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  padding: $spacing-4;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.background-ellipse {
  position: absolute;
  width: 461px;
  height: 461px;
  left: -141px;
  top: -130px;
  background: $primary-light;
  border-radius: 50%;
  z-index: -1;
  pointer-events: none;
}

.card-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  position: relative;
  z-index: 1;
}

.card-header-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.card-header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: $spacing-2;
  margin-bottom: $spacing-2;
}

.total-balance-text {
  color: $text-primary;
  font-weight: $font-normal;
  font-size: $font-size-xs;
}

.chevron-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: $text-secondary;
}

.chevron-icon {
  cursor: pointer;
  transition: transform $duration-fast $easing-standard;

  &.rotated {
    transform: rotate(180deg);
  }
}

.balance-amount-text {
  font-weight: $font-bold;
  font-size: $font-size-xl;
  color: $text-primary;
  font-variant-numeric: tabular-nums;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-lg;
  }
}

.three-dots-button {
  width: 36px;
  height: 36px;
  background-color: $primary-muted;
  border-radius: $radius-lg;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color $duration-fast $easing-standard;

  &:hover {
    background-color: rgba(var(--color-primary-rgb), 0.2);
  }
}

.three-dots {
  color: $primary-dark;
}

.wallet-dropdown-menu,
.action-dropdown-menu {
  min-width: 180px;
  padding: $spacing-1 0;
}

.wallet-dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: $spacing-2;

  &.is-selected {
    font-weight: $font-bold;
    color: var(--color-primary);
  }
}

.wallet-option__name {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wallet-option__currency {
  flex: 0 0 auto;
  font-size: $font-size-xs;
  opacity: 0.75;
}

.card-footer {
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-4;
  position: relative;
  z-index: 1;
}

.income-button,
.expense-button {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 120px;
  height: 48px;
  border-radius: $radius-lg;
  padding: $spacing-1 $spacing-2;
  border: none;
  cursor: pointer;
  overflow: hidden;
  text-align: left;
  transition: opacity $duration-fast $easing-standard;

  &:hover {
    opacity: 0.88;
  }
}

.income-button {
  background-color: rgba(var(--color-success-rgb), 0.15);
}

.expense-button {
  background-color: rgba(var(--color-error-rgb), 0.15);
}

.income-button-content,
.expense-button-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.income-arrow-icon {
  color: $success;
}

.expense-arrow-icon {
  color: $error-color;
}

.income-button-text {
  font-weight: $font-medium;
  font-size: $font-size-xs;
  color: $success;
}

.expense-button-text {
  font-weight: $font-medium;
  font-size: $font-size-xs;
  color: $error-color;
}

.income-card-amount-text,
.expense-card-amount-text {
  font-weight: $font-bold;
  font-size: $font-size-sm;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  color: $text-primary;
}
</style>
