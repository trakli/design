import CumulativeNetArea from './CumulativeNetArea.vue';

const generateMonths = (n = 12) =>
  Array.from({ length: n }, (_, i) => {
    const d = new Date(2024, i, 1);
    const label = d.toLocaleDateString('en', { month: 'short' });
    const running = (i + 1) * 300 + Math.round((Math.random() - 0.4) * 500);
    return { label, cumulative: running };
  });

export default {
  title: 'Reports/Charts/CumulativeNetArea',
  component: CumulativeNetArea,
  args: {
    currency: 'USD',
    formatter: (n) => `$${n.toLocaleString()}`
  }
};

export const Default = {
  args: { data: generateMonths(12) }
};

export const NegativePeriod = {
  args: {
    data: [
      { label: 'Jan', cumulative: 200 },
      { label: 'Feb', cumulative: -100 },
      { label: 'Mar', cumulative: 150 },
      { label: 'Apr', cumulative: -50 },
      { label: 'May', cumulative: 400 }
    ]
  }
};

export const Empty = {
  args: { data: [] }
};
