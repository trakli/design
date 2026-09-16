import CategoryDonut from './CategoryDonut.vue';

const sampleCategories = [
  { name: 'Food & Drink', value: 420, color: '#f87171' },
  { name: 'Transport', value: 180, color: '#fb923c' },
  { name: 'Shopping', value: 310, color: '#a78bfa' },
  { name: 'Utilities', value: 90, color: '#60a5fa' },
  { name: 'Entertainment', value: 145, color: '#34d399' }
];

const total = sampleCategories.reduce((s, d) => s + d.value, 0);

export default {
  title: 'Reports/Charts/CategoryDonut',
  component: CategoryDonut,
  args: {
    currency: 'USD',
    formatter: (n) => `$${n.toLocaleString()}`
  }
};

export const Default = {
  args: { data: sampleCategories, total, centerLabel: 'Total' }
};

export const SingleCategory = {
  args: {
    data: [{ name: 'Food & Drink', value: 800, color: '#f87171' }],
    total: 800,
    centerLabel: 'Spending'
  }
};

export const Empty = {
  args: { data: [], total: 0, centerLabel: 'Total' }
};
