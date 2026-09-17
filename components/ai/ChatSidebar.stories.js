import ChatSidebar from './ChatSidebar.vue';

export default {
  title: 'AI/ChatSidebar',
  component: ChatSidebar,
  args: {
    currentSessionId: 2,
    isLoading: false,
    sessions: [
      { id: 1, title: 'Spending summary', updated_at: '2026-01-14T10:00:00Z' },
      { id: 2, title: 'Budget review', updated_at: '2026-01-14T08:00:00Z' },
      { id: 3, title: 'Savings plan', updated_at: '2026-01-06T10:00:00Z' }
    ]
  }
};

export const Default = {};

export const Empty = {
  args: { sessions: [] }
};
