<template>
  <div class="party-card-list">
    <div class="list-header">
      <div class="header-row">
        <h2 class="page-title">{{ title || t('All Parties') }}</h2>
        <div class="search-filter-section">
          <SearchInput v-model="searchQuery" :placeholder="t('Search...')" />
          <div class="filter-container">
            <select
              v-model="selectedFilter"
              class="filter-dropdown"
              :aria-label="t('Filter by party type')"
            >
              <option value="all">{{ t('All') }}</option>
              <option value="individual">{{ t('Individual') }}</option>
              <option value="business">{{ t('Business') }}</option>
              <option value="client">{{ t('Client') }}</option>
              <option value="vendor">{{ t('Vendor') }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredParties.length > 0" class="cards-grid">
      <PartyCard
        v-for="party in filteredParties"
        :key="party.id"
        :party="party"
        :currency="currency"
        @menu="(p) => $emit('menu', p)"
        @edit="(p) => $emit('edit', p)"
        @delete="(p) => $emit('delete', p)"
        @view="(p) => $emit('view', p)"
      />
    </div>

    <div v-else class="empty-state">
      <p v-if="parties.length === 0">
        {{ t('No parties found. Create your first party to get started.') }}
      </p>
      <p v-else>
        {{ t('No parties match your search criteria. Try adjusting your search or filters.') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchInput from './SearchInput.vue';
import PartyCard from './PartyCard.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  parties: {
    type: Array,
    default: () => []
  },
  currency: {
    type: String,
    default: 'USD'
  }
});

defineEmits(['edit', 'delete', 'view', 'menu']);

const searchQuery = ref('');
const selectedFilter = ref('all');

const filteredParties = computed(() => {
  let filtered = props.parties;

  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(
      (party) => party.type?.toLowerCase() === selectedFilter.value.toLowerCase()
    );
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (party) =>
        party.name?.toLowerCase().includes(query) ||
        party.description?.toLowerCase().includes(query)
    );
  }

  return filtered;
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.party-card-list {
  width: 100%;
}

.list-header {
  margin-bottom: $spacing-3;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-3;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: stretch;
    gap: $spacing-2;
  }
}

.page-title {
  font-size: $font-size-base;
  font-weight: $font-semibold;
  color: $text-primary;
  margin: 0;
  white-space: nowrap;
}

.search-filter-section {
  display: flex;
  gap: $spacing-2;
  align-items: center;
}

.filter-container {
  display: flex;
  align-items: center;
}

.filter-dropdown {
  padding: 6px 24px 6px 10px;
  border: 1px solid $border-light;
  border-radius: $radius-md;
  font-size: $font-size-xs;
  background: $bg-white;
  color: $text-secondary;
  cursor: pointer;
  transition: border-color $duration-fast $easing-standard;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 6px center;
  background-repeat: no-repeat;
  background-size: 14px;

  &:focus {
    outline: none;
    border-color: $primary;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: $spacing-3;
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: $spacing-12 $spacing-6;
  color: $text-muted;
  font-size: $font-size-base;
}

@media (max-width: $breakpoint-md) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: $spacing-2;
  }
}

@media (min-width: $breakpoint-xl) {
  .cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style>
