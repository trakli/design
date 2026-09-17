import ChatMessageList from './ChatMessageList.vue';

export default {
  title: 'AI/ChatMessageList',
  component: ChatMessageList,
  args: {
    sessionId: 7,
    messages: [
      { id: 1, role: 'user', content: 'Show my recent transactions' },
      {
        id: 2,
        role: 'assistant',
        status: 'completed',
        content: 'Here are your recent transactions.',
        created_at: '2026-01-14T10:02:00Z',
        result: {
          source: 'agent',
          blocks: [
            {
              type: 'table',
              title: 'Recent transactions',
              rows: [
                { title: 'Groceries', amount: -84.2 },
                { title: 'Salary', amount: 3200 }
              ]
            }
          ]
        }
      }
    ]
  }
};

export const Default = {};
