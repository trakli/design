import TransferForm from './TransferForm.vue';

const wallets = [
  { id: 1, name: 'Main Bank Account', currency: 'USD' },
  { id: 2, name: 'Cash Wallet', currency: 'USD' },
  { id: 3, name: 'Mobile Money', currency: 'XAF' }
];

export default {
  title: 'Domain/Transactions/TransferForm',
  component: TransferForm,
  args: {
    isSubmitting: false,
    wallets,
    defaultCurrency: 'USD'
  }
};

export const Default = {};

export const Submitting = {
  args: { isSubmitting: true }
};
