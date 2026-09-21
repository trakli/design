import FlowTab from './FlowTab.vue';

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
  totalIn: 6780,
  totalOut: 4210,
  savings: 2570
};

export default {
  title: 'Domain/Reports/FlowTab',
  component: FlowTab,
  args: {
    flow,
    currency: 'USD'
  }
};

export const HealthyFlow = {};

export const Deficit = {
  args: {
    flow: {
      sources: [{ name: 'Salary', amount: 2600 }],
      sinks: [
        { name: 'Housing', amount: 2100, color: '#8b5cf6' },
        { name: 'Food & Dining', amount: 850, color: '#10b981' }
      ],
      totalIn: 2600,
      totalOut: 2950,
      savings: -350
    }
  }
};

export const Empty = {
  args: {
    flow: {
      sources: [],
      sinks: [],
      totalIn: 0,
      totalOut: 0,
      savings: 0
    }
  }
};
