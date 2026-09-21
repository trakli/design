import HoldingForm from './HoldingForm.vue';

export default {
  title: 'Domain/Holdings/HoldingForm',
  component: HoldingForm,
  args: {
    open: true,
    editing: null,
    submitting: false,
    defaultCurrency: 'USD',
    searchCoins: async (q) => [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' }
    ]
  }
};

export const Add = {};

export const Edit = {
  args: {
    editing: {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      quantity: 0.5,
      currency: 'USD',
      unit_price: 64000,
      price_source: 'auto',
      provider: 'coingecko',
      external_ref: 'bitcoin'
    }
  }
};
