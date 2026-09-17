import PartiesStatsStrip from './PartiesStatsStrip.vue';

const parties = [
  { id: 1, name: 'Acme Corp', receivedAmount: 0, spentAmount: 4200 },
  { id: 2, name: 'Alice Johnson', receivedAmount: 6800, spentAmount: 120 },
  { id: 3, name: 'SaaS Tooling Inc', receivedAmount: 0, spentAmount: 890 },
  { id: 4, name: 'Robert Davis', receivedAmount: 2500, spentAmount: 0 }
];

export default {
  title: 'Domain/Parties/PartiesStatsStrip',
  component: PartiesStatsStrip,
  args: {
    parties,
    currency: 'USD'
  }
};

export const Default = {};

export const NetNegative = {
  args: {
    parties: [
      { id: 1, name: 'Big Vendor', receivedAmount: 0, spentAmount: 9500 },
      { id: 2, name: 'Small Client', receivedAmount: 1200, spentAmount: 0 }
    ]
  }
};

export const Empty = {
  args: { parties: [] }
};
