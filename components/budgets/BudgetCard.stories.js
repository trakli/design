import BudgetCard from './BudgetCard.vue';

export default {
  title: 'Domain/Budgets/BudgetCard',
  component: BudgetCard,
  args: {
    budget: {
      id: 1,
      name: 'Groceries & Household',
      amount: 600,
      currency: 'USD',
      period_type: 'monthly',
      start_date: '2024-01-01',
      targets: [
        { type: 'category', id: 10, name: 'Groceries' },
        { type: 'category', id: 11, name: 'Cleaning Supplies' }
      ],
      progress: {
        period_start: 'Jan 1',
        period_end: 'Jan 31',
        limit: 600,
        gross_spent: 340,
        refunds: 20,
        net_spent: 320,
        effective_limit: 600,
        remaining: 280,
        percent_used: 53.3,
        status: 'on_track'
      }
    }
  }
};

export const OnTrack = {};

export const NearLimit = {
  args: {
    budget: {
      id: 2,
      name: 'Dining & Entertainment',
      amount: 400,
      currency: 'USD',
      period_type: 'monthly',
      start_date: '2024-01-01',
      targets: [{ type: 'category', id: 12, name: 'Restaurants' }],
      progress: {
        period_start: 'Jan 1',
        limit: 400,
        net_spent: 350,
        effective_limit: 400,
        remaining: 50,
        percent_used: 87.5,
        status: 'near_limit'
      }
    }
  }
};

export const OverBudget = {
  args: {
    budget: {
      id: 3,
      name: 'Shopping & Gear',
      amount: 300,
      currency: 'USD',
      period_type: 'monthly',
      start_date: '2024-01-01',
      targets: [{ type: 'category', id: 14, name: 'Electronics' }],
      progress: {
        period_start: 'Jan 1',
        limit: 300,
        net_spent: 380,
        effective_limit: 300,
        remaining: -80,
        percent_used: 126.7,
        status: 'over_budget'
      }
    }
  }
};
