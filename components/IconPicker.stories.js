import IconPicker from './IconPicker.vue';
import { ref } from 'vue';

export default {
  title: 'Components/IconPicker',
  component: IconPicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' }
  }
};

export const Default = {
  render: () => ({
    components: { IconPicker },
    setup() {
      const selected = ref('Wallet');
      return { selected };
    },
    template: `
      <div style="width: 320px;">
        <IconPicker v-model="selected" />
        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--color-text-muted);">Selected icon: {{ selected }}</p>
      </div>
    `
  })
};

export const Empty = {
  render: () => ({
    components: { IconPicker },
    setup() {
      const selected = ref('');
      return { selected };
    },
    template: `
      <div style="width: 320px;">
        <IconPicker v-model="selected" placeholder="Choose an entity icon..." />
      </div>
    `
  })
};
