import SettingsNotifications from './SettingsNotifications.vue';

export default {
  title: 'Domain/Settings/SettingsNotifications',
  component: SettingsNotifications,
  args: {
    isEditMode: true,
    preferences: {
      channels: { email: true, push: false, inapp: true },
      types: { reminders: true, insights: true, inactivity: false }
    }
  }
};

export const EditMode = {};

export const ViewMode = {
  args: { isEditMode: false }
};
