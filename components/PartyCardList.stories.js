import PartyCardList from './PartyCardList.vue';

const sampleParties = [
  {
    id: 1,
    name: 'Acme Corp',
    type: 'business',
    description: 'Cloud services and server infrastructure vendor.',
    receivedAmount: 0,
    spentAmount: 4200.0,
    lastUpdated: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 2,
    name: 'Alice Johnson',
    type: 'client',
    description: 'Design consulting retainer.',
    receivedAmount: 6800.0,
    spentAmount: 120.0,
    lastUpdated: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 3,
    name: 'Robert Davis',
    type: 'individual',
    description: 'Subcontractor - mobile developer.',
    receivedAmount: 0,
    spentAmount: 2500.0,
    lastUpdated: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 4,
    name: 'SaaS Tooling Inc',
    type: 'vendor',
    description: 'Analytics and error monitoring licenses.',
    receivedAmount: 0,
    spentAmount: 890.0,
    lastUpdated: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

export default {
  title: 'Domain/Parties/PartyCardList',
  component: PartyCardList,
  args: {
    title: 'All Contacts & Parties',
    parties: sampleParties,
    currency: 'USD'
  }
};

export const Default = {};

export const EmptyState = {
  args: {
    parties: []
  }
};
