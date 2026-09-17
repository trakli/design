import ChatComposer from './ChatComposer.vue';

export default {
  title: 'AI/ChatComposer',
  component: ChatComposer,
  args: {
    modelValue: '',
    disabled: false
  }
};

export const Default = {};

export const Disabled = {
  args: { disabled: true }
};
