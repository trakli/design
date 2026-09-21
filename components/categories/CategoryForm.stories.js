import CategoryForm from './CategoryForm.vue';

export default {
  title: 'Domain/Categories/CategoryForm',
  component: CategoryForm,
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
      name: 'Food & Dining',
      type: 'expense',
      description: 'Restaurants and groceries',
      icon: 'Utensils'
    }
  }
};
