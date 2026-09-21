import SankeyFlow from './SankeyFlow.vue';

const flow = {
  sources: [
    { name: 'Salary', amount: 5200 },
    { name: 'Freelance', amount: 1400 },
    { name: 'Interest', amount: 180 }
  ],
  sinks: [
    { name: 'Housing', amount: 2100, color: '#8b5cf6' },
    { name: 'Food & Dining', amount: 850, color: '#10b981' },
    { name: 'Transport', amount: 420, color: '#f59e0b' },
    { name: 'Utilities', amount: 360, color: '#3b82f6' },
    { name: 'Leisure', amount: 480, color: '#ec4899' }
  ],
  savings: 2570
};

export default {
  title: 'Domain/Reports/SankeyFlow',
  component: SankeyFlow,
  args: {
    flow,
    currency: 'USD'
  }
};

export const WithSavings = {};

export const Deficit = {
  args: {
    flow: {
      sources: [{ name: 'Salary', amount: 2600 }],
      sinks: [
        { name: 'Housing', amount: 2100, color: '#8b5cf6' },
        { name: 'Food & Dining', amount: 850, color: '#10b981' }
      ],
      savings: -350
    }
  }
};

export const Empty = {
  args: {
    flow: {
      sources: [],
      sinks: [],
      savings: 0
    }
  }
};
