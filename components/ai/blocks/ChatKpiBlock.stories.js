import ChatKpiBlock from './ChatKpiBlock.vue';

export default {
  title: 'AI/Blocks/ChatKpiBlock',
  component: ChatKpiBlock,
  args: {
    title: 'Balance overview',
    items: [
      { label: 'Total balance', value: 24850.5, currency: 'USD', delta_percent: 12.4 },
      { label: 'Income', value: 7600, currency: 'USD', trend: 'up' },
      { label: 'Expenses', value: 3250.25, currency: 'USD', trend: 'down' },
      { label: 'Savings rate', value: 18, unit: '%' }
    ]
  }
};

export const Default = {};
