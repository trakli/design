import ChatTableBlock from './ChatTableBlock.vue';

export default {
  title: 'AI/Blocks/ChatTableBlock',
  component: ChatTableBlock,
  args: {
    title: 'Category breakdown',
    rows: [
      { category: 'Groceries', amount: 84.2, count: 3 },
      { category: 'Transport', amount: 42.5, count: 5 },
      { category: 'Dining', amount: 130.0, count: 4 }
    ]
  }
};

export const Default = {};

export const SingleRow = {
  args: {
    title: 'Account details',
    rows: [{ name: 'Main checking', balance: 24850.5, currency: 'USD' }]
  }
};
