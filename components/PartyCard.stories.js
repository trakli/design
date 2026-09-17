import PartyCard from './PartyCard.vue';

export default {
  title: 'Domain/Parties/PartyCard',
  component: PartyCard,
  args: {
    party: {
      id: 1,
      name: 'Acme Corporation',
      type: 'business',
      description: 'Primary supplier for cloud infrastructure and hosting services.',
      receivedAmount: 0,
      spentAmount: 3450.0,
      lastUpdated: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    currency: 'USD'
  }
};

export const BusinessVendor = {};

export const IndividualClient = {
  args: {
    party: {
      id: 2,
      name: 'Sarah Jenkins',
      type: 'client',
      description: 'Consulting client - monthly retainer.',
      receivedAmount: 5200.0,
      spentAmount: 150.0,
      lastUpdated: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
    }
  }
};

export const InactiveParty = {
  args: {
    party: {
      id: 3,
      name: 'Legacy Partner',
      type: 'organization',
      description: 'No transactions in current period.',
      receivedAmount: 0,
      spentAmount: 0,
      lastUpdated: null
    }
  }
};
