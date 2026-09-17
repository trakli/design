import ChatChartBlock from './ChatChartBlock.vue';

export default {
  title: 'AI/Blocks/ChatChartBlock',
  component: ChatChartBlock,
  args: {
    title: 'Spending by category',
    chart_hint: 'donut',
    data: [
      { category: 'Groceries', amount: 420 },
      { category: 'Dining', amount: 180 },
      { category: 'Transport', amount: 90 }
    ]
  }
};

export const Default = {};
