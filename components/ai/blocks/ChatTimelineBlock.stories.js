import ChatTimelineBlock from './ChatTimelineBlock.vue';

export default {
  title: 'AI/Blocks/ChatTimelineBlock',
  component: ChatTimelineBlock,
  args: {
    title: 'Recent activity',
    items: [
      {
        date: '2026-01-14',
        title: 'Grocery run',
        description: 'Weekly groceries',
        amount: -84.2,
        currency: 'USD'
      },
      {
        date: '2026-01-01',
        title: 'Salary',
        description: 'Monthly salary',
        amount: 3200,
        currency: 'USD'
      },
      { date: '2026-01-13', title: 'Coffee', amount: -4.5, currency: 'USD' }
    ]
  }
};

export const Default = {};
