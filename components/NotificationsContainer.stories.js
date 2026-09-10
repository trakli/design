import NotificationsContainer from './NotificationsContainer.vue';
import TButton from './TButton.vue';
import { useNotifications } from '../composables/useNotifications';

export default {
  title: 'Components/NotificationsContainer',
  component: NotificationsContainer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' }
};

export const Interactive = {
  render: () => ({
    components: { NotificationsContainer, TButton },
    setup() {
      const { showSuccess, showError, showWarning, showInfo, showConfirm } = useNotifications();

      const triggerSuccess = () => showSuccess('Saved successfully', 'Your settings have been synced.');
      const triggerError = () => showError('Failed to update', 'An unknown network error occurred.');
      const triggerWarning = () => showWarning('Unsaved Changes', 'Please save before navigating away.');
      const triggerInfo = () => showInfo('Update Available', 'A new version of the application is ready.');
      const triggerConfirm = () => showConfirm({
        title: 'Delete Item?',
        message: 'This will permanently remove the record.',
        type: 'danger'
      });

      return { triggerSuccess, triggerError, triggerWarning, triggerInfo, triggerConfirm };
    },
    template: `
      <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <NotificationsContainer />
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <TButton variant="primary" text="Trigger Success" @click="triggerSuccess" />
          <TButton variant="secondary" text="Trigger Error" @click="triggerError" />
          <TButton variant="outline" text="Trigger Warning" @click="triggerWarning" />
          <TButton variant="text" text="Trigger Info" @click="triggerInfo" />
          <TButton variant="secondary" text="Trigger Confirm Modal" @click="triggerConfirm" />
        </div>
      </div>
    `
  })
};
