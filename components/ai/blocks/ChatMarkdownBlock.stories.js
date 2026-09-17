import ChatMarkdownBlock from './ChatMarkdownBlock.vue';

export default {
  title: 'AI/Blocks/ChatMarkdownBlock',
  component: ChatMarkdownBlock,
  args: {
    text:
      '## Summary\n\nYour **income** grew by 12% this month.\n\n- Savings: 18%\n- Spending: `$3,250`\n\n> Review your budgets for next month.'
  }
};

export const Default = {};
