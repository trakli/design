import TransactionsSpreadsheet from './TransactionsSpreadsheet.vue';

const rows = [
  {
    id: 1,
    datetime: '2024-03-24T10:30:00',
    type: 'expense',
    amount: 142.5,
    description: 'Weekly groceries',
    wallet: { name: 'Main Bank Account', currency: 'USD' },
    party: { name: 'Whole Foods Market' },
    categories: [{ name: 'Food & Dining' }]
  },
  {
    id: 2,
    datetime: '2024-03-20T08:15:00',
    type: 'income',
    amount: 2800,
    description: 'Monthly salary',
    wallet: { name: 'Main Bank Account', currency: 'USD' },
    party: { name: 'Employer' },
    categories: [{ name: 'Salary' }]
  },
  {
    id: 3,
    datetime: '2024-03-18T19:45:00',
    type: 'expense',
    amount: 68,
    description: 'Dinner',
    wallet: { name: 'Cash Wallet', currency: 'USD' },
    party: { name: 'City Bistro' },
    categories: [{ name: 'Food & Dining' }]
  }
];

const fetchTransactions = async ({ page }) => ({
  data: page === 1 ? rows : [],
  last_page: 1
});

export default {
  title: 'Domain/Transactions/TransactionsSpreadsheet',
  component: TransactionsSpreadsheet,
  args: {
    fetchTransactions
  }
};

export const Default = {};
