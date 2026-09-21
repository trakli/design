import AuthSocialLogin from './AuthSocialLogin.vue';

export default {
  title: 'Auth/AuthSocialLogin',
  component: AuthSocialLogin,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['login', 'signup'] }
  }
};

export const Login  = { args: { mode: 'login' } };
export const Signup = { args: { mode: 'signup' } };
