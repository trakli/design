import ChatProposedActionBlock from './ChatProposedActionBlock.vue';

export default {
  title: 'AI/Blocks/ChatProposedActionBlock',
  component: ChatProposedActionBlock,
  args: {
    sessionId: 7,
    block: {
      id: 101,
      status: 'pending',
      risk: 'normal',
      summary: 'Categorize 3 uncategorized transactions',
      fields: [
        {
          key: 'category',
          label: 'Category',
          type: 'enum',
          value: 'Groceries',
          options: ['Groceries', 'Dining', 'Transport']
        },
        { key: 'amount', label: 'Amount', type: 'number', value: 84.2 },
        { key: 'when', label: 'When', type: 'datetime', value: '2026-01-14T10:00' }
      ]
    },
    wallets: [
      { id: 1, name: 'Main checking' },
      { id: 2, name: 'Savings' }
    ],
    categories: [
      { id: 1, name: 'Groceries' },
      { id: 2, name: 'Dining' }
    ],
    parties: [{ id: 1, name: 'Acme Corp' }],
    confirmAction: () => Promise.resolve(),
    rejectAction: () => Promise.resolve()
  }
};

export const Default = {};

export const Executed = {
  args: {
    block: {
      id: 101,
      status: 'executed',
      risk: 'normal',
      summary: 'Categorize 3 uncategorized transactions',
      fields: [
        { key: 'category', label: 'Category', type: 'enum', value: 'Groceries', display: 'Groceries' }
      ]
    }
  }
};
