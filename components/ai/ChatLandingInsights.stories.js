import ChatLandingInsights from './ChatLandingInsights.vue';

export default {
  title: 'AI/ChatLandingInsights',
  component: ChatLandingInsights,
  args: {
    loading: false,
    currency: 'USD',
    statistics: {
      transaction_count: 42,
      total_income: 7600,
      total_expenses: 3250.25,
      expense_insights: {
        budget_analysis: { savings_rate: 0.57 },
        biggest_category: { category: 'Groceries', percentage: 32 },
        top_categories: [
          { category: 'Groceries', percentage: 32 },
          { category: 'Dining', percentage: 21 },
          { category: 'Transport', percentage: 14 },
          { category: 'Shopping', percentage: 9 }
        ],
        average_transaction: 77.4,
        biggest_expense: { party: 'Acme Corp', amount: 420 }
      },
      performance: { growth_percentage: 12 },
      income_insights: { biggest_source: { party: 'Acme Corp' } },
      time_analysis: {
        monthly_trends: [
          { net: 3200 },
          { net: 3500 },
          { net: 3100 },
          { net: 4350 }
        ]
      }
    }
  }
};

export const Default = {};

export const Loading = {
  args: { statistics: null, loading: true }
};

export const Empty = {
  args: { statistics: { transaction_count: 0, total_expenses: 0, total_income: 0 } }
};
