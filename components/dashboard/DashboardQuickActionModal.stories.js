import DashboardQuickActionModal from './DashboardQuickActionModal.vue';

const sampleWallets = [
  { id: 1, name: 'Main Checking', currency: 'USD' },
  { id: 2, name: 'Savings Account', currency: 'USD' },
  { id: 3, name: 'Euro Travel', currency: 'EUR' }
];

const sampleParties = [
  { id: 1, name: 'Acme Supermarket' },
  { id: 2, name: 'Electric Utility' },
  { id: 3, name: 'Freelance Client' }
];

export default {
  title: 'Domain/Dashboard/DashboardQuickActionModal',
  component: DashboardQuickActionModal,
  args: {
    action: 'log',
    wallets: sampleWallets,
    parties: sampleParties,
    busy: false
  }
};

export const LogTransaction = {};

export const TransferMoney = {
  args: {
    action: 'transfer'
  }
};

export const BuildReport = {
  args: {
    action: 'report'
  }
};

export const ImportDocument = {
  args: {
    action: 'import'
  }
};
