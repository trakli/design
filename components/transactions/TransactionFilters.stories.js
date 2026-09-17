import TransactionFilters from './TransactionFilters.vue';

const wallets = [
  { id: 1, name: 'Main Bank Account' },
  { id: 2, name: 'Cash Wallet' }
];
const categories = [
  { id: 1, name: 'Food & Dining' },
  { id: 2, name: 'Salary' },
  { id: 3, name: 'Housing' }
];

export default {
  title: 'Domain/Transactions/TransactionFilters',
  component: TransactionFilters,
  args: {
    filters: {},
    wallets,
    categories
  }
};

export const Default = {};

export const WithActiveFilters = {
  args: {
    filters: {
      type: 'expense',
      wallet_ids: [1],
      category_ids: [1, 3]
    }
  }
};
