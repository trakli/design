import ChatQuickActionsBlock from './ChatQuickActionsBlock.vue';

export default {
  title: 'AI/Blocks/ChatQuickActionsBlock',
  component: ChatQuickActionsBlock,
  args: {
    actions: [
      { label: 'Show recent transactions' },
      { label: 'Summarize my budget' },
      { label: 'Categorize expenses' }
    ]
  }
};

export const Default = {};
