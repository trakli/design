import SparkLine from './SparkLine.vue';

export default {
  title: 'Reports/SparkLine',
  component: SparkLine,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    width:  { control: { type: 'range', min: 60, max: 300 } },
    height: { control: { type: 'range', min: 20, max: 100 } }
  }
};

export const Positive = {
  args: { values: [10, 25, 18, 40, 35, 55, 48, 70], color: '#10b981', width: 120, height: 36 }
};

export const Negative = {
  args: { values: [70, 55, 48, 35, 40, 18, 25, 10], color: '#ef4444', width: 120, height: 36 }
};

export const Flat = {
  args: { values: [30, 30, 30, 30], color: '#6366f1', width: 120, height: 36 }
};
