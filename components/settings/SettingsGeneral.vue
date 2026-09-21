<template>
  <div>
    <div class="section-grid">
      <div class="form-group">
        <label class="form-label">{{ t('Default Language') }}</label>
        <select v-if="isEditMode" v-model="languageCode" class="form-select">
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.code.toUpperCase() }} - {{ lang.label }}
          </option>
        </select>
        <p v-else class="text-display">{{ languageLabel }}</p>
      </div>

      <div class="form-group">
        <label class="form-label">{{ t('Current Currency') }}</label>
        <select v-if="isEditMode" v-model="currencyCode" class="form-select">
          <option v-for="c in currencies" :key="c.code" :value="c.code">
            {{ c.code }} - {{ c.label }}
          </option>
        </select>
        <p v-else class="text-display">{{ currencyLabel }}</p>
      </div>
    </div>

    <div v-if="isEditMode" class="actions">
      <TButton variant="primary" :full-width="false" class="submit-btn" @click="handleSave">
        <Save class="inline-icon" />
        <span>{{ t('Update General Settings') }}</span>
      </TButton>
      <p v-if="message" class="success-text">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { Save } from 'lucide-vue-next';

const currencies = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'JPY', label: 'Japanese Yen' },
  { code: 'CAD', label: 'Canadian Dollar' },
  { code: 'AUD', label: 'Australian Dollar' },
  { code: 'XAF', label: 'Central African CFA Franc' },
  { code: 'XOF', label: 'West African CFA Franc' },
  { code: 'NGN', label: 'Nigerian Naira' },
  { code: 'GHS', label: 'Ghanaian Cedi' },
  { code: 'KES', label: 'Kenyan Shilling' },
  { code: 'ZAR', label: 'South African Rand' },
  { code: 'INR', label: 'Indian Rupee' },
  { code: 'CNY', label: 'Chinese Yuan' },
  { code: 'BRL', label: 'Brazilian Real' },
  { code: 'MXN', label: 'Mexican Peso' },
  { code: 'CHF', label: 'Swiss Franc' }
];

import TButton from '../TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  isEditMode: { type: Boolean, default: false },
  language: { type: String, default: 'en' },
  currency: { type: String, default: 'USD' }
});

const emit = defineEmits(['save']);

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' }
];

const languageCode = ref(props.language);
const currencyCode = ref(props.currency);
const message = ref('');

const languageLabel = computed(() => {
  const found = languages.find((l) => l.code === languageCode.value);
  return found ? found.label : languageCode.value;
});

const currencyLabel = computed(() => {
  const found = currencies.find((c) => c.code === currencyCode.value);
  return found ? found.label : currencyCode.value;
});

watch(
  () => props.isEditMode,
  () => {
    message.value = '';
  }
);

const handleSave = () => {
  emit('save', { language: languageCode.value, currency: currencyCode.value });
  message.value = t('General settings updated successfully!');
  setTimeout(() => {
    message.value = '';
  }, 2000);
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.section-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.text-display {
  padding: 0.75rem 1rem;
  border-radius: $radius-lg;
  background: $bg-gray;
  color: $text-primary;
  font-weight: $font-medium;
}

.inline-icon {
  width: 18px;
  height: 18px;
}

.actions {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-text {
  margin-top: 0.75rem;
  color: $primary;
  font-weight: $font-semibold;
}
</style>
