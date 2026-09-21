import RecurringModal from './RecurringModal.vue';

export default {
  title: 'Domain/Modals/RecurringModal',
  component: RecurringModal,
  args: {
    isOpen: true,
    transaction: {
      id: 12,
      isRecurring: true,
      recurrencePeriod: 'monthly',
      recurrenceInterval: 1,
      recurrenceEndsAt: null
    }
  }
};

export const EditingRecurring = {};

export const NewRecurring = {
  args: {
    transaction: null
  }
};
