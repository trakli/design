<template>
  <div class="content-section-layout">
    <slot name="header">
      <TTopCard
        v-if="!showForm && pageName && pageNamePlural"
        :page-name="pageName"
        :page-name-plural="pageNamePlural"
        @add="openForm"
      />
    </slot>

    <div class="content-area">
      <div v-if="showForm" class="form-section">
        <div class="form-wrapper">
          <slot name="form" :close="closeForm" />
        </div>
        <div v-if="$slots.tips" class="tips-wrapper">
          <slot name="tips" />
        </div>
      </div>

      <slot v-else :open-form="openForm">
        <EmptyState
          v-if="empty && pageName"
          :page-name="pageName"
          @create="openForm"
        />
      </slot>
    </div>

    <div v-if="$slots.footer" class="footer-section">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import TTopCard from './TTopCard.vue';
import EmptyState from './EmptyState.vue';

const props = defineProps({
  pageName: {
    type: String,
    default: ''
  },
  pageNamePlural: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  empty: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'open', 'close']);

const showForm = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    showForm.value = val;
  }
);

const openForm = () => {
  showForm.value = true;
  emit('update:modelValue', true);
  emit('open');
};

const closeForm = () => {
  showForm.value = false;
  emit('update:modelValue', false);
  emit('close');
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.content-section-layout {
  width: 100%;
}

.content-area {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;

  @media (max-width: $breakpoint-md) {
    margin-top: 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: $breakpoint-sm) {
    margin-top: 1rem;
    gap: 1rem;
  }
}

.form-section {
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  width: 100%;
  max-width: 1400px;
  align-self: center;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: $breakpoint-lg) {
    gap: 2rem;
    padding: 0 0.75rem;
  }

  @media (max-width: $breakpoint-md) {
    gap: 1.5rem;
    padding: 0 0.5rem;
  }

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 0.25rem;
  }
}

.form-wrapper {
  flex: 1;
  min-width: 0;
  max-width: 800px;

  @media (max-width: $breakpoint-sm) {
    max-width: 100%;
    width: 100%;
  }
}

.tips-wrapper {
  flex-shrink: 0;
  width: 340px;

  @media (max-width: $breakpoint-lg) {
    width: 280px;
  }

  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

.footer-section {
  display: flex;
  justify-content: center;
  margin-top: 6rem;
}
</style>
