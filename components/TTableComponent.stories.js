import TTableComponent from './TTableComponent.vue';
import { ref } from 'vue';

export default {
  title: 'Components/TTableComponent',
  component: TTableComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    showHeader: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    showTotals: { control: 'boolean' },
    showPagination: { control: 'boolean' }
  }
};

const sampleTransactions = [
  {
    id: 1,
    date: '2026-09-01',
    time: '14:30',
    type: 'EXPENSE',
    party: 'Whole Foods Market',
    amount: '84.50 USD',
    category: 'Groceries'
  },
  {
    id: 2,
    date: '2026-09-02',
    time: '09:15',
    type: 'INCOME',
    party: 'Acme Corp',
    amount: '3200.00 USD',
    category: 'Salary'
  },
  {
    id: 3,
    date: '2026-09-03',
    time: '19:45',
    type: 'EXPENSE',
    party: 'Starbucks',
    amount: '6.75 USD',
    category: 'Coffee',
    isRecurring: true
  },
  {
    id: 4,
    date: '2026-09-04',
    time: '11:00',
    type: 'EXPENSE',
    party: 'Apex Gym',
    amount: '65.00 USD',
    category: 'Fitness',
    isRecurring: true
  },
  {
    id: 5,
    date: '2026-09-05',
    time: '16:20',
    type: 'INCOME',
    party: 'Refund Service',
    amount: '45.00 USD',
    category: 'Shopping',
    isRefund: true
  }
];

export const Default = {
  render: (args) => ({
    components: { TTableComponent },
    setup() {
      const search = ref('');
      const page = ref(1);
      return { args, sampleTransactions, search, page };
    },
    template: `
      <div style="padding: 24px; max-width: 960px;">
        <TTableComponent
          v-bind="args"
          :transactions="sampleTransactions"
          :total-entries="sampleTransactions.length"
          :current-page="page"
          v-model:search-query="search"
          @page-change="page = $event"
        />
      </div>
    `
  })
};

export const Empty = {
  args: {
    transactions: [],
    totalEntries: 0,
    emptyText: 'No transactions recorded for this period'
  }
};
