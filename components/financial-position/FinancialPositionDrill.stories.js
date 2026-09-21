import FinancialPositionDrill from './FinancialPositionDrill.vue';

const group = {
  key: 'earned',
  label: 'Earned income',
  intents: ['regular'],
  type: 'income',
  tone: 'income',
  metric: '5,200 USD'
};

export default {
  title: 'Domain/FinancialPosition/FinancialPositionDrill',
  component: FinancialPositionDrill,
  args: {
    open: true,
    group,
    range: { date_from: '2024-01-01', date_to: '2024-03-31' },
    fetchTransactions: async () => ({
      data: [
        {
          id: 1,
          description: 'Monthly salary',
          datetime: '2024-03-20T08:15:00',
          amount: 2800,
          intent: 'regular',
          type: 'income',
          wallet: { currency: 'USD' },
          party: { name: 'Employer' }
        }
      ]
    })
  }
};

export const Default = {};
