<template>
  <div class="period-control">
    <div class="period-chips">
      <TButton
        v-for="p in periods"
        :key="p.value"
        type="button"
        :variant="selectedPeriod === p.value ? 'primary' : 'secondary'"
        size="small"
        :full-width="false"
        class="period-chip"
        @click="$emit('select', p.value)"
      >
        {{ t(p.label) }}
      </TButton>

      <div class="custom-popover-wrapper">
        <TButton
          type="button"
          :variant="selectedPeriod === 'custom' ? 'primary' : 'secondary'"
          size="small"
          :full-width="false"
          class="period-chip period-chip--custom"
          @click="customOpen = !customOpen"
        >
          <template #left-icon>
            <Calendar :size="14" />
          </template>
          <span>{{
            selectedPeriod === 'custom' && customRange
              ? `${customRange.start} → ${customRange.end}`
              : t('Custom')
          }}</span>
          <ChevronDown :size="14" class="custom-chevron" :class="{ 'is-open': customOpen }" />
        </TButton>

        <Transition name="pop">
          <div v-if="customOpen" class="custom-popover" @click.stop>
            <label class="popover-row">
              <span>{{ t('From') }}</span>
              <input v-model="draftStart" type="date" class="popover-input" />
            </label>
            <label class="popover-row">
              <span>{{ t('To') }}</span>
              <input v-model="draftEnd" type="date" class="popover-input" />
            </label>
            <div class="popover-actions">
              <TButton
                variant="secondary"
                size="small"
                :full-width="false"
                @click="customOpen = false"
              >
                {{ t('Cancel') }}
              </TButton>
              <TButton
                variant="primary"
                size="small"
                :full-width="false"
                :disabled="!draftStart || !draftEnd"
                @click="applyCustom"
              >
                {{ t('Apply') }}
              </TButton>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="period-actions">
      <TButton
        type="button"
        :variant="compareEnabled ? 'primary' : 'secondary'"
        size="small"
        :full-width="false"
        :title="t('Compare to previous period')"
        @click="$emit('toggle-compare')"
      >
        <template #left-icon>
          <GitCompareArrows :size="14" />
        </template>
        {{ t('Compare') }}
      </TButton>

      <TButton
        type="button"
        variant="secondary"
        size="small"
        :full-width="false"
        :title="t('Open monthly recap')"
        @click="$emit('open-review')"
      >
        <template #left-icon>
          <Sparkles :size="14" />
        </template>
        {{ t('Recap') }}
      </TButton>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Calendar, ChevronDown, GitCompareArrows, Sparkles } from 'lucide-vue-next';
import TButton from '../TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  periods: { type: Array, required: true },
  selectedPeriod: { type: String, required: true },
  compareEnabled: { type: Boolean, default: false },
  customRange: { type: Object, default: null }
});

const emit = defineEmits(['select', 'toggle-compare', 'open-review', 'apply-custom']);

const customOpen = ref(false);
const draftStart = ref(props.customRange?.start || '');
const draftEnd = ref(props.customRange?.end || '');

watch(
  () => props.customRange,
  (r) => {
    draftStart.value = r?.start || '';
    draftEnd.value = r?.end || '';
  }
);

const applyCustom = () => {
  if (!draftStart.value || !draftEnd.value) return;
  emit('apply-custom', { start: draftStart.value, end: draftEnd.value });
  customOpen.value = false;
};

const handleDocumentClick = (e) => {
  if (!e.target.closest('.custom-popover-wrapper')) {
    customOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.period-control {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-3;
  padding: $spacing-2 $spacing-3;
  background: transparent;
  border-bottom: 1px solid $border-color;
  width: 100%;
}

.period-chips {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $spacing-1;
  position: relative;
}

.period-chip {
  border-radius: 999px;
  height: 32px;
  padding: 0 $spacing-3;
}

.custom-popover-wrapper {
  position: relative;
  display: inline-block;
}

.custom-chevron {
  margin-left: 4px;
  transition: transform $duration-fast $easing-standard;

  &.is-open {
    transform: rotate(180deg);
  }
}

.period-actions {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  flex-wrap: wrap;
}

.custom-popover {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: $z-index-popover;
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: $radius-xl;
  padding: $spacing-3;
  box-shadow: $elevation-3;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
}

.popover-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-2;
  font-size: $font-size-sm;
  color: $text-secondary;
}

.popover-input {
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 4px 8px;
  font: inherit;
  font-size: $font-size-xs;
  background: $bg-light;
  color: $text-primary;

  &:focus {
    outline: none;
    border-color: $primary;
  }
}

.popover-actions {
  display: flex;
  justify-content: flex-end;
  gap: $spacing-2;
  margin-top: $spacing-1;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    opacity $duration-fast $easing-standard,
    transform $duration-fast $easing-decelerate;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}

@media (max-width: $breakpoint-sm) {
  .period-control {
    flex-direction: column;
    align-items: stretch;
  }
  .period-actions,
  .period-chips {
    justify-content: flex-start;
  }
}
</style>
