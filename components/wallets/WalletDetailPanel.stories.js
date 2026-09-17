import WalletDetailPanel from './WalletDetailPanel.vue';

const wallet = {
  id: 1,
  name: 'Main Bank Account',
  type: 'bank',
  currency: 'USD',
  icon: 'Landmark'
};

const transactions = [
  { date: '2024-03-24', type: 'EXPENSE', amount: '142.50 USD', party: 'Whole Foods', category: 'Food & Dining' },
  { date: '2024-03-20', type: 'INCOME', amount: '2800.00 USD', party: 'Employer', category: 'Salary' },
  { date: '2024-03-18', type: 'EXPENSE', amount: '68.00 USD', party: 'City Bistro', category: 'Food & Dining' }
];

export default {
  title: 'Domain/Wallets/WalletDetailPanel',
  component: WalletDetailPanel,
  args: {
    wallet,
    isDefault: true,
    transactions,
    showBack: false
  }
};

export const WithWallet = {};

export const Empty = {
  args: {
    wallet: null,
    transactions: []
  }
};
