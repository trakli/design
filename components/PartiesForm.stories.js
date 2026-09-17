import PartiesForm from './PartiesForm.vue';

export default {
  title: 'Domain/Parties/PartiesForm',
  component: PartiesForm,
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
      name: 'Grocery Store',
      type: 'organization',
      description: 'Weekly groceries',
      icon: 'Store'
    }
  }
};
