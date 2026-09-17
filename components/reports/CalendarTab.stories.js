import CalendarTab from './CalendarTab.vue';

const generateMonthBuckets = () => {
  const buckets = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= days; d++) {
    const dayStr = String(d).padStart(2, '0');
    const mStr = String(month + 1).padStart(2, '0');
    const date = `${year}-${mStr}-${dayStr}`;
    const expense = d % 4 === 0 ? 0 : Math.round((d * 23.5) % 180);
    const income = d === 1 || d === 15 ? 2400 : 0;
    buckets.push({
      date,
      expense,
      income,
      net: income - expense
    });
  }
  return buckets;
};

export default {
  title: 'Domain/Reports/CalendarTab',
  component: CalendarTab,
  args: {
    buckets: generateMonthBuckets(),
    currency: 'USD'
  }
};

export const CurrentMonth = {};

export const Empty = {
  args: {
    buckets: []
  }
};
