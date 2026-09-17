import ImportSessionsList from './ImportSessionsList.vue';

const sessions = [
  {
    id: 1,
    file_name: 'march-statement.pdf',
    status: 'ready',
    created_at: '2024-03-24T10:00:00Z',
    metadata: { total_suggestions: 28, duplicates_found: 3 }
  },
  {
    id: 2,
    file_name: 'receipts.jpg',
    status: 'confirmed',
    created_at: '2024-03-18T09:00:00Z',
    metadata: { total_suggestions: 12, duplicates_found: 0 }
  }
];

export default {
  title: 'Domain/Imports/ImportSessionsList',
  component: ImportSessionsList,
  args: {
    sessions
  }
};

export const Default = {};
