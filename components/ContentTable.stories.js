import ContentTable from './ContentTable.vue';

export default {
  title: 'Components/ContentTable',
  component: ContentTable,
  tags: ['autodocs'],
};

const entities = [
  { id: '1', name: 'Food & Drink', icon: 'UtensilsCrossed', description: 'Restaurants, groceries, coffee' },
  { id: '2', name: 'Transport', icon: 'Car', description: 'Fuel, public transit, ride-hailing' },
  { id: '3', name: 'Healthcare', icon: 'HeartPulse', description: 'Pharmacy, appointments, insurance' },
  { id: '4', name: 'Entertainment', icon: 'Tv2', description: 'Streaming, events, games' },
  { id: '5', name: 'Salary', icon: 'Briefcase', description: 'Monthly net salary income' },
];

export const Default = {
  args: {
    entities,
    defaultItemId: '5',
    title: 'All Categories',
    searchPlaceholder: 'Search categories...',
    defaultBadgeLabel: 'Default',
    editLabel: 'Edit category',
    deleteLabel: 'Delete category',
    emptyText: 'No categories found.',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
    ]
  }
};

export const Loading = {
  args: {
    ...Default.args,
    isLoading: true,
    entities: []
  }
};

export const Empty = {
  args: {
    ...Default.args,
    entities: [],
    emptyText: 'No categories added yet.'
  }
};
