import MonthInReview from './MonthInReview.vue';

const sampleMonthData = {
  monthLabel: 'March 2024',
  daysInMonth: 31,
  transactionCount: 42,
  income: 5600,
  expense: 3100,
  savingsRate: 0.446,
  topCategory: {
    name: 'Housing & Rent',
    amount: 1450
  },
  topPayee: {
    name: 'Downtown Landlord Co',
    amount: 1450
  },
  biggestExpense: {
    amount: 890,
    party: 'Flight Agency',
    category: 'Travel & Transport'
  }
};

export default {
  title: 'Domain/Reports/MonthInReview',
  component: MonthInReview,
  args: {
    open: true,
    data: sampleMonthData,
    currency: 'USD'
  }
};

export const OpenRecap = {};

export const EmptyRecap = {
  args: {
    open: true,
    data: null
  }
};
