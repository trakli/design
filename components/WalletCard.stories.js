import WalletCard from './WalletCard.vue';

const sampleWallets = [
  { id: 1, name: 'Main Checking', currency: 'USD' },
  { id: 2, name: 'High Yield Savings', currency: 'USD' },
  { id: 3, name: 'Euro Travel Card', currency: 'EUR' }
];

export default {
  title: 'Domain/Wallets/WalletCard',
  component: WalletCard,
  args: {
    wallets: sampleWallets,
    currency: 'USD',
    statistics: {
      total_balance: 14850.75,
      total_income: 6200.0,
      total_expenses: 3180.5
    },
    isLoading: false
  }
};

export const AllWallets = {
  args: {
    modelValue: null
  }
};

export const SelectedWallet = {
  args: {
    modelValue: 1
  }
};

export const Loading = {
  args: {
    isLoading: true
  }
};

export const NegativeBalance = {
  args: {
    statistics: {
      total_balance: -450.25,
      total_income: 1200.0,
      total_expenses: 1650.25
    }
  }
};
