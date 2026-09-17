<template>
  <div class="register-card">
    <div class="register-header">
      <Logo size="medium" />
      <h1 class="title">{{ t('Create an account') }}</h1>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">
            {{ t('First Name') }}
            <span class="required">*</span>
          </label>
          <TInput
            v-model="form.firstName"
            type="text"
            :placeholder="t('Enter first name')"
            :full-width="true"
            autocomplete="given-name"
          />
        </div>
        <div class="form-group">
          <label class="form-label">
            {{ t('Last Name') }}
          </label>
          <TInput
            v-model="form.lastName"
            type="text"
            :placeholder="t('Enter last name')"
            :full-width="true"
            autocomplete="family-name"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">
            {{ t('Email') }}
            <span class="required">*</span>
          </label>
          <TInput
            v-model="form.email"
            type="email"
            :placeholder="t('Enter email')"
            :full-width="true"
            autocomplete="email"
          />
        </div>
        <div class="form-group">
          <label class="form-label">{{ t('Phone Number') }}</label>
          <TInput
            v-model="form.phone"
            type="tel"
            :placeholder="t('Enter phone number')"
            :full-width="true"
            autocomplete="tel"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">{{ t('Username') }}</label>
          <TInput
            v-model="form.username"
            type="text"
            :placeholder="t('Choose username')"
            :full-width="true"
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <label class="form-label">
            {{ t('Password') }}
            <span class="required">*</span>
          </label>
          <TInput
            v-model="form.password"
            type="password"
            :placeholder="t('Create password')"
            :full-width="true"
            autocomplete="new-password"
          />
        </div>
      </div>

      <div class="button-container">
        <TButton
          type="submit"
          variant="primary"
          size="large"
          :full-width="true"
          :loading="loading"
        >
          {{ t('Register') }}
        </TButton>
      </div>

      <AuthFooterLink
        :text="t('Already have an account?')"
        :link-text="t('Login')"
        :to="loginTo"
      />
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
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
  loginTo: {
    type: String,
    default: '/login'
  }
});

const emit = defineEmits(['submit']);

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
  password: ''
});

const handleSubmit = () => {
  emit('submit', { ...form });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.register-card {
  background-color: $bg-white;
  border-radius: $radius-xl;
  border: 1px solid $border-medium;
  box-shadow: $shadow-sm;
  padding: $spacing-8;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: $breakpoint-sm) {
    padding: $spacing-6 $spacing-4;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
}

.register-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: $spacing-6;
}

.title {
  font-size: $font-size-2xl;
  font-weight: $font-bold;
  color: $text-primary;
  margin: $spacing-4 0 0;
  text-align: center;

  @media (max-width: $breakpoint-sm) {
    font-size: $font-size-xl;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-5;
}

.form-row {
  display: flex;
  gap: $spacing-4;
  width: 100%;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: $spacing-3;
  }
}

.form-group {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.form-label {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: $text-secondary;
  display: flex;
  align-items: center;
  gap: $spacing-1;
}

.required {
  color: $error-color;
  font-weight: $font-bold;
  line-height: 1;
}

.button-container {
  margin-top: $spacing-4;
  width: 100%;
}
</style>
