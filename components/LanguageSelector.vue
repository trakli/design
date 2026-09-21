<template>
  <TDropdown class="language-selector">
    <template #trigger>
      <TButton
        type="button"
        variant="secondary"
        :full-width="false"
        class="language-selector-trigger"
        :aria-label="currentLanguage.name"
        :title="currentLanguage.name"
      >
        <img :src="currentLanguage.flagUrl" :alt="currentLanguage.name" class="flag-icon" />
      </TButton>
    </template>

    <div class="language-dropdown-inner">
      <div class="dropdown-header">
        <h3>{{ headerTitle || t('Language') }}</h3>
      </div>
      <TDivider orientation="horizontal" />
      <div class="language-list">
        <TDropdownItem
          v-for="lang in availableLanguages"
          :key="lang.code"
          class="language-item"
          :class="{ active: currentLocale === lang.code }"
          @click="selectLanguage(lang.code)"
        >
          <img :src="lang.flagUrl" :alt="lang.name" class="flag-icon" />
          <span class="language-name">{{ lang.name }}</span>
          <Check v-if="currentLocale === lang.code" class="check-icon" />
        </TDropdownItem>
      </div>
    </div>
  </TDropdown>
</template>

<script setup>
import { computed } from 'vue';
import { Check } from 'lucide-vue-next';
import TDropdown from './TDropdown.vue';
import TDropdownItem from './TDropdownItem.vue';
import TButton from './TButton.vue';
import TDivider from './TDivider.vue';

// Bundled static flag imports so consumers don't rely on unbundled host paths
import flagGb from '../assets/flags/gb.svg';
import flagFr from '../assets/flags/fr.svg';
import flagDe from '../assets/flags/de.svg';
import flagEs from '../assets/flags/es.svg';
import flagPt from '../assets/flags/pt.svg';
import flagIt from '../assets/flags/it.svg';

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined
  },
  headerTitle: {
    type: String,
    default: ''
  },
  languages: {
    type: Array,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'select']);

const defaultLanguages = [
  { code: 'en', name: 'English', flagUrl: flagGb },
  { code: 'fr', name: 'Français', flagUrl: flagFr },
  { code: 'de', name: 'Deutsch', flagUrl: flagDe },
  { code: 'es', name: 'Español', flagUrl: flagEs },
  { code: 'pt', name: 'Português', flagUrl: flagPt },
  { code: 'it', name: 'Italiano', flagUrl: flagIt }
];

const availableLanguages = computed(() => (props.languages && props.languages.length ? props.languages : defaultLanguages));

// Optional useI18n fallback if available in consumer context
const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const currentLocale = computed(() => {
  if (props.modelValue !== undefined) return props.modelValue;
  if (i18n?.locale?.value) return i18n.locale.value;
  return 'en';
});

const currentLanguage = computed(() => {
  return availableLanguages.value.find((lang) => lang.code === currentLocale.value) || availableLanguages.value[0];
});

const selectLanguage = (code) => {
  if (i18n?.setLocale) {
    i18n.setLocale(code);
  }
  emit('update:modelValue', code);
  emit('select', code);
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.language-selector {
  display: inline-block;
}

.language-selector-trigger {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
}

.flag-icon {
  width: 20px;
  height: 15px;
  border-radius: 2px;
  object-fit: cover;
}

.language-dropdown-inner {
  width: 240px;

  @media (max-width: $breakpoint-sm) {
    width: calc(100vw - 32px);
  }
}

.dropdown-header {
  padding: 1rem;

  h3 {
    margin: 0;
    font-size: $font-size-base;
    font-weight: $font-semibold;
    color: $text-primary;
  }
}

.language-list {
  max-height: 320px;
  overflow-y: auto;
  padding: 0.25rem 0;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &.active {
    background: rgba(var(--color-primary-rgb), 0.08);
    color: $primary;
    font-weight: $font-semibold;
  }

  .language-name {
    flex: 1;
    text-align: left;
    font-size: $font-size-sm;
  }

  .check-icon {
    width: 16px;
    height: 16px;
    color: $primary;
  }
}
</style>
