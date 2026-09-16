import DailyBarChart from './DailyBarChart.vue';

const generateDays = (n = 30) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date(2024, 0, i + 1);
    return {
      date: d.toISOString().split('T')[0],
      expense: Math.round(Math.random() * 800 + 50),
      txCount: Math.round(Math.random() * 8 + 1)
    };
  });

export default {
  title: 'Reports/Charts/DailyBarChart',
  component: DailyBarChart,
  args: {
    currency: 'USD',
    formatter: (n) => `$${n.toLocaleString()}`
  }
};

export const Default = {
  args: { data: generateDays(30) }
};

export const SparseData = {
  args: { data: generateDays(7) }
};

export const Empty = {
  args: { data: [] }
};
