import OutreachComposer from './OutreachComposer.vue';

export default {
  title: 'Domain/Admin/OutreachComposer',
  component: OutreachComposer,
  args: {
    fetchUsers: async () => [
      { id: 1, first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com' },
      { id: 2, first_name: 'John', last_name: 'Smith', email: 'john@example.com' }
    ],
    uploadMedia: async () => ({ url: 'https://example.com/image.png' }),
    preview: async () => '<p>Preview</p>',
    sendOutreach: async () => ({ sent: 2 })
  }
};

export const Default = {};
