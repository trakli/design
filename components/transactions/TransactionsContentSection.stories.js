import TransactionsContentSection from './TransactionsContentSection.vue';

const transactions = [
  {
    id: '1',
    date: '2024-03-24',
    time: '10:30',
    type: 'EXPENSE',
    party: 'Whole Foods Market',
    amount: '142.50 USD',
    category: 'Food & Dining',
    wallet: 'Main Bank Account',
    walletId: 1,
    description: 'Weekly groceries'
  },
  {
    id: '2',
    date: '2024-03-20',
    time: '08:15',
    type: 'INCOME',
    party: 'Employer',
    amount: '2800.00 USD',
    category: 'Salary',
    wallet: 'Main Bank Account',
    walletId: 1,
    description: 'Monthly salary'
  },
  {
    id: '3',
    date: '2024-03-18',
    time: '19:45',
    type: 'EXPENSE',
    party: 'City Bistro',
    amount: '68.00 USD',
    category: 'Food & Dining',
    wallet: 'Cash Wallet',
    walletId: 2,
    description: 'Dinner'
  }
];

export default {
  title: 'Domain/Transactions/TransactionsContentSection',
  component: TransactionsContentSection,
  args: {
    transactions,
    currentPage: 1,
    totalPages: 1,
    totalItems: 3,
    perPage: 10,
    totals: { income: 2800, expenses: 210.5, net: 2589.5 },
    filters: {},
    activeFilterCount: 0,
    isLoading: false,
    error: '',
    isInitialized: true
  }
};

export const Default = {};

export const Empty = {
  args: {
    transactions: [],
    totalItems: 0,
    totals: { income: 0, expenses: 0, net: 0 }
  }
};
