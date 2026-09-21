<template>
  <TDropdown>
    <template #trigger="{ isOpen }">
      <button
        type="button"
        class="wallet-selector"
        :aria-expanded="isOpen"
        :title="t('Select wallet')"
      >
        <Wallet class="wallet-icon" :size="15" />
        <span class="wallet-name">{{ selectedWalletName }}</span>
        <ChevronDown class="chevron" :class="{ rotated: isOpen }" :size="16" />
      </button>
    </template>
    <div class="wallet-dropdown-menu">
      <TDropdownItem
        v-for="wallet in allWallets"
        :key="wallet.id ?? 'all'"
        class="wallet-dropdown-item"
        :class="{ 'is-selected': modelValue === wallet.id }"
        @click="selectWallet(wallet.id)"
      >
        <span class="wallet-option__name">{{ wallet.name }}</span>
        <span v-if="wallet.currency" class="wallet-option__currency">{{ wallet.currency }}</span>
      </TDropdownItem>
    </div>
  </TDropdown>
</template>

<script setup>
import { computed } from 'vue';
import { ChevronDown, Wallet } from 'lucide-vue-next';
import TDropdown from '../TDropdown.vue';
import TDropdownItem from '../TDropdownItem.vue';

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
  }
});

const emit = defineEmits(['update:modelValue', 'select-wallet']);

const allWallets = computed(() => [
  { id: null, name: t('All Wallets'), currency: '' },
  ...props.wallets
]);

const selectedWallet = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) return null;
  return props.wallets.find((w) => w.id === props.modelValue) || null;
});

const selectedWalletName = computed(() => {
  if (!selectedWallet.value) return t('All Wallets');
  return selectedWallet.value.name;
});

const selectWallet = (id) => {
  emit('update:modelValue', id);
  emit('select-wallet', id);
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.wallet-selector {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2 $spacing-3;
  background: var(--glass-bg, rgba(255, 255, 255, 0.7));
  border-radius: 999px;
  border: 1px solid $border-light;
  backdrop-filter: blur(10px);
  box-shadow: $elevation-1;
  cursor: pointer;
  user-select: none;
  width: fit-content;
  transition: background-color $duration-fast $easing-standard;

  &:hover {
    background: var(--hover-overlay, rgba(0, 0, 0, 0.04));
  }
}

.wallet-icon {
  color: var(--surface-deep, $text-secondary);
  flex-shrink: 0;
}

.wallet-name {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: var(--surface-ink, $text-primary);
  white-space: nowrap;
}

.chevron {
  color: var(--surface-deep, $text-secondary);
  transition: transform $duration-fast $easing-standard;

  &.rotated {
    transform: rotate(180deg);
  }
}

.wallet-dropdown-menu {
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
</style>
