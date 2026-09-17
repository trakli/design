import WalletListCard from './WalletListCard.vue';

export default {
  title: 'Domain/Wallets/WalletListCard',
  component: WalletListCard,
  args: {
    wallet: {
      id: 1,
      name: 'Primary Checking',
      currency: 'USD',
      balance: 5420.5,
      stats: {
        total_income: 3500.0,
        total_expense: 1200.0
      }
    },
    isDefault: false
  }
};

export const Default = {};

export const DefaultWalletBadge = {
  args: {
    isDefault: true
  }
};

export const NegativeBalance = {
  args: {
    wallet: {
      id: 2,
      name: 'Credit Card',
      currency: 'USD',
      balance: -1280.4,
      stats: {
        total_income: 500.0,
        total_expense: 1780.4
      }
    }
  }
};
