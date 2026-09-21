import KpiCard from './KpiCard.vue';

export default {
  title: 'Reports/KpiCard',
  component: KpiCard,
  tags: ['autodocs'],
  argTypes: {
    valueClass: { control: 'select', options: ['', 'is-positive', 'is-negative'] }
  }
};

export const Default   = { args: { label: 'Total Revenue', value: '$12,400', valueClass: '' } };
export const Positive  = { args: { label: 'Net Income', value: '+$3,200', valueClass: 'is-positive' } };
export const Negative  = { args: { label: 'Expenses', value: '-$1,800', valueClass: 'is-negative' } };
