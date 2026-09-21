import PeriodControl from './PeriodControl.vue';
import { ref } from 'vue';

export default {
  title: 'Reports/PeriodControl',
  component: PeriodControl,
  tags: ['autodocs'],
  argTypes: {
    selectedPeriod: { control: 'text' },
    compareEnabled: { control: 'boolean' }
  }
};

const periods = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
  { label: 'All', value: 'all' }
];

export const Default = {
  render: () => ({
    components: { PeriodControl },
    setup() {
      const selected = ref('month');
      const compare = ref(false);
      const customRange = ref(null);

      const handleSelect = (val) => { selected.value = val; };
      const handleToggleCompare = () => { compare.value = !compare.value; };
      const handleCustom = (r) => {
        selected.value = 'custom';
        customRange.value = r;
      };

      return { periods, selected, compare, customRange, handleSelect, handleToggleCompare, handleCustom };
    },
    template: `
      <div style="width: 100%; max-width: 800px; padding: 1rem; background: var(--color-bg-white);">
        <PeriodControl
          :periods="periods"
          :selected-period="selected"
          :compare-enabled="compare"
          :custom-range="customRange"
          @select="handleSelect"
          @toggle-compare="handleToggleCompare"
          @apply-custom="handleCustom"
        />
        <div style="margin-top: 1rem; font-size: 0.875rem; color: var(--color-text-muted);">
          Selected: {{ selected }} | Compare: {{ compare }} | Custom Range: {{ customRange }}
        </div>
      </div>
    `
  })
};
