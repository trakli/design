import ContentCard from './ContentCard.vue';

export default {
  title: 'Components/ContentCard',
  component: ContentCard,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    isDefault: { control: 'boolean' },
    typeBadge: { control: 'text' },
    typeBadgeLabel: { control: 'text' }
  }
};

export const Default = {
  args: {
    name: 'Personal Wallet',
    icon: 'Wallet',
    description: 'Main everyday spending account',
    editLabel: 'Edit wallet',
    deleteLabel: 'Delete wallet'
  }
};

export const DefaultItem = {
  args: {
    name: 'Primary Account',
    icon: 'CreditCard',
    description: 'Your default linked bank account',
    isDefault: true,
    defaultBadgeLabel: 'Default',
    editLabel: 'Edit account',
    deleteLabel: 'Delete account'
  }
};

export const WithTypeBadge = {
  args: {
    name: 'Groceries',
    icon: 'ShoppingCart',
    description: 'Food and household items',
    typeBadge: 'expense',
    typeBadgeLabel: 'Expense',
    editLabel: 'Edit category',
    deleteLabel: 'Delete category'
  }
};

export const WithoutIcon = {
  args: {
    name: 'Miscellaneous',
    description: 'Uncategorized spending',
    typeBadge: 'expense',
    typeBadgeLabel: 'Expense',
    editLabel: 'Edit',
    deleteLabel: 'Delete'
  }
};
