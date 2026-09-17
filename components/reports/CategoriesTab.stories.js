import CategoriesTab from './CategoriesTab.vue';

const expenseCategories = [
  {
    name: 'Housing & Rent',
    amount: 1450,
    color: '#8b5cf6',
    count: 2,
    percentage: 34.5,
    prevAmount: 1500,
    delta: -3.3,
    trend: [1500, 1480, 1460, 1450, 1460, 1450]
  },
  {
    name: 'Food & Dining',
    amount: 820,
    color: '#10b981',
    count: 24,
    percentage: 19.5,
    prevAmount: 900,
    delta: -8.9,
    trend: [950, 890, 820, 840, 790, 820]
  },
  {
    name: 'Transport',
    amount: 460,
    color: '#f59e0b',
    count: 11,
    percentage: 10.9,
    prevAmount: 430,
    delta: 7.0,
    trend: [400, 410, 430, 450, 440, 460]
  },
  {
    name: 'Utilities',
    amount: 380,
    color: '#3b82f6',
    count: 4,
    percentage: 9.0,
    prevAmount: 390,
    delta: -2.6,
    trend: [400, 390, 385, 380, 375, 380]
  }
];

const incomeCategories = [
  {
    name: 'Salary',
    amount: 4800,
    color: '#10b981',
    count: 2,
    percentage: 78.0,
    prevAmount: 4700,
    delta: 2.1,
    trend: [4600, 4700, 4700, 4800, 4800, 4800]
  },
  {
    name: 'Freelance',
    amount: 1200,
    color: '#3b82f6',
    count: 5,
    percentage: 19.5,
    prevAmount: 900,
    delta: 33.3,
    trend: [700, 800, 900, 1000, 1100, 1200]
  },
  {
    name: 'Interest',
    amount: 150,
    color: '#f59e0b',
    count: 1,
    percentage: 2.4,
    prevAmount: 140,
    delta: 7.1,
    trend: [120, 130, 135, 140, 145, 150]
  }
];

export default {
  title: 'Domain/Reports/CategoriesTab',
  component: CategoriesTab,
  args: {
    incomeCategories,
    expenseCategories,
    compareEnabled: true,
    currency: 'USD'
  }
};

export const WithComparison = {};

export const WithoutComparison = {
  args: {
    compareEnabled: false
  }
};

export const Empty = {
  args: {
    incomeCategories: [],
    expenseCategories: []
  }
};
