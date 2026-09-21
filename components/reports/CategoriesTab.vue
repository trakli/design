<template>
  <section class="categories-tab">
    <header class="tab-header">
      <div>
        <p class="eyebrow">{{ t('Categories') }}</p>
        <h2 class="title">{{ t('Where things come from and go to') }}</h2>
        <p class="sub">
          {{ t('Income on one side, expense on the other. Click any row to drill in.') }}
        </p>
      </div>
      <TInput v-model="query" class="search-input" :placeholder="t('Filter by name')">
        <template #prefix>
          <Search :size="14" />
        </template>
      </TInput>
    </header>

    <div class="grid">
      <div class="col col--income">
        <CategoryRanking
          :title="t('Income categories')"
          :subtitle="t('{n} categories with income in this period', { n: filteredIncome.length })"
          :buckets="filteredIncome"
          :show-delta="compareEnabled"
          :currency="currency"
          :formatter="formatter"
          @drill="(b) => $emit('drill', { ...b, kind: 'income' })"
        />
      </div>
      <div class="col col--expense">
        <CategoryRanking
          :title="t('Expense categories')"
          :subtitle="
            t('{n} categories with spending in this period', { n: filteredExpense.length })
          "
          :buckets="filteredExpense"
          :show-delta="compareEnabled"
          :currency="currency"
          :formatter="formatter"
          @drill="(b) => $emit('drill', { ...b, kind: 'expense' })"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search } from 'lucide-vue-next';
import CategoryRanking from './CategoryRanking.vue';
import TInput from '../TInput.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  incomeCategories: { type: Array, required: true },
  expenseCategories: { type: Array, required: true },
  compareEnabled: { type: Boolean, default: true },
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: (n) => `${Math.round(n)}` }
});

defineEmits(['drill']);

const query = ref('');

const matches = (name) =>
  !query.value.trim() || name.toLowerCase().includes(query.value.trim().toLowerCase());

const filteredIncome = computed(() => props.incomeCategories.filter((b) => matches(b.name)));
const filteredExpense = computed(() => props.expenseCategories.filter((b) => matches(b.name)));
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.categories-tab {
  display: flex;
  flex-direction: column;
  gap: $spacing-4;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: $spacing-3;
  flex-wrap: wrap;
}

.eyebrow {
  display: none;
}

.title {
  font-size: 1.25rem;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
  letter-spacing: -0.01em;
}

.sub {
  font-size: $font-size-sm;
  color: $text-muted;
  margin: 4px 0 0;
}

.search-input {
  width: 220px;
  height: 36px;
  min-height: 36px;
  border-radius: 999px;
  border-color: $border-color;
  background: $bg-white;
  font-size: $font-size-sm;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-4;

  @media (min-width: $breakpoint-xl) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
