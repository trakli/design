import TTransactionCard from './TTransactionCard.vue';

export default {
  title: 'Components/TTransactionCard',
  component: TTransactionCard,
  tags: ['autodocs']
};

const sampleStats = {
  transaction_count: 124,
  total_income: 8450.0,
  total_expenses: 3210.5,
  total_balance: 5239.5,
  income_insights: {
    biggest_source: {
      party: 'Acme Corp Payroll',
      amount: 4500.0
    }
  },
  expense_insights: {
    biggest_expense: {
      party: 'Apartment Rent',
      amount: 1400.0
    }
  }
};

export const Default = {
  args: {
    statistics: sampleStats,
    currency: 'USD'
  }
};
