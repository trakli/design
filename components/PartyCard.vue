<template>
  <div class="party-card" :style="statusStyle">
    <div class="card-actions">
      <TDropdown>
        <template #trigger>
          <button
            type="button"
            class="action-menu"
            :title="t('More actions')"
            :aria-label="t('More actions')"
          >
            <LucideMoreVertical :size="16" />
          </button>
        </template>
        <div class="dropdown-content">
          <TDropdownItem class="menu-item--edit" @click="handleEdit">
            <LucideEdit :size="14" />
            <span>{{ t('Edit') }}</span>
          </TDropdownItem>
          <TDropdownItem class="menu-item--delete" @click="handleDelete">
            <LucideTrash :size="14" />
            <span>{{ t('Delete') }}</span>
          </TDropdownItem>
        </div>
      </TDropdown>
    </div>

    <div class="party-avatar">
      <component :is="resolvedIcon" />
    </div>

    <h3 class="party-name">{{ party.name }}</h3>

    <span v-if="isValidPartyType" class="party-type-badge" :class="party.type">
      {{ displayPartyType }}
    </span>

    <p v-if="party.description" class="party-description">{{ party.description }}</p>

    <div class="financial-section">
      <div class="stat-row">
        <div class="stat received">
          <LucideArrowDownLeft class="stat-icon" :size="18" />
          <div class="stat-content">
            <span class="stat-label">{{ t('Received') }}</span>
            <span class="stat-value">{{ receivedDisplay }}</span>
          </div>
        </div>
        <div class="stat spent">
          <LucideArrowUpRight class="stat-icon" :size="18" />
          <div class="stat-content">
            <span class="stat-label">{{ t('Spent') }}</span>
            <span class="stat-value">{{ spentDisplay }}</span>
          </div>
        </div>
      </div>

      <div v-if="party.receivedAmount > 0 || party.spentAmount > 0" class="last-activity">
        <LucideClock class="clock-icon" :size="12" />
        <span>{{ t('Last activity') }}: {{ formatLastUpdated(party.lastUpdated) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  MoreVertical as LucideMoreVertical,
  ArrowDownLeft as LucideArrowDownLeft,
  ArrowUpRight as LucideArrowUpRight,
  Clock as LucideClock,
  Edit as LucideEdit,
  Trash as LucideTrash,
  User as LucideUser,
  Building2 as LucideBuilding2
} from 'lucide-vue-next';
import * as LucideIcons from 'lucide-vue-next';
import TDropdown from './TDropdown.vue';
import TDropdownItem from './TDropdownItem.vue';
import { formatAmount } from '../utils/currency';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((k, params) => {
  if (params?.count !== undefined) {
    if (k.includes('m ago')) return `${params.count}m ago`;
    if (k.includes('h ago')) return `${params.count}h ago`;
    if (k.includes('d ago')) return `${params.count}d ago`;
    if (k.includes('w ago')) return `${params.count}w ago`;
  }
  return k;
});

const props = defineProps({
  party: {
    type: Object,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  }
});

const emit = defineEmits(['menu', 'edit', 'delete', 'view']);

const handleEdit = () => {
  emit('edit', props.party);
};

const handleDelete = () => {
  emit('delete', props.party);
};

const validPartyTypes = ['individual', 'business', 'organization', 'vendor', 'client'];

const isValidPartyType = computed(() => {
  return validPartyTypes.includes(props.party.type?.toLowerCase());
});

const displayPartyType = computed(() => {
  const type = props.party.type?.toLowerCase();
  const map = {
    individual: 'Individual',
    business: 'Business',
    organization: 'Organization',
    vendor: 'Vendor',
    client: 'Client'
  };

  const labelKey = map[type];
  return labelKey ? t(labelKey) : props.party.type;
});

const receivedDisplay = computed(() => {
  const amt = props.party.receivedAmount ?? 0;
  return formatAmount(`${amt} ${props.currency}`);
});

const spentDisplay = computed(() => {
  const amt = props.party.spentAmount ?? 0;
  return formatAmount(`${amt} ${props.currency}`);
});

const statusStyle = computed(() => {
  const received = Number(props.party.receivedAmount || 0);
  const spent = Number(props.party.spentAmount || 0);

  let stripColor = 'var(--color-border-medium)';
  let accentBg = 'var(--color-border-medium)';

  if (received > spent) {
    stripColor = 'var(--color-income)';
    accentBg = 'var(--color-income)';
  } else if (spent > received) {
    stripColor = 'var(--color-expense)';
    accentBg = 'var(--color-expense)';
  }

  return {
    '--party-strip-color': stripColor,
    '--party-accent-bg': accentBg
  };
});

const resolvedIcon = computed(() => {
  let iconValue = '';
  if (props.party.icon) {
    if (typeof props.party.icon === 'string') {
      iconValue = props.party.icon;
    } else if (props.party.icon.path) {
      iconValue = props.party.icon.path;
    } else if (props.party.icon.content) {
      iconValue = props.party.icon.content;
    }
  }

  if (!iconValue) {
    return props.party.type === 'individual' ? LucideUser : LucideBuilding2;
  }

  const iconComponent = LucideIcons[iconValue];
  if (iconComponent) {
    return iconComponent;
  }

  return props.party.type === 'individual' ? LucideUser : LucideBuilding2;
});

const formatLastUpdated = (timestamp) => {
  if (!timestamp) return t('{count}h ago', { count: 1 });

  const now = new Date();
  const updated = new Date(timestamp);
  const diffMs = now - updated;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));

  if (diffMins < 60) return t('{count}m ago', { count: diffMins });
  if (diffHours < 24) return t('{count}h ago', { count: diffHours });
  if (diffDays < 7) return t('{count}d ago', { count: diffDays });
  return t('{count}w ago', { count: diffWeeks });
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.party-card {
  background: $bg-white;
  border-radius: 16px;
  padding: $spacing-4;
  box-shadow: $elevation-1;
  transition:
    box-shadow $duration-base $easing-standard,
    border-color $duration-base $easing-standard;
  border: 1px solid $border-light;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 280px;

  &:hover {
    box-shadow: $elevation-2;
    border-color: $border-medium;
  }
}

.card-actions {
  position: absolute;
  top: $spacing-2;
  right: $spacing-2;
  z-index: 2;
}

.action-menu {
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: $radius-lg;
  cursor: pointer;
  color: $text-muted;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: $duration-fast $easing-standard;

  &:hover {
    background: $bg-gray;
    color: $text-secondary;
  }
}

.dropdown-content {
  min-width: 8rem;
  padding: $spacing-1 0;
}

.menu-item--delete {
  color: $error-color;

  &:hover {
    background-color: rgba(var(--color-error-rgb), 0.1);
    color: $error-color;
  }
}

.party-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--party-accent-bg, $border-medium);
  color: $bg-white;
  margin-bottom: $spacing-3;

  svg {
    width: 2rem;
    height: 2rem;
  }
}

.party-name {
  margin: 0 0 $spacing-1 0;
  font-size: $font-size-lg;
  font-weight: $font-semibold;
  color: $text-primary;
  line-height: 1.2;
}

.party-type-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: $font-size-xs;
  font-weight: $font-medium;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--party-accent-bg, $border-medium);
  color: $bg-white;
  margin-bottom: $spacing-2;
}

.party-description {
  margin: 0 0 $spacing-3 0;
  color: $text-muted;
  font-size: $font-size-sm;
  line-height: 1.4;
  max-width: 100%;
}

.financial-section {
  width: 100%;
  margin-top: auto;
  padding-top: $spacing-3;
  border-top: 1px solid $border-light;
}

.stat-row {
  display: flex;
  gap: $spacing-2;
  margin-bottom: $spacing-2;
}

.stat {
  flex: 1;
  display: flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-2;
  border-radius: $radius-md;
  text-align: left;

  &.received {
    background: rgba(var(--color-success-rgb), 0.08);

    .stat-icon {
      color: $success;
    }

    .stat-value {
      color: $success;
    }
  }

  &.spent {
    background: rgba(var(--color-error-rgb), 0.08);

    .stat-icon {
      color: $error-color;
    }

    .stat-value {
      color: $error-color;
    }
  }
}

.stat-icon {
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-label {
  font-size: 0.625rem;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.stat-value {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  font-variant-numeric: tabular-nums;
}

.last-activity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  font-size: $font-size-xs;
  color: $text-muted;

  .clock-icon {
    flex-shrink: 0;
  }
}
</style>
