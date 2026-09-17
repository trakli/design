<template>
  <div class="detail">
    <TButton
      variant="text"
      size="small"
      :full-width="false"
      class="link-back"
      @click="$emit('back')"
    >
      <ArrowLeft class="link-back__icon" />{{ t('Back to users') }}
    </TButton>

    <div v-if="loading" class="state">{{ t('Loading...') }}</div>
    <p v-else-if="error" class="state">{{ error }}</p>

    <template v-else-if="detail">
      <header class="detail__head">
        <span class="avatar">{{ initials }}</span>
        <div class="detail__id">
          <h1 class="detail__name">{{ detail.user.first_name }} {{ detail.user.last_name }}</h1>
          <p class="detail__email">{{ detail.user.email }}</p>
        </div>
        <span v-if="detail.user.is_admin" class="admin-tag">{{ t('Admin') }}</span>
      </header>

      <TCard>
        <template #header>{{ t('Profile') }}</template>
        <dl class="facts">
          <div class="fact">
            <dt>{{ t('Joined') }}</dt>
            <dd>{{ fmtDate(detail.user.created_at) }}</dd>
          </div>
          <div class="fact">
            <dt>{{ t('Country') }}</dt>
            <dd>{{ detail.preferences.country || '-' }}</dd>
          </div>
          <div class="fact">
            <dt>{{ t('Language') }}</dt>
            <dd>{{ detail.preferences.language || '-' }}</dd>
          </div>
          <div class="fact">
            <dt>{{ t('Currency') }}</dt>
            <dd>{{ detail.preferences.currency || '-' }}</dd>
          </div>
          <div class="fact">
            <dt>{{ t('Last transaction') }}</dt>
            <dd>{{ detail.last_transaction_at ? fmtDate(detail.last_transaction_at) : '-' }}</dd>
          </div>
        </dl>
      </TCard>

      <div class="counts">
        <div v-for="item in countItems" :key="item.key" class="count">
          <span class="count__value">{{ item.value }}</span>
          <span class="count__label">{{ t(item.label) }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { ArrowLeft } from 'lucide-vue-next';
import TCard from '../TCard.vue';

import TButton from '../TButton.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k) => k);

const props = defineProps({
  userId: { type: Number, required: true },
  fetchDetail: { type: Function, default: null }
});
defineEmits(['back']);

const detail = ref(null);
const loading = ref(true);
const error = ref('');

const labels = {
  transactions: 'Transactions',
  wallets: 'Wallets',
  categories: 'Categories',
  parties: 'Parties',
  groups: 'Groups',
  budgets: 'Budgets'
};

const countItems = computed(() =>
  Object.entries(detail.value?.counts ?? {}).map(([key, value]) => ({
    key,
    value,
    label: labels[key] ?? key
  }))
);

const initials = computed(() => {
  const u = detail.value?.user;
  return `${u?.first_name?.[0] ?? ''}${u?.last_name?.[0] ?? ''}`.toUpperCase() || '?';
});

const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString() : '');

const load = async () => {
  loading.value = true;
  error.value = '';
  try {
    detail.value = props.fetchDetail ? await props.fetchDetail(props.userId) : null;
  } catch {
    error.value = t('Could not load this user.');
  } finally {
    loading.value = false;
  }
};

onMounted(load);
watch(() => props.userId, load);
</script>

<style lang="scss" scoped>
@use '../../assets/scss/_vars.scss' as *;

.detail {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.link-back {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  background: transparent;
  color: $text-secondary;
  font-size: $font-size-sm;
  font-weight: $font-medium;
  cursor: pointer;

  &:hover {
    color: $primary;
  }
}

.link-back__icon {
  width: 16px;
  height: 16px;
}

.detail__head {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: $primary-light;
  color: $primary-dark;
  font-weight: $font-bold;
  font-size: 1.2rem;
}

.detail__name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: $font-bold;
  color: $text-primary;
}

.detail__email {
  margin: 0.1rem 0 0;
  color: $text-muted;
  font-size: $font-size-sm;
}

.admin-tag {
  margin-left: auto;
  padding: 0.2rem 0.6rem;
  border-radius: $radius-md;
  background: $primary-light;
  color: $primary-dark;
  font-size: $font-size-xs;
  font-weight: $font-semibold;
}

.facts {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  dt {
    font-size: $font-size-xs;
    color: $text-muted;
  }

  dd {
    margin: 0;
    font-size: $font-size-sm;
    font-weight: $font-semibold;
    color: $text-primary;
  }
}

.counts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.count {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background: $bg-white;
  border: 1px solid $border-color;
  border-radius: $radius-xl;
  box-shadow: $elevation-1;
}

.count__value {
  font-size: 1.5rem;
  font-weight: $font-bold;
  color: $text-primary;
}

.count__label {
  font-size: $font-size-xs;
  color: $text-muted;
}

.state {
  padding: 2rem;
  text-align: center;
  color: $text-muted;
}
</style>
