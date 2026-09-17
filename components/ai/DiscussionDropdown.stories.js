import DiscussionDropdown from './DiscussionDropdown.vue';

export default {
  title: 'AI/DiscussionDropdown',
  component: DiscussionDropdown,
  args: {
    currentId: 2,
    currentTitle: 'Budget review',
    sessions: [
      { id: 1, title: 'Spending summary' },
      { id: 2, title: 'Budget review' },
      { id: 3, title: 'Savings plan' }
    ]
  }
};

export const Default = {};

export const Empty = {
  args: { sessions: [], currentId: null, currentTitle: 'New chat' }
};
