import TTransactionSubCard from './TTransactionSubCard.vue';

export default {
  title: 'Components/TTransactionSubCard',
  component: TTransactionSubCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    text: { control: 'text' },
    currency: { control: 'text' },
    titleColor: { control: 'color' },
    textColor: { control: 'color' }
  }
};

export const Default = {
  args: {
    title: '142',
    text: 'Total Transactions'
  }
};

export const WithCurrency = {
  args: {
    title: '3,450',
    currency: 'USD',
    text: 'Total Volume',
    titleColor: 'var(--color-primary)'
  }
};
