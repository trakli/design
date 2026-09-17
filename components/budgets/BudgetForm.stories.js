import BudgetForm from './BudgetForm.vue';

export default {
  title: 'Domain/Budgets/BudgetForm',
  component: BudgetForm,
  args: {
    editingItem: null,
    apiError: '',
    isSubmitting: false,
    wallets: [{ id: 1, name: 'Main Bank Account', currency: 'USD' }],
    categories: [
      { id: 1, name: 'Food & Dining' },
      { id: 2, name: 'Housing' }
    ],
    groups: [{ id: 1, name: 'General' }],
    defaults: { currency: 'USD', period: 'monthly', threshold: 80 }
  }
};

export const Create = {};

export const Edit = {
  args: {
    editingItem: {
      id: 1,
      name: 'Groceries',
      amount: 500,
      currency: 'USD',
      period_type: 'monthly',
      start_date: '2024-03-01',
      end_date: null,
      rollover_enabled: false,
      threshold_percent: 80,
      forecast_alerts_enabled: true,
      is_active: true,
      targets: [{ type: 'category', id: 1 }]
    }
  }
};
