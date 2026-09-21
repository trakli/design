import UserDetail from './UserDetail.vue';

export default {
  title: 'Domain/Admin/UserDetail',
  component: UserDetail,
  args: {
    userId: 1,
    fetchDetail: async () => ({
      user: {
        id: 1,
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@example.com',
        is_admin: true,
        created_at: '2024-01-15T00:00:00Z'
      },
      preferences: { country: 'US', language: 'en', currency: 'USD' },
      last_transaction_at: '2024-03-24T10:30:00Z',
      counts: {
        transactions: 42,
        wallets: 3,
        categories: 12,
        parties: 8,
        groups: 2,
        budgets: 4
      }
    })
  }
};

export const Default = {};
