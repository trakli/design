import WalletsStatsStrip from './WalletsStatsStrip.vue';

const wallets = [
  {
    id: 1,
    name: 'Main Checking',
    currency: 'USD',
    balance: 8420.5,
    stats: { total_income: 5200, total_expense: 1800 }
  },
  {
    id: 2,
    name: 'Savings',
    currency: 'USD',
    balance: 14200,
    stats: { total_income: 3000, total_expense: 400 }
  },
  {
    id: 3,
    name: 'Euro Card',
    currency: 'EUR',
    balance: 1200,
    stats: { total_income: 600, total_expense: 890 }
  }
];

export default {
  title: 'Domain/Wallets/WalletsStatsStrip',
  component: WalletsStatsStrip,
  args: {
    wallets,
    defaultCurrency: 'USD'
  }
};

export const Default = {};

export const NegativeBalance = {
  args: {
    wallets: [
      {
        id: 1,
        name: 'Credit Card',
        currency: 'USD',
        balance: -3200,
        stats: { total_income: 500, total_expense: 3700 }
      }
    ]
  }
};

export const Empty = {
  args: { wallets: [] }
};
