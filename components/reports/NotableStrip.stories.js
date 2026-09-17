import NotableStrip from './NotableStrip.vue';

export default {
  title: 'Domain/Reports/NotableStrip',
  component: NotableStrip,
  args: {
    currency: 'USD',
    notable: {
      biggestExpense: {
        amount: 890.0,
        party: 'Flight Agency',
        category: 'Travel & Transport',
        date: '2024-03-12'
      },
      biggestCategorySwing: {
        name: 'Dining & Restaurants',
        fromAmount: 450.0,
        toAmount: 210.0,
        deltaPct: -53
      },
      firstTimePayees: {
        count: 3,
        names: ['Coffee Lab', 'Metro Carwash', 'Cloud Host']
      },
      longestNoSpendStreak: {
        days: 4,
        startDate: '2024-03-04',
        endDate: '2024-03-07'
      }
    }
  }
};

export const Default = {};

export const EmptyState = {
  args: {
    notable: {
      biggestExpense: null,
      biggestCategorySwing: null,
      firstTimePayees: { count: 0, names: [] },
      longestNoSpendStreak: { days: 0, startDate: '', endDate: '' }
    }
  }
};
