import LoginCard from './LoginCard.vue';

export default {
  title: 'Domain/Auth/LoginCard',
  component: LoginCard,
  args: {
    loading: false,
    registerTo: '/register'
  }
};

export const Default = {};

export const Loading = {
  args: { loading: true }
};
