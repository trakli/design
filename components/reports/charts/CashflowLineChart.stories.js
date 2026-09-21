import CashflowLineChart from './CashflowLineChart.vue';

const generateMonths = (n = 12) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date(2024, i, 1);
    const label = d.toLocaleDateString('en', { month: 'short' });
    const income = Math.round(1500 + Math.random() * 1000);
    const expense = Math.round(900 + Math.random() * 800);
    return { label, income, expense, net: income - expense };
  });

export default {
  title: 'Reports/Charts/CashflowLineChart',
  component: CashflowLineChart,
  args: {
    currency: 'USD',
    formatter: (n) => `$${n.toLocaleString()}`
  }
};

export const Default = {
  args: { data: generateMonths(12) }
};

export const Weekly = {
  args: {
    data: Array.from({ length: 8 }, (_, i) => ({
      label: `W${i + 1}`,
      income: Math.round(300 + Math.random() * 200),
      expense: Math.round(200 + Math.random() * 200),
      net: Math.round(Math.random() * 200 - 50)
    }))
  }
};

export const Empty = {
  args: { data: [] }
};
