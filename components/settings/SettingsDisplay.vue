<template>
  <div>
    <div class="toggle-row">
      <div class="toggle-label">
        <component :is="isDark ? Sun : Moon" class="inline-icon" />
        <span>{{ isDark ? t('Light') : t('Dark') }} {{ t('Mode') }}</span>
      </div>
      <TButton
        variant="text"
        size="small"
        :full-width="false"
        class="toggle"
        :class="{ 'toggle--on': isDark }"
        @click="toggleTheme"
      >
        <span class="toggle-circle" />
      </TButton>
    </div>

    <div class="toggle-row" style="margin-top: 0.75rem">
      <div class="toggle-label">
        <MessageSquare class="inline-icon" />
        <span>{{ t('Chat-first landing') }}</span>
      </div>
      <TButton
        variant="text"
        size="small"
        :full-width="false"
        class="toggle"
        :class="{ 'toggle--on': chatFirst }"
        :disabled="savingLanding"
        @click="toggleLanding"
      >
        <span class="toggle-circle" />
      </TButton>
    </div>
    <p class="hint">{{ t('Open the AI chat as your home screen instead of the dashboard.') }}</p>
  </div>
</template>

<script setup>
import { Sun, Moon, MessageSquare } from 'lucide-vue-next';

import TButton from '../TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

defineProps({
  isDark: { type: Boolean, default: false },
  chatFirst: { type: Boolean, default: false },
  savingLanding: { type: Boolean, default: false }
});

const emit = defineEmits(['toggle-theme', 'toggle-landing']);

const toggleTheme = () => emit('toggle-theme');
const toggleLanding = () => emit('toggle-landing');
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: $radius-lg;
  background: $bg-gray;
}

.toggle-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: $font-semibold;
  color: $text-primary;
}

.toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  height: 24px;
  width: 44px;
  border-radius: 999px;
  background: $primary-toggle;
  transition: $transition-base;

  &--on {
    background: $primary;
  }
}

.toggle-circle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: $bg-white;
  border-radius: 50%;
  box-shadow: $shadow-sm;
  transition: transform 0.2s ease-in-out;
}

.toggle.toggle--on .toggle-circle {
  transform: translateX(20px);
}

.inline-icon {
  width: 18px;
  height: 18px;
}

.hint {
  margin: 0.5rem 0 0;
  padding: 0 1rem;
  font-size: $font-size-xs;
  color: $text-muted;
}

.toggle:disabled {
  opacity: 0.6;
  cursor: default;
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
