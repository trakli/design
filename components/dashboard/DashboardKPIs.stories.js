import DashboardKPIs from './DashboardKPIs.vue';

export default {
  title: 'Domain/Dashboard/DashboardKPIs',
  component: DashboardKPIs,
  args: {
    statistics: {
      total_balance: 24850.5,
      total_income: 7600.0,
      total_expenses: 3250.25
    },
    currency: 'USD',
    activeFilterChips: []
  }
};

export const Default = {};

export const WithActiveFilters = {
  args: {
    activeFilterChips: [
      { key: 'dateRange', label: 'Jan 1 - Jan 31' },
      { key: 'wallets', label: 'Main Checking' }
    ]
  }
};

export const DeficitPeriod = {
  args: {
    statistics: {
      total_balance: 1520.0,
      total_income: 1800.0,
      total_expenses: 3950.0
    }
  }
};
