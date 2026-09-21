import ReportsEmpty from './ReportsEmpty.vue';

export default {
  title: 'Domain/Reports/ReportsEmpty',
  component: ReportsEmpty,
  args: {
    title: 'Reports are waiting on data',
    description: 'Log a few transactions and your income, expenses, ratios, and patterns will appear here.',
    actionText: 'Add your first transaction',
    to: '/transactions/new'
  }
};

export const Default = {};

export const CustomMessage = {
  args: {
    title: 'No cashflow trends available',
    description: 'Import a CSV statement or connect an account to view monthly insights.',
    actionText: 'Upload bank statement'
  }
};
