import FormSection from './FormSection.vue';

const wallets = [
  { id: 1, name: 'Main Bank Account', currency: 'USD' },
  { id: 2, name: 'Cash Wallet', currency: 'USD' }
];
const categories = [
  { id: 1, name: 'Food & Dining', type: 'expense' },
  { id: 2, name: 'Salary', type: 'income' }
];
const groups = [{ id: 1, name: 'General' }];

export default {
  title: 'Domain/Transactions/FormSection',
  component: FormSection,
  args: {
    isSubmitting: false,
    wallets,
    groups,
    incomeCategories: categories.filter((c) => c.type === 'income'),
    expenseCategories: categories.filter((c) => c.type === 'expense'),
    defaultCurrency: 'USD',
    defaultGroup: groups[0],
    defaultWallet: wallets[0]
  }
};

export const Default = {};
