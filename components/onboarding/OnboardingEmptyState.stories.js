import OnboardingEmptyState from './OnboardingEmptyState.vue';

export default {
  title: 'Domain/Onboarding/OnboardingEmptyState',
  component: OnboardingEmptyState,
  args: {
    pageType: 'transactions'
  }
};

export const Transactions = {};

export const Wallets = {
  args: { pageType: 'wallets' }
};

export const Categories = {
  args: { pageType: 'categories' }
};
