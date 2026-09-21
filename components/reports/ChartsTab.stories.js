import ChartsTab from './ChartsTab.vue';

const monthlyBuckets = [
  { month: '2023-10', income: 5200, expense: 4100, net: 1100 },
  { month: '2023-11', income: 5400, expense: 3900, net: 1500 },
  { month: '2023-12', income: 6100, expense: 4800, net: 1300 },
  { month: '2024-01', income: 5400, expense: 4200, net: 1200 },
  { month: '2024-02', income: 5600, expense: 4100, net: 1500 },
  { month: '2024-03', income: 6400, expense: 4400, net: 2000 }
];

const dailyBuckets = [
  { date: '2024-03-01', expense: 120, txCount: 4 },
  { date: '2024-03-02', expense: 0, txCount: 0 },
  { date: '2024-03-03', expense: 210, txCount: 5 },
  { date: '2024-03-04', expense: 65, txCount: 2 },
  { date: '2024-03-05', expense: 0, txCount: 0 },
  { date: '2024-03-06', expense: 340, txCount: 7 },
  { date: '2024-03-07', expense: 90, txCount: 3 }
];

const expenseCategories = [
  { name: 'Housing', amount: 1450, color: '#8b5cf6' },
  { name: 'Food & Dining', amount: 820, color: '#10b981' },
  { name: 'Transport', amount: 460, color: '#f59e0b' },
  { name: 'Utilities', amount: 380, color: '#3b82f6' },
  { name: 'Leisure', amount: 340, color: '#ec4899' },
  { name: 'Health', amount: 250, color: '#14b8a6' }
];

const incomeCategories = [
  { name: 'Salary', amount: 4800, color: '#10b981' },
  { name: 'Freelance', amount: 1200, color: '#3b82f6' },
  { name: 'Interest', amount: 150, color: '#f59e0b' }
];

export default {
  title: 'Domain/Reports/ChartsTab',
  component: ChartsTab,
  args: {
    monthlyBuckets,
    dailyBuckets,
    expenseCategories,
    incomeCategories,
    currency: 'USD'
  }
};

export const Cashflow = {};

export const Empty = {
  args: {
    monthlyBuckets: [],
    dailyBuckets: [],
    expenseCategories: [],
    incomeCategories: []
  }
};
