import PartyDetailPanel from './PartyDetailPanel.vue';

const party = {
  id: 1,
  name: 'Grocery Store',
  type: 'organization',
  description: 'Weekly groceries',
  icon: 'Store'
};

const transactions = [
  { date: '2024-03-24', type: 'EXPENSE', amount: '142.50 USD', party: 'Grocery Store', category: 'Food & Dining' },
  { date: '2024-03-20', type: 'EXPENSE', amount: '68.00 USD', party: 'Grocery Store', category: 'Food & Dining' },
  { date: '2024-03-15', type: 'EXPENSE', amount: '210.00 USD', party: 'Grocery Store', category: 'Food & Dining' }
];

export default {
  title: 'Domain/Parties/PartyDetailPanel',
  component: PartyDetailPanel,
  args: {
    party,
    transactions,
    currency: 'USD',
    showBack: false
  }
};

export const WithParty = {};

export const Empty = {
  args: {
    party: null,
    transactions: []
  }
};
