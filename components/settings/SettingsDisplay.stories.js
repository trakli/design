import SettingsDisplay from './SettingsDisplay.vue';

export default {
  title: 'Domain/Settings/SettingsDisplay',
  component: SettingsDisplay,
  args: {
    isDark: false,
    chatFirst: true,
    savingLanding: false
  }
};

export const Default = {};

export const DarkMode = {
  args: { isDark: true }
};
