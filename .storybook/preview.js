// Default token values so components are themed in isolation.
import '../assets/css/tokens.css';

import { setup } from '@storybook/vue3';
import { h, ref } from 'vue';

// Minimal en translations for storybook preview
const messages = {
  'Sign in with Google': 'Sign in with Google',
  'Sign up with Google': 'Sign up with Google',
  'Theme': 'Theme',
  'Light': 'Light',
  'Dark': 'Dark',
  'System': 'System',
  'Language': 'Language',
  'Cancel': 'Cancel',
  'Confirm': 'Confirm',
  'carousel.ai.title': 'Just ask',
  'carousel.ai.text': 'Log expenses, build reports and get answers by chatting with your assistant in plain language.',
  'carousel.integrations.title': 'Connect your bank',
  'carousel.integrations.text': 'Link accounts with Plaid and import statements, so your transactions flow in on their own.',
  'carousel.import.title': 'Import anything',
  'carousel.import.text': 'Drop in a statement in any format and the assistant reads it, structured or not, into clean transactions.',
  'carousel.welcome.title': "Sit back, we've got this",
  'carousel.welcome.text': "You handle life. Trakli wrangles the receipts, the math and the mess. Welcome aboard!"
};

const locale = ref('en');
const t = (key) => messages[key] || key;
const setLocale = (l) => { locale.value = l; };

// Provide global nuxt helper stand-ins so components can render cleanly in Storybook
window.useI18n = () => ({ t, locale, setLocale });
window.useCookie = () => ref('mock-cookie');
window.useApi = () => async () => ({ data: {} });

setup((app) => {
  app.config.globalProperties.t = t;
  app.config.globalProperties.locale = locale;
  app.config.globalProperties.setLocale = setLocale;

  app.component('NuxtLink', {
    props: { to: { type: [String, Object], default: '#' } },
    setup(props, { slots }) {
      return () => h('a', { href: typeof props.to === 'string' ? props.to : '#' }, slots.default?.());
    },
  });
});

/** @type { import('@storybook/vue3').Preview } */
export default {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'centered',
  },
};
