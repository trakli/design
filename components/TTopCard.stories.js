import TTopCard from './TTopCard.vue';
import TButton from './TButton.vue';

export default {
  title: 'Components/TTopCard',
  component: TTopCard,
  tags: ['autodocs'],
  argTypes: {
    pageName: { control: 'text' },
    pageNamePlural: { control: 'text' },
    showAddButton: { control: 'boolean' },
    showInfoButton: { control: 'boolean' },
    buttonText: { control: 'text' }
  }
};

export const Wallets = {
  args: {
    pageName: 'Wallet',
    pageNamePlural: 'Wallets',
    showAddButton: true,
    showInfoButton: true
  }
};

export const Transactions = {
  args: {
    pageName: 'Transaction',
    pageNamePlural: 'Transactions',
    buttonText: 'New Transaction',
    showAddButton: true,
    showInfoButton: true
  }
};

export const WithCustomActions = {
  args: {
    pageName: 'Category',
    pageNamePlural: 'Categories',
    showAddButton: true
  },
  render: (args) => ({
    components: { TTopCard, TButton },
    setup: () => ({ args }),
    template: `
      <TTopCard v-bind="args">
        <template #actions>
          <TButton variant="secondary" text="Export CSV" />
        </template>
      </TTopCard>
    `
  })
};
