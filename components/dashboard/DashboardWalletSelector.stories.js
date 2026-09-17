import DashboardWalletSelector from './DashboardWalletSelector.vue';

const sampleWallets = [
  { id: 1, name: 'Main Checking', currency: 'USD' },
  { id: 2, name: 'Savings Account', currency: 'USD' },
  { id: 3, name: 'Euro Travel', currency: 'EUR' }
];

export default {
  title: 'Domain/Dashboard/DashboardWalletSelector',
  component: DashboardWalletSelector,
  args: {
    wallets: sampleWallets,
    modelValue: null
  }
};

export const AllWalletsSelected = {};

export const SpecificWalletSelected = {
  args: {
    modelValue: 1
  }
};
