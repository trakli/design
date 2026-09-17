<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-content">
        <div class="login-header">
          <Logo size="medium" />
          <h1 class="title">{{ t('Login') }}</h1>
        </div>

        <div class="login-form-container">
          <form class="login-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="login-username" class="form-label">{{ t('Username') }}</label>
              <TInput
                id="login-username"
                v-model="username"
                type="text"
                :placeholder="t('Enter your username')"
                :full-width="true"
                autocomplete="username"
              />
            </div>

            <div class="form-group">
              <label for="login-password" class="form-label">{{ t('Password') }}</label>
              <TInput
                id="login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('Enter your password')"
                :full-width="true"
                autocomplete="current-password"
              >
                <template #suffix>
                  <button
                    type="button"
                    class="password-toggle"
                    :aria-label="showPassword ? t('Hide password') : t('Show password')"
                    @click="showPassword = !showPassword"
                  >
                    <EyeOff v-if="showPassword" :size="18" />
                    <Eye v-else :size="18" />
                  </button>
                </template>
              </TInput>
            </div>

            <div class="button-container">
              <TButton
                type="submit"
                :text="t('Login')"
                variant="primary"
                size="large"
                :full-width="true"
                :loading="loading"
              />
            </div>

            <AuthFooterLink
              :text="t('Don\'t have an account?')"
              :link-text="t('Sign up')"
              :to="registerTo"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
import TButton from './TButton.vue';
import TInput from './TInput.vue';
import AuthFooterLink from './AuthFooterLink.vue';
import Logo from './Logo.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  registerTo: {
    type: String,
    default: '/register'
  }
});

const emit = defineEmits(['submit']);

const username = ref('');
const password = ref('');
const showPassword = ref(false);

const handleSubmit = () => {
  emit('submit', {
    username: username.value,
    password: password.value
  });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $spacing-6 0;
}

.login-card {
  background-color: $bg-white;
  width: 100%;
  max-width: 480px;
  border-radius: $radius-xl;
  border: 1px solid $border-medium;
  margin: $spacing-10 $spacing-4;
  box-shadow: $shadow-sm;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: $spacing-12 $spacing-10;

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-8 $spacing-4;
  }
}

.login-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: $spacing-8;
}

.title {
  color: $text-primary;
  font-size: $font-size-2xl;
  font-weight: $font-bold;
  margin: $spacing-4 0 0;
}

.login-form-container {
  width: 100%;
  max-width: 400px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-5;
  width: 100%;
}

.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.form-label {
  display: block;
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: $text-secondary;
}

.password-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: $spacing-1;
  border-radius: $radius-sm;
  color: $text-muted;
  transition: color $duration-fast $easing-standard, background-color $duration-fast $easing-standard;
  line-height: 0;

  &:hover {
    background-color: rgba(var(--color-primary-rgb), 0.08);
    color: $primary;
  }

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 1px;
  }
}

.button-container {
  margin-top: $spacing-2;
  width: 100%;
}
</style>
