import StatsFilterModal from './StatsFilterModal.vue';
import TButton from './TButton.vue';
import { ref } from 'vue';

export default {
  title: 'Components/StatsFilterModal',
  component: StatsFilterModal,
  tags: ['autodocs']
};

const sampleWallets = [
  { id: '1', name: 'Main Account', currency: 'GBP' },
  { id: '2', name: 'Savings Pot', currency: 'GBP' },
  { id: '3', name: 'Euro Travel Wallet', currency: 'EUR' }
];

export const Interactive = {
  render: () => ({
    components: { StatsFilterModal, TButton },
    setup() {
      const isOpen = ref(true);
      const appliedFilters = ref(null);

      const handleApply = (filters) => {
        appliedFilters.value = filters;
        isOpen.value = false;
      };

      return { isOpen, sampleWallets, appliedFilters, handleApply };
    },
    template: `
      <div>
        <TButton variant="primary" text="Open Filter Modal" @click="isOpen = true" />
        <StatsFilterModal
          v-if="isOpen"
          :wallets="sampleWallets"
          current-period="current_month"
          @close="isOpen = false"
          @apply="handleApply"
        />
        <div v-if="appliedFilters" style="margin-top: 1rem; font-size: 0.875rem;">
          <strong>Applied:</strong> {{ appliedFilters }}
        </div>
      </div>
    `
  })
};
