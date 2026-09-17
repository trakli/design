import QuickInsights from './QuickInsights.vue';

export default {
  title: 'Domain/Dashboard/QuickInsights',
  component: QuickInsights,
  args: {
    topIncome: {
      party: 'TechCorp Solutions',
      amount: 4800.0
    },
    topExpense: {
      party: 'Downtown Apartment',
      amount: 1650.0
    },
    savingsRate: 32,
    riskLevel: 'low',
    periodLabel: 'March 2024',
    currency: 'USD'
  }
};

export const HealthyFinances = {};

export const ModerateRisk = {
  args: {
    topIncome: {
      party: 'Freelance Design',
      amount: 2200.0
    },
    topExpense: {
      party: 'Medical Expenses',
      amount: 1850.0
    },
    savingsRate: 12,
    riskLevel: 'medium'
  }
};

export const HighRisk = {
  args: {
    topIncome: null,
    topExpense: {
      party: 'Emergency Car Repair',
      amount: 2400.0
    },
    savingsRate: 0,
    riskLevel: 'high'
  }
};
