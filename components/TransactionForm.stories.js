import TransactionForm from './TransactionForm.vue';

const wallets = [
  { id: 1, name: 'Main Bank Account', currency: 'USD' },
  { id: 2, name: 'Cash Wallet', currency: 'USD' }
];
const parties = [
  { id: 1, name: 'Grocery Store' },
  { id: 2, name: 'Employer' }
];
const groups = [{ id: 1, name: 'General' }];
const incomeCategories = [
  { id: 2, name: 'Salary', type: 'income' },
  { id: 4, name: 'Freelance', type: 'income' }
];
const expenseCategories = [
  { id: 1, name: 'Food & Dining', type: 'expense' },
  { id: 3, name: 'Housing', type: 'expense' }
];

export default {
  title: 'Domain/Transactions/TransactionForm',
  component: TransactionForm,
  args: {
    isOutcomeSelected: false,
    editingItem: null,
    isSubmitting: false,
    wallets,
    parties,
    groups,
    incomeCategories,
    expenseCategories,
    defaultCurrency: 'USD',
    defaultGroup: groups[0],
    defaultWallet: wallets[0],
    fetchFileBlob: async () => null,
    deleteFile: async () => {},
    fetchRecentExpenses: async () => []
  }
};

export const NewIncome = {};

export const NewExpense = {
  args: { isOutcomeSelected: true }
};

export const Submitting = {
  args: { isSubmitting: true }
};
