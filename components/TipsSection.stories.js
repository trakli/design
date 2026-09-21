import TipsSection from './TipsSection.vue';

export default {
  title: 'Domain/Shared/TipsSection',
  component: TipsSection,
  args: {
    pageName: 'Transaction'
  }
};

export const Default = {};

export const WalletTips = {
  args: {
    pageName: 'Wallet',
    title: 'Tips for setting up a wallet',
    text: 'Choose a descriptive name and pick the correct primary currency. You can designate this as your default wallet for everyday transactions.'
  }
};

export const CategoryTips = {
  args: {
    pageName: 'Category',
    title: 'Organizing your categories',
    text: 'Group similar expenses together to make reporting and budgeting easier to manage.'
  }
};
