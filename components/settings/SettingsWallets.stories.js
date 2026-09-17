import SettingsWallets from './SettingsWallets.vue';

export default {
  title: 'Domain/Settings/SettingsWallets',
  component: SettingsWallets,
  args: {
    isEditMode: true,
    wallets: [
      { id: 1, name: 'Main Bank Account', currency: 'USD' },
      { id: 2, name: 'Cash Wallet', currency: 'USD' }
    ],
    groups: [
      { id: 1, name: 'General' },
      { id: 2, name: 'Travel' }
    ],
    defaultWalletId: 1,
    defaultGroupId: 1,
    allowNegativeBalance: false
  }
};

export const EditMode = {};

export const ViewMode = {
  args: { isEditMode: false }
};
