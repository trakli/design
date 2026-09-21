import CategoryRanking from './CategoryRanking.vue';

const sampleBuckets = [
  {
    name: 'Housing & Rent',
    amount: 1450.0,
    prevAmount: 1450.0,
    delta: 0,
    percentage: 42.6,
    count: 2,
    color: '#3b82f6',
    trend: [1450, 1450, 1450, 1450, 1450]
  },
  {
    name: 'Food & Groceries',
    amount: 720.0,
    prevAmount: 850.0,
    delta: -15.3,
    percentage: 21.2,
    count: 18,
    color: '#10b981',
    trend: [900, 850, 800, 780, 720]
  },
  {
    name: 'Utilities & Bills',
    amount: 380.0,
    prevAmount: 310.0,
    delta: 22.6,
    percentage: 11.2,
    count: 5,
    color: '#f59e0b',
    trend: [280, 300, 310, 340, 380]
  },
  {
    name: 'Entertainment',
    amount: 240.0,
    prevAmount: 320.0,
    delta: -25.0,
    percentage: 7.1,
    count: 8,
    color: '#8b5cf6',
    trend: [350, 320, 290, 260, 240]
  }
];

export default {
  title: 'Domain/Reports/CategoryRanking',
  component: CategoryRanking,
  args: {
    title: 'Top Spending Categories',
    subtitle: 'Ranked by total net outflow this period',
    buckets: sampleBuckets,
    currency: 'USD',
    showDelta: true
  }
};

export const Default = {};

export const EmptyState = {
  args: {
    buckets: []
  }
};
