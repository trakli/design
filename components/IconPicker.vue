<template>
  <div ref="pickerRef" class="icon-picker">
    <div class="input-container" :class="{ 'is-focused': isFocused || showDropdown }">
      <component
        :is="selectedIconComponent"
        v-if="modelValue && selectedIconComponent"
        :key="`selected-${modelValue}`"
        class="selected-icon"
      />
      <input
        id="iconSearch"
        ref="searchInput"
        v-model="search"
        type="text"
        class="icon-search"
        :placeholder="modelValue ? '' : (placeholder || t('Search an icon here'))"
        @focus="handleInputFocus"
        @blur="isFocused = false"
      />
      <TButton
        v-if="modelValue"
        type="button"
        variant="text"
        size="small"
        :full-width="false"
        class="clear-icon-btn"
        :aria-label="clearLabel || t('Clear icon')"
        :title="clearLabel || t('Clear icon')"
        @click="clearSelection"
      >
        <X :size="14" class="clear-icon" />
      </TButton>

      <TButton
        type="button"
        variant="text"
        size="small"
        :full-width="false"
        class="dropdown-toggle-btn"
        :aria-label="toggleLabel || t('Toggle icon list')"
        :title="toggleLabel || t('Toggle icon list')"
        @click="toggleDropdown"
      >
        <ChevronDown v-if="!showDropdown" :size="14" class="chevron-icon" />
        <ChevronUp v-else :size="14" class="chevron-icon" />
      </TButton>
    </div>

    <Transition name="fade">
      <div v-if="showDropdown" ref="iconGrid" class="icon-grid">
        <button
          v-for="iconName in filteredIcons"
          :key="iconName"
          :class="['icon-btn', { selected: modelValue === iconName }]"
          type="button"
          tabindex="-1"
          @click.prevent="selectIcon(iconName)"
        >
          <component
            :is="loadedIconsValue[iconName]"
            v-if="loadedIconsValue[iconName]"
            :key="`grid-${iconName}`"
            class="icon-svg"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, shallowRef, toRef, nextTick } from 'vue';
import * as lucideIcons from 'lucide-vue-next';
import { X, ChevronDown, ChevronUp } from 'lucide-vue-next';
import TButton from './TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((key) => key);

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  clearLabel: { type: String, default: '' },
  toggleLabel: { type: String, default: '' }
});

const modelValue = toRef(props, 'modelValue');
const emit = defineEmits(['update:modelValue', 'change']);

// local state
const search = ref('');
const loadedIcons = shallowRef({});
const selectedIconComponent = shallowRef(null);
const allIconNames = ref([]);
const searchInput = ref(null);
const pickerRef = ref(null);
const iconGrid = ref(null);
const isFocused = ref(false);
const showDropdown = ref(false);

const loadedIconsValue = computed(() => loadedIcons.value || {});

// gather icon names on mount
onMounted(() => {
  try {
    allIconNames.value = Object.keys(lucideIcons).filter(
      (key) =>
        typeof lucideIcons[key] === 'function' &&
        key !== 'default' &&
        !key.startsWith('create') &&
        key[0] === key[0].toUpperCase()
    );
  } catch (err) {
    allIconNames.value = [];
  }

  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
  selectedIconComponent.value = null;
  loadedIcons.value = {};
});

const handleOutsideClick = (e) => {
  if (pickerRef.value && !pickerRef.value.contains(e.target)) {
    showDropdown.value = false;
  }
};

const handleInputFocus = () => {
  isFocused.value = true;
  showDropdown.value = true;
};

// computed filtered list
const filteredIcons = computed(() => {
  if (!allIconNames.value) return [];
  if (!search.value) return allIconNames.value.slice(0, 100);
  const q = search.value.toLowerCase();
  return allIconNames.value.filter((name) => name.toLowerCase().includes(q));
});

function getIconComponent(iconName) {
  try {
    const component = lucideIcons[iconName];
    return component && typeof component === 'function' ? component : null;
  } catch {
    return null;
  }
}

function loadIconComponent(iconName) {
  try {
    if (!iconName) return null;
    const currentLoaded = loadedIcons.value || {};
    if (!currentLoaded[iconName]) {
      const component = getIconComponent(iconName);
      if (component) {
        loadedIcons.value = { ...currentLoaded, [iconName]: component };
      }
    }
    return loadedIcons.value[iconName] || null;
  } catch {
    return null;
  }
}

watch(
  modelValue,
  (newValue) => {
    selectedIconComponent.value = newValue ? loadIconComponent(newValue) : null;
  },
  { immediate: true }
);

watch(
  filteredIcons,
  (newList) => {
    if (newList && newList.length > 0) {
      const iconsToLoad = newList.slice(0, 60);
      iconsToLoad.forEach((iconName) => {
        if (iconName) loadIconComponent(iconName);
      });
    }
  },
  { flush: 'post', immediate: true }
);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
}

function selectIcon(name) {
  if (!name) return;
  emit('update:modelValue', name);
  emit('change', name);
  search.value = '';
  showDropdown.value = false;
}

function clearSelection() {
  emit('update:modelValue', '');
  emit('change', '');
  search.value = '';
  nextTick(() => {
    searchInput.value?.focus();
  });
}
</script>

<style scoped lang="scss">
@use '../assets/scss/_vars.scss' as *;

.icon-picker {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.input-container {
  display: flex;
  align-items: center;
  border: 1.5px solid $border-light;
  border-radius: $radius-lg;
  padding: 0.375rem 0.5rem;
  background: $bg-white;
  min-height: 42px;
  gap: 0.375rem;
  transition: border-color $duration-fast $easing-standard, box-shadow $duration-fast $easing-standard;

  &.is-focused {
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.12);
  }

  @media (max-width: $breakpoint-sm) {
    padding: 0.25rem 0.375rem;
    min-height: 38px;
    gap: 0.25rem;
  }
}

.selected-icon {
  width: 20px;
  height: 20px;
  color: $primary;
  flex-shrink: 0;
}

.icon-search {
  flex: 1;
  border: none;
  outline: none;
  font-size: $font-size-sm;
  color: $text-primary;
  background: transparent;
  min-width: 0;
  padding: 0;

  &::placeholder {
    color: $text-muted;
  }
}

.clear-icon-btn,
.dropdown-toggle-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  min-height: auto;
  border-radius: $radius-sm;
  color: $text-muted;

  &:hover {
    color: $text-primary;
  }
}

.clear-icon-btn:hover {
  color: $error-color;
}

.icon-grid {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: $z-index-dropdown;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.375rem;
  background: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-lg;
  padding: 0.5rem;
  box-shadow: $elevation-3;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: repeat(5, 1fr);
    max-height: 180px;
  }
}

.icon-btn {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  background: $bg-white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all $duration-fast $easing-standard;

  &:hover {
    background: $bg-light;
    border-color: $primary;
  }

  &.selected {
    background: $primary;
    border-color: $primary;

    .icon-svg {
      color: $text-inverse;
    }
  }
}

.icon-svg {
  width: 1.125rem;
  height: 1.125rem;
  color: $text-secondary;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
