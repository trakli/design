import ChatListBlock from './ChatListBlock.vue';

export default {
  title: 'AI/Blocks/ChatListBlock',
  component: ChatListBlock,
  args: {
    title: 'Recent transactions',
    items: [
      { title: 'Grocery run', date: '2026-01-14', amount: -84.2, currency: 'USD' },
      { title: 'Salary', date: '2026-01-01', amount: 3200, currency: 'USD' },
      { title: 'Coffee', date: '2026-01-13', amount: -4.5, currency: 'USD' }
    ]
  }
};

export const Default = {};
