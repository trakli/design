import CashflowHero from './CashflowHero.vue';

const sampleTrailing = [
  { income: 4200, expense: 3100, net: 1100 },
  { income: 4500, expense: 3400, net: 1100 },
  { income: 4100, expense: 2900, net: 1200 },
  { income: 5200, expense: 3200, net: 2000 },
  { income: 4800, expense: 3300, net: 1500 },
  { income: 5600, expense: 3100, net: 2500 }
];

export default {
  title: 'Domain/Reports/CashflowHero',
  component: CashflowHero,
  args: {
    totals: {
      net: 2500,
      prevNet: 1500,
      netDelta: 66.7,
      income: 5600,
      prevIncome: 4800,
      incomeDelta: 16.7,
      expense: 3100,
      prevExpense: 3300,
      expenseDelta: -6.1,
      savingsRate: 0.446,
      prevSavingsRate: 0.3125,
      savingsRateDelta: 13.4
    },
    trailing: sampleTrailing,
    compareEnabled: true,
    currency: 'USD'
  }
};

export const SurplusPeriod = {};

export const DeficitPeriod = {
  args: {
    totals: {
      net: -850,
      prevNet: 320,
      netDelta: -365.6,
      income: 2400,
      prevIncome: 2900,
      incomeDelta: -17.2,
      expense: 3250,
      prevExpense: 2580,
      expenseDelta: 26.0,
      savingsRate: 0,
      prevSavingsRate: 0.11,
      savingsRateDelta: -11.0
    },
    trailing: [
      { income: 3100, expense: 2800, net: 300 },
      { income: 2900, expense: 2580, net: 320 },
      { income: 2400, expense: 3250, net: -850 }
    ]
  }
};
