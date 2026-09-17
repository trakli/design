import FinancialPositionView from './FinancialPositionView.vue';

const position = {
  net_worth_delta: 2589.5,
  earned_income: 5200,
  investment_returns: 180,
  gifts_received: 50,
  loan_received: 0,
  discretionary_spend: 2100,
  investment_principal: 500,
  loan_repayment: 0,
  debt_settled: 240.5
};

export default {
  title: 'Domain/FinancialPosition/FinancialPositionView',
  component: FinancialPositionView,
  args: {
    params: null,
    fetchPosition: async () => ({
      data: { position, currency: 'USD', partial: false, unconverted_currencies: [] }
    })
  }
};

export const Default = {};
