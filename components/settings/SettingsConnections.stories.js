import SettingsConnections from './SettingsConnections.vue';

const tokens = [
  { id: 1, name: 'Claude Desktop', last_used_at: '2024-03-20T10:00:00Z' },
  { id: 2, name: 'Cursor', last_used_at: null }
];

export default {
  title: 'Domain/Settings/SettingsConnections',
  component: SettingsConnections,
  args: {
    endpoint: 'https://app.trakli.com/mcp',
    tokens,
    createToken: async (name) => ({ name, token: 'tk_live_example' }),
    revokeToken: async () => {}
  }
};

export const Default = {};

export const Empty = {
  args: { tokens: [] }
};
