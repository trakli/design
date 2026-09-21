import SettingsAccount from './SettingsAccount.vue';

export default {
  title: 'Domain/Settings/SettingsAccount',
  component: SettingsAccount,
  args: {
    isEditMode: true,
    user: {
      id: 1,
      first_name: 'Jane',
      last_name: 'Doe',
      username: 'janedoe',
      email: 'jane@example.com'
    }
  }
};

export const EditMode = {};

export const ViewMode = {
  args: { isEditMode: false }
};
