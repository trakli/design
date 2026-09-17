import CategoryBreakdown from './CategoryBreakdown.vue';

const sampleCategories = [
  { name: 'Housing & Rent', amount: 1400.0, color: '#3b82f6' },
  { name: 'Groceries', amount: 650.0, color: '#10b981' },
  { name: 'Utilities', amount: 320.0, color: '#f59e0b' },
  { name: 'Entertainment', amount: 220.0, color: '#8b5cf6' },
  { name: 'Transport', amount: 160.0, color: '#ec4899' }
];

export default {
  title: 'Domain/Dashboard/CategoryBreakdown',
  component: CategoryBreakdown,
  args: {
    categories: sampleCategories,
    currency: 'USD',
    initialChart: 'pie'
  }
};

export const DonutView = {};

export const BarView = {
  args: {
    initialChart: 'bar'
  }
};

export const LineView = {
  args: {
    initialChart: 'line'
  }
};

export const Empty = {
  args: {
    categories: []
  }
};
