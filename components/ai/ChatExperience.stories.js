import ChatExperience from './ChatExperience.vue';

export default {
  title: 'AI/ChatExperience',
  component: ChatExperience,
  args: {
    mode: 'full',
    isLoadingSessions: false,
    isSending: false,
    sessions: [
      { id: 1, title: 'Spending summary', updated_at: '2026-01-14T10:00:00Z' },
      { id: 2, title: 'Budget review', updated_at: '2026-01-14T08:00:00Z' }
    ],
    currentSession: {
      id: 2,
      title: 'Budget review',
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
  }
};

export const Full = {};

export const Landing = {
  args: {
    mode: 'landing',
    sessions: [],
    currentSession: null
  }
};
