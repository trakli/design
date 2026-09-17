import SettingsGeneral from './SettingsGeneral.vue';

export default {
  title: 'Domain/Settings/SettingsGeneral',
  component: SettingsGeneral,
  args: {
    isEditMode: true,
    language: 'en',
    currency: 'USD'
  }
};

export const EditMode = {};

export const ViewMode = {
  args: { isEditMode: false }
};
