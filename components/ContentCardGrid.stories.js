import ContentCardGrid from './ContentCardGrid.vue';

export default {
  title: 'Components/ContentCardGrid',
  component: ContentCardGrid,
  tags: ['autodocs'],
};

const wallets = [
  { id: '1', name: 'Main Account', description: 'Primary HSBC current account', icon: 'Wallet', balance: '£4,320.00' },
  { id: '2', name: 'Savings Pot', description: 'Emergency fund — target £10k', icon: 'PiggyBank' },
  { id: '3', name: 'Investments', description: 'Stocks & ETFs via Freetrade', icon: 'TrendingUp' },
  { id: '4', name: 'Cash', description: 'Physical wallet', icon: 'Banknote' },
];

export const Default = {
  args: {
    entities: wallets,
    defaultItemId: '1',
    defaultBadgeLabel: 'Default',
    editLabel: 'Edit wallet',
    deleteLabel: 'Delete wallet',
    emptyText: 'No wallets yet.'
  }
};

export const WithCardFields = {
  args: {
    entities: wallets.slice(0, 3),
    defaultItemId: '1',
    defaultBadgeLabel: 'Default',
    editLabel: 'Edit',
    deleteLabel: 'Delete',
    cardFields: [
      { key: 'balance', label: 'Balance' },
    ],
    emptyText: 'No wallets yet.'
  }
};

export const Empty = {
  args: {
    entities: [],
    emptyText: 'No wallets have been added yet.'
  }
};
