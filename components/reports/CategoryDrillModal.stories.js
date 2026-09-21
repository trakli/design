import CategoryDrillModal from './CategoryDrillModal.vue';

const sampleBucket = {
  name: 'Food & Dining',
  color: '#10b981',
  count: 24,
  amount: 820.0,
  delta: -12.4,
  kind: 'expense',
  trend: [950, 890, 820, 840, 790, 820]
};

const sampleTransactions = [
  {
    id: 't1',
    party: 'Whole Foods Market',
    category: 'Food & Dining',
    type: 'EXPENSE',
    amount: 142.5,
    date: '2024-03-24'
  },
  {
    id: 't2',
    party: 'City Bistro',
    category: 'Food & Dining',
    type: 'EXPENSE',
    amount: 68.0,
    date: '2024-03-20'
  },
  {
    id: 't3',
    party: 'Corner Cafe',
    category: 'Food & Dining',
    type: 'EXPENSE',
    amount: 12.5,
    date: '2024-03-18'
  }
];

export default {
  title: 'Domain/Reports/CategoryDrillModal',
  component: CategoryDrillModal,
  args: {
    open: true,
    bucket: sampleBucket,
    transactions: sampleTransactions,
    trailingMonths: [
      { month: '2023-10' },
      { month: '2023-11' },
      { month: '2023-12' },
      { month: '2024-01' },
      { month: '2024-02' },
      { month: '2024-03' }
    ],
    currency: 'USD'
  }
};

export const OpenModal = {};

export const EmptyCategory = {
  args: {
    open: true,
    bucket: {
      name: 'Uncategorized',
      color: '#6b7280',
      count: 0,
      amount: 0,
      delta: 0,
      kind: 'expense',
      trend: [0, 0, 0, 0, 0, 0]
    },
    transactions: []
  }
};
