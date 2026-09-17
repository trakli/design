import ChatResultRenderer from './ChatResultRenderer.vue';

export default {
  title: 'AI/ChatResultRenderer',
  component: ChatResultRenderer,
  args: {
    sessionId: 7,
    result: {
      source: 'agent',
      blocks: [
        { type: 'markdown', text: '## Summary\n\nYour spending is up 12% this month.' },
        {
          type: 'kpi',
          title: 'Balance overview',
          items: [{ label: 'Total balance', value: 24850.5, currency: 'USD' }]
        },
        {
          type: 'table',
          title: 'Category breakdown',
          rows: [
            { category: 'Groceries', amount: 84.2 },
            { category: 'Dining', amount: 130.0 }
          ]
        }
      ]
    }
  }
};

export const Default = {};
