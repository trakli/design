import TTransactionsCardList from './TTransactionsCardList.vue';

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
    description: 'Monthly salary',
    isRecurring: true
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
  title: 'Domain/Transactions/TTransactionsCardList',
  component: TTransactionsCardList,
  args: {
    transactions,
    searchQuery: '',
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
    totalEntries: 3,
    activeFilterCount: 0,
    defaultWallet: { id: 1, name: 'Main Bank Account' }
  }
};

export const Default = {};

export const Empty = {
  args: {
    transactions: [],
    totalEntries: 0
  }
};
