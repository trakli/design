import ChatComparisonBlock from './ChatComparisonBlock.vue';

export default {
  title: 'AI/Blocks/ChatComparisonBlock',
  component: ChatComparisonBlock,
  args: {
    title: 'Income vs expenses',
    series: [
      { heading: 'This month', income: 7600, expenses: 3250, net: 4350 },
      { heading: 'Last month', income: 7100, expenses: 3900, net: 3200 }
    ]
  }
};

export const Default = {};
