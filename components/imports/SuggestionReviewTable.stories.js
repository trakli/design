import SuggestionReviewTable from './SuggestionReviewTable.vue';

const suggestions = [
  {
    index: 0,
    status: 'accepted',
    description: 'Weekly groceries',
    amount: 142.5,
    date: '2024-03-24',
    type: 'expense',
    wallet_id: 1,
    category_id: 1,
    party_id: 1,
    duplicate: null
  },
  {
    index: 1,
    status: 'pending',
    description: 'Monthly salary',
    amount: 2800,
    date: '2024-03-20',
    type: 'income',
    wallet_id: 1,
    category_id: 2,
    party_id: 2,
    duplicate: null
  }
];

export default {
  title: 'Domain/Imports/SuggestionReviewTable',
  component: SuggestionReviewTable,
  args: {
    suggestions,
    wallets: [{ id: 1, name: 'Main Bank Account' }],
    categories: [
      { id: 1, name: 'Food & Dining' },
      { id: 2, name: 'Salary' }
    ],
    parties: [
      { id: 1, name: 'Grocery Store' },
      { id: 2, name: 'Employer' }
    ],
    acceptedCount: 1,
    rejectedCount: 0,
    pendingCount: 1
  }
};

export const Default = {};
