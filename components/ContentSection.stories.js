import ContentSection from './ContentSection.vue';
import TButton from './TButton.vue';
import TCard from './TCard.vue';

export default {
  title: 'Components/ContentSection',
  component: ContentSection,
  tags: ['autodocs'],
  argTypes: {
    pageName: { control: 'text' },
    pageNamePlural: { control: 'text' },
    empty: { control: 'boolean' },
    modelValue: { control: 'boolean' }
  }
};

export const Default = {
  args: {
    pageName: 'Category',
    pageNamePlural: 'Categories',
    empty: false,
    modelValue: false
  },
  render: (args) => ({
    components: { ContentSection, TCard },
    setup: () => ({ args }),
    template: `
      <ContentSection v-bind="args">
        <TCard style="width: 100%; text-align: center; padding: 2rem;">
          <p style="margin: 0; color: var(--color-text-secondary);">Table or card view mounts here in default slot.</p>
        </TCard>
      </ContentSection>
    `
  })
};

export const EmptyStateExample = {
  args: {
    pageName: 'Wallet',
    pageNamePlural: 'Wallets',
    empty: true,
    modelValue: false
  }
};

export const WithSlottedForm = {
  args: {
    pageName: 'Group',
    pageNamePlural: 'Groups',
    modelValue: true
  },
  render: (args) => ({
    components: { ContentSection, TCard, TButton },
    setup: () => ({ args }),
    template: `
      <ContentSection v-bind="args">
        <template #form="{ close }">
          <TCard style="padding: 1.5rem;">
            <h3>Create New Group</h3>
            <p style="color: var(--color-text-muted);">Form inputs live here...</p>
            <div style="margin-top: 1rem; display: flex; gap: 8px;">
              <TButton variant="primary" text="Save" />
              <TButton variant="secondary" text="Cancel" @click="close" />
            </div>
          </TCard>
        </template>
        <template #tips>
          <TCard style="padding: 1.5rem;">
            <h4>Tips</h4>
            <p style="font-size: 0.875rem; color: var(--color-text-muted);">Organize wallets into groups for family or business.</p>
          </TCard>
        </template>
      </ContentSection>
    `
  })
};
