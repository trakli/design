import TDashboardTopCard from './TDashboardTopCard.vue';
import { ref } from 'vue';

export default {
  title: 'Components/TDashboardTopCard',
  component: TDashboardTopCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showFilters: { control: 'boolean' }
  }
};

const sampleWallets = [
  { id: '1', name: 'Main Checking', currency: 'USD' },
  { id: '2', name: 'Savings Pot', currency: 'USD' }
];

export const Default = {
  render: () => ({
    components: { TDashboardTopCard },
    setup() {
      const period = ref('current_month');
      return { period, sampleWallets };
    },
    template: `
      <div style="width: 100%; max-width: 900px;">
        <TDashboardTopCard
          v-model="period"
          :wallets="sampleWallets"
        />
      </div>
    `
  })
};
