import CollapsibleSection from './CollapsibleSection.vue';
import { Settings } from 'lucide-vue-next';

export default {
  title: 'Settings/CollapsibleSection',
  component: CollapsibleSection,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' }
  }
};

export const OpenByDefault = {
  args: { title: 'Profile Settings', icon: Settings, defaultOpen: true },
  render: (args) => ({
    components: { CollapsibleSection },
    setup: () => ({ args }),
    template: `
      <CollapsibleSection v-bind="args">
        <p style="color: var(--color-text-secondary); margin: 0;">Section body content goes here.</p>
      </CollapsibleSection>
    `
  })
};

export const ClosedByDefault = {
  args: { title: 'Advanced Settings', icon: Settings, defaultOpen: false },
  render: (args) => ({
    components: { CollapsibleSection },
    setup: () => ({ args }),
    template: `
      <CollapsibleSection v-bind="args">
        <p style="color: var(--color-text-secondary); margin: 0;">Hidden until expanded.</p>
      </CollapsibleSection>
    `
  })
};
