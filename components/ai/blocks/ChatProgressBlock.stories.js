import ChatProgressBlock from './ChatProgressBlock.vue';

export default {
  title: 'AI/Blocks/ChatProgressBlock',
  component: ChatProgressBlock,
  args: {
    title: 'Budget usage',
    items: [
      { label: 'Groceries', current: 320, target: 500, currency: 'USD' },
      { label: 'Dining out', current: 180, target: 200, currency: 'USD' },
      { label: 'Travel', current: 950, target: 900, currency: 'USD' }
    ]
  }
};

export const Default = {};
