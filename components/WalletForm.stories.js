import WalletForm from './WalletForm.vue';

export default {
  title: 'Domain/Wallets/WalletForm',
  component: WalletForm,
  args: {
    editingItem: null,
    apiError: '',
    isSubmitting: false,
    defaultCurrency: 'USD'
  }
};

export const Create = {};

export const Edit = {
  args: {
    editingItem: {
      id: 1,
      name: 'Main Bank Account',
      type: 'bank',
      currency: 'USD',
      balance: 1000,
      description: 'Primary checking account',
      icon: 'Landmark'
    }
  }
};
