import DashboardOnboarding from './DashboardOnboarding.vue';

export default {
  title: 'Domain/Onboarding/DashboardOnboarding',
  component: DashboardOnboarding,
  args: {
    hasWallets: true,
    hasCategories: false,
    hasTransactions: false,
    hasParties: false
  }
};

export const Default = {};

export const AllComplete = {
  args: {
    hasWallets: true,
    hasCategories: true,
    hasTransactions: true,
    hasParties: true
  }
};
