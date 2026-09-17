import ReminderForm from './ReminderForm.vue';

export default {
  title: 'Domain/Reminders/ReminderForm',
  component: ReminderForm,
  args: {
    editingItem: null,
    apiError: '',
    isSubmitting: false
  }
};

export const Create = {};

export const Edit = {
  args: {
    editingItem: {
      id: 1,
      title: 'Review weekly expenses',
      description: 'Check last week spend',
      type: 'weekly_review',
      priority: 0,
      trigger_at: '2024-03-25T09:00',
      timezone: 'UTC'
    }
  }
};
