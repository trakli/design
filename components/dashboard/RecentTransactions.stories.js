import RecentTransactions from './RecentTransactions.vue';

const sampleTransactions = [
  {
    id: 1,
    party: 'Acme Supermarket',
    category: 'Groceries',
    type: 'EXPENSE',
    amount: 84.5,
    date: new Date().toISOString()
  },
  {
    id: 2,
    party: 'Client Retainer',
    category: 'Salary & Income',
    type: 'INCOME',
    amount: 3200.0,
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    party: 'Metro Transit',
    category: 'Transport',
    type: 'EXPENSE',
    amount: 14.0,
    date: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 4,
    party: 'Electric & Gas Utility',
    category: 'Utilities',
    type: 'EXPENSE',
    amount: 145.2,
    date: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: 5,
    party: 'Coffee Corner',
    category: 'Food & Dining',
    type: 'EXPENSE',
    amount: 5.75,
    date: new Date(Date.now() - 86400000 * 12).toISOString()
  }
];

export default {
  title: 'Domain/Dashboard/RecentTransactions',
  component: RecentTransactions,
  args: {
    transactions: sampleTransactions,
    limit: 5,
    viewAllTo: '/transactions',
    currency: 'USD'
  }
};

export const Default = {};

export const Empty = {
  args: {
    transactions: []
  }
};
