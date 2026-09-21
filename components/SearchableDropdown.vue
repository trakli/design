<template>
  <div ref="dropdownRef" class="searchable-dropdown">
    <span v-if="label" class="dropdown-label">{{ label }}</span>
    <div class="dropdown-search">
      <div class="input-container" :class="{ 'is-focused': showDropdown, 'has-error': !!error }">
        <Search class="search-icon" />

        <!-- Multi-select chips inside input container -->
        <div v-if="multiple && selectedItems.length" class="input-chips">
          <span v-for="item in selectedItems" :key="getOptionKey(item)" class="input-chip">
            <span class="chip-text">{{ getOptionLabel(item) }}</span>
            <TButton
              type="button"
              variant="text"
              size="small"
              :full-width="false"
              class="input-chip-remove"
              aria-label="Remove item"
              @click.stop="removeSelectedItem(item)"
            >
              <X :size="12" />
            </TButton>
          </span>
        </div>

        <input
          type="text"
          :value="searchQuery"
          :placeholder="multiple && selectedItems.length ? '' : placeholder"
          :class="{ 'has-chips': multiple && selectedItems.length }"
          class="dropdown-input"
          @input="handleInput"
          @focus="showDropdown = true"
        />

        <TButton
          type="button"
          variant="text"
          size="small"
          :full-width="false"
          class="dropdown-toggle-btn"
          aria-label="Toggle options"
          @mousedown.prevent="toggleDropdown"
        >
          <ChevronDown :size="16" class="dropdown-icon" :class="{ 'is-open': showDropdown }" />
        </TButton>
      </div>
    </div>

    <!-- Dropdown List Overlay -->
    <ul v-if="showDropdown && filteredOptions.length" class="dropdown-list" role="listbox">
      <li
        v-for="option in filteredOptions"
        :key="getOptionKey(option)"
        class="dropdown-option"
        :class="{
          'selected-option': isSelected(option),
          disabled: isDisabled(option)
        }"
        role="option"
        :aria-selected="isSelected(option)"
        @mousedown.prevent="selectOption(option)"
      >
        <span class="option-content">
          <template
            v-for="(part, index) in getHighlightedParts(getOptionLabel(option))"
            :key="index"
          >
            <span :class="part.isMatch ? 'text-highlight' : 'text-secondary'">
              {{ part.text }}
            </span>
          </template>
        </span>
        <Check v-if="isSelected(option)" :size="16" class="selected-check" />
      </li>
    </ul>
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { Search, ChevronDown, Check, X } from 'lucide-vue-next';
import TButton from './TButton.vue';

const props = defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  modelValue: { type: [String, Array], default: '' },
  multiple: { type: Boolean, default: false },
  selected: { type: Array, default: () => [] },
  error: { type: String, default: '' },
  optionLabel: { type: String, default: 'name' },
  optionKey: { type: String, default: 'id' },
  disabled: { type: Function, default: () => false }
});

const emit = defineEmits(['update:modelValue', 'select', 'clear']);

const searchQuery = ref('');
const showDropdown = ref(false);
const selectedItems = ref([]);

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;
  const query = searchQuery.value.toLowerCase();
  return props.options.filter((option) => getOptionLabel(option).toLowerCase().includes(query));
});

function getOptionLabel(option) {
  return typeof option === 'string' ? option : option[props.optionLabel];
}

function getOptionKey(option) {
  return typeof option === 'string' ? option : option[props.optionKey];
}

function isSelected(option) {
  if (!props.multiple) return false;
  return selectedItems.value.some((item) => getOptionKey(item) === getOptionKey(option));
}

function isDisabled(option) {
  return props.disabled(option);
}

function handleInput(event) {
  searchQuery.value = event.target.value;
  emit('update:modelValue', searchQuery.value);
}

function toggleDropdown() {
  if (showDropdown.value && !searchQuery.value) {
    showDropdown.value = false;
  } else {
    searchQuery.value = '';
    emit('update:modelValue', '');
    emit('clear');
    showDropdown.value = true;
  }
}

function selectOption(option) {
  const label = getOptionLabel(option);

  if (props.multiple) {
    const key = getOptionKey(option);
    const index = selectedItems.value.findIndex((item) => getOptionKey(item) === key);

    if (index === -1) {
      selectedItems.value.push(option);
    } else {
      selectedItems.value.splice(index, 1);
    }

    const selectedIds = selectedItems.value.map((item) => getOptionKey(item));
    emit('update:modelValue', selectedIds);
    emit('select', selectedIds);
  } else {
    searchQuery.value = label;
    showDropdown.value = false;
    emit('update:modelValue', label);
    emit('select', option);
  }
}

function removeSelectedItem(item) {
  const index = selectedItems.value.findIndex(
    (selected) => getOptionKey(selected) === getOptionKey(item)
  );
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
    const selectedIds = selectedItems.value.map((i) => getOptionKey(i));
    emit('update:modelValue', selectedIds);
    emit('select', selectedIds);
  }
}

function getHighlightedParts(text) {
  const query = searchQuery.value.trim();
  if (!query) return [{ text, isMatch: false }];

  const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = [...text.matchAll(regex)];

  if (matches.length === 0) return [{ text, isMatch: false }];

  const result = [];
  let lastIndex = 0;

  for (const match of matches) {
    const start = match.index ?? 0;
    const end = start + match[0].length;

    if (start > lastIndex) {
      result.push({ text: text.slice(lastIndex, start), isMatch: false });
    }

    result.push({ text: text.slice(start, end), isMatch: true });
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), isMatch: false });
  }

  return result;
}

// Outside click handling
const dropdownRef = ref(null);

function handleOutsideClick(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (!props.multiple && typeof newValue === 'string') {
      searchQuery.value = newValue;
    }
  }
);

// Watch for external changes to selected (for multi-select initialization)
watch(
  () => props.selected,
  (newSelected) => {
    if (props.multiple && Array.isArray(newSelected) && props.options.length > 0) {
      selectedItems.value = props.options.filter((opt) => newSelected.includes(getOptionKey(opt)));
    }
  },
  { immediate: true }
);

// Re-initialize when options load
watch(
  () => props.options,
  () => {
    if (props.multiple && props.selected.length > 0 && props.options.length > 0) {
      selectedItems.value = props.options.filter((opt) =>
        props.selected.includes(getOptionKey(opt))
      );
    }
  }
);
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.searchable-dropdown {
  display: flex;
  flex-direction: column;
  gap: $spacing-1;
  position: relative;
  width: 100%;
}

.dropdown-label {
  font-size: $font-size-sm;
  font-weight: $font-medium;
  color: $text-primary;
}

.dropdown-search {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.input-container {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 44px;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  background-color: $bg-white;
  padding: 6px 12px;
  transition: border-color $duration-fast $easing-standard, box-shadow $duration-fast $easing-standard;

  &.is-focused {
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.15);
  }

  &.has-error {
    border-color: $error-color;
  }
}

.search-icon {
  width: 18px;
  height: 18px;
  color: $text-muted;
  margin-right: $spacing-2;
  flex-shrink: 0;
}

.input-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-right: $spacing-2;
}

.input-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: $primary;
  color: $text-inverse;
  border-radius: 999px;
  font-size: $font-size-xs;
  font-weight: $font-medium;
  white-space: nowrap;

  .chip-text {
    line-height: 1.2;
  }

  .input-chip-remove {
    padding: 0;
    min-height: auto;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: $text-inverse;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }
}

.dropdown-input {
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  padding: 4px 0;
  font-size: $font-size-sm;
  color: $text-primary;
  background: transparent;

  &.has-chips {
    min-width: 80px;
  }

  &::placeholder {
    color: $text-muted;
  }
}

.dropdown-toggle-btn {
  padding: 0;
  min-height: auto;
  width: 24px;
  height: 24px;
  margin-left: $spacing-1;
  color: $text-muted;

  &:hover {
    color: $primary;
  }
}

.dropdown-icon {
  transition: transform $duration-fast $easing-standard;

  &.is-open {
    transform: rotate(180deg);
  }
}

.dropdown-list {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: $bg-white;
  border: 1px solid $border-light;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
  list-style: none;
  padding: $spacing-1 0;
  margin: 0;
  z-index: $z-index-dropdown;
  max-height: 240px;
  overflow-y: auto;
}

.dropdown-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  cursor: pointer;
  transition: background-color $duration-fast $easing-standard;
  font-size: $font-size-sm;

  .text-highlight {
    color: $primary;
    font-weight: $font-semibold;
  }

  .text-secondary {
    color: $text-primary;
  }

  &:hover {
    background-color: $bg-light;
  }

  &.selected-option {
    background-color: rgba(var(--color-primary-rgb), 0.08);
    font-weight: $font-semibold;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .option-content {
    flex: 1;
  }

  .selected-check {
    color: $primary;
    margin-left: $spacing-2;
    flex-shrink: 0;
  }
}

.error-text {
  margin-top: 2px;
  color: $error-color;
  font-size: $font-size-xs;
}
</style>
