import ConfirmModal from './ConfirmModal.vue';

export default {
  title: 'Modals/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['warning', 'danger', 'info'] }
  }
};

const base = {
  isOpen: true,
  title: 'Are you sure?',
  message: 'This action cannot be undone.',
  confirmText: 'Confirm',
  cancelText: 'Cancel'
};

export const Warning = { args: { ...base, type: 'warning' } };
export const Danger  = { args: { ...base, type: 'danger',  title: 'Delete item?', message: 'This will permanently delete the item.' } };
export const Info    = { args: { ...base, type: 'info',    title: 'Heads up', message: 'This will affect all linked records.' } };
