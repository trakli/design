import RegisterCard from './RegisterCard.vue';

export default {
  title: 'Domain/Auth/RegisterCard',
  component: RegisterCard,
  args: {
    loading: false,
    loginTo: '/login'
  }
};

export const Default = {};

export const Loading = {
  args: { loading: true }
};
