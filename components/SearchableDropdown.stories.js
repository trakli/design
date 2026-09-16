import SearchableDropdown from './SearchableDropdown.vue';
import { ref } from 'vue';

export default {
  title: 'Components/SearchableDropdown',
  component: SearchableDropdown,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    multiple: { control: 'boolean' }
  }
};

const sampleOptions = [
  { id: '1', name: 'Groceries' },
  { id: '2', name: 'Rent & Mortgage' },
  { id: '3', name: 'Dining Out' },
  { id: '4', name: 'Entertainment' },
  { id: '5', name: 'Investments' },
  { id: '6', name: 'Utilities' },
  { id: '7', name: 'Healthcare' }
];

export const SingleSelect = {
  render: (args) => ({
    components: { SearchableDropdown },
    setup() {
      const selected = ref('');
      return { args, sampleOptions, selected };
    },
    template: `
      <div style="max-width: 360px; padding: 20px;">
        <SearchableDropdown
          v-bind="args"
          :options="sampleOptions"
          v-model="selected"
          label="Category"
          placeholder="Select category..."
        />
        <div style="margin-top: 12px; font-size: 13px; color: #666;">Selected: {{ selected }}</div>
      </div>
    `
  })
};

export const MultiSelect = {
  render: (args) => ({
    components: { SearchableDropdown },
    setup() {
      const selectedIds = ref(['1', '3']);
      return { args, sampleOptions, selectedIds };
    },
    template: `
      <div style="max-width: 420px; padding: 20px;">
        <SearchableDropdown
          v-bind="args"
          :options="sampleOptions"
          :multiple="true"
          :selected="selectedIds"
          v-model="selectedIds"
          label="Multiple Categories"
          placeholder="Filter categories..."
        />
        <div style="margin-top: 12px; font-size: 13px; color: #666;">Selected IDs: {{ selectedIds }}</div>
      </div>
    `
  })
};

export const WithError = {
  args: {
    label: 'Account',
    placeholder: 'Choose account...',
    options: sampleOptions,
    error: 'This field is required'
  }
};
