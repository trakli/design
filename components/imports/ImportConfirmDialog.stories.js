import ImportConfirmDialog from './ImportConfirmDialog.vue';

export default {
  title: 'Domain/Imports/ImportConfirmDialog',
  component: ImportConfirmDialog,
  args: {
    show: true,
    acceptedCount: 25,
    rejectedCount: 3,
    duplicatesInAccepted: 2,
    isConfirming: false,
    newWalletCount: 1,
    newPartyCount: 2,
    newCategoryCount: 0,
    missingWalletCount: 0
  }
};

export const Default = {};
