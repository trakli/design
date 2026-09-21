import FinancialRatios from './FinancialRatios.vue';

export default {
  title: 'Domain/Reports/FinancialRatios',
  component: FinancialRatios,
  args: {
    totals: {
      savingsRate: 0.35,
      expenseRatio: 0.65,
      runwayMonths: 8.4
    },
    currency: 'USD'
  }
};

export const Healthy = {};

export const Moderate = {
  args: {
    totals: {
      savingsRate: 0.12,
      expenseRatio: 0.88,
      runwayMonths: 3.2
    }
  }
};

export const Deficit = {
  args: {
    totals: {
      savingsRate: -0.15,
      expenseRatio: 1.15,
      runwayMonths: 0.8
    }
  }
};
