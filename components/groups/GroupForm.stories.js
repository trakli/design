import GroupForm from './GroupForm.vue';

export default {
  title: 'Domain/Groups/GroupForm',
  component: GroupForm,
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
      name: 'Vacation',
      description: 'Holiday spending',
      icon: 'Plane'
    }
  }
};
