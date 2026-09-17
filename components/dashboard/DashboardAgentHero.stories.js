import DashboardAgentHero from './DashboardAgentHero.vue';

export default {
  title: 'Domain/Dashboard/DashboardAgentHero',
  component: DashboardAgentHero,
  args: {
    userName: 'Alex'
  }
};

export const WithName = {};

export const Anonymous = {
  args: {
    userName: ''
  }
};
