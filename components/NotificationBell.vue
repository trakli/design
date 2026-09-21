<template>
  <TDropdown class="notification-bell">
    <template #trigger>
      <TButton
        type="button"
        variant="text"
        size="small"
        :full-width="false"
        class="bell-trigger-btn"
        :aria-label="t('Notifications')"
        :title="t('Notifications')"
      >
        <Bell :size="18" class="bell-icon" />
        <span v-if="unreadCount > 0" class="badge">
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>
      </TButton>
    </template>

    <div class="notification-dropdown">
      <div class="dropdown-header">
        <h3>{{ t('Notifications') }}</h3>
        <TButton
          v-if="notificationsList.length > 0"
          type="button"
          variant="text"
          size="small"
          :full-width="false"
          class="mark-all-btn"
          @click="$emit('mark-all-read')"
        >
          {{ t('Mark all read') }}
        </TButton>
      </div>

      <TDivider orientation="horizontal" />

      <div v-if="loading" class="dropdown-loading">
        <p>{{ t('Loading...') }}</p>
      </div>

      <div v-else-if="notificationsList.length === 0" class="dropdown-empty">
        <BellOff :size="28" class="empty-icon" />
        <p>{{ t('No notifications yet') }}</p>
      </div>

      <div v-else class="notification-list">
        <div
          v-for="notification in notificationsList"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read_at }"
          @click="$emit('select', notification)"
        >
          <div class="notification-icon">
            <component :is="getNotificationIcon(notification.type)" :size="18" />
          </div>
          <div class="notification-content">
            <p class="notification-title">{{ notification.title }}</p>
            <p class="notification-body">{{ truncateText(notification.body, 60) }}</p>
            <p class="notification-time">{{ formatTime(notification.created_at) }}</p>
          </div>
          <TButton
            v-if="!notification.read_at"
            type="button"
            variant="text"
            size="small"
            :full-width="false"
            class="mark-read-btn"
            :title="t('Mark as read')"
            @click.stop="$emit('mark-read', notification.id)"
          >
            <Check :size="14" class="check-icon" />
          </TButton>
        </div>
      </div>

      <template v-if="notificationsList.length > 0">
        <TDivider orientation="horizontal" />
        <div class="dropdown-footer">
          <TButton
            type="button"
            variant="text"
            size="small"
            class="view-all-btn"
            @click="$emit('view-all')"
          >
            {{ t('View all notifications') }}
          </TButton>
        </div>
      </template>
    </div>
  </TDropdown>
</template>

<script setup>
import { computed } from 'vue';
import { Bell, BellOff, Check, Info, AlertTriangle, CheckCircle } from 'lucide-vue-next';
import TDropdown from './TDropdown.vue';
import TButton from './TButton.vue';
import TDivider from './TDivider.vue';

const i18n = typeof useI18n === 'function' ? useI18n() : null;
const t = i18n?.t || ((key) => key);

const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  unreadCount: {
    type: Number,
    default: 0
  }
});

defineEmits(['select', 'mark-read', 'mark-all-read', 'view-all']);

const notificationsList = computed(() => props.notifications || []);

const getNotificationIcon = (type) => {
  switch (type) {
    case 'warning':
      return AlertTriangle;
    case 'success':
      return CheckCircle;
    default:
      return Info;
  }
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;

.notification-bell {
  display: inline-block;
  position: relative;
}

.bell-trigger-btn {
  position: relative;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  color: $text-secondary;

  &:hover {
    color: $text-primary;
  }
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background-color: $error-color;
  color: white;
  border-radius: 9px;
  font-size: 11px;
  font-weight: $font-bold;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.notification-dropdown {
  width: 340px;
  max-width: 90vw;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;

  h3 {
    margin: 0;
    font-size: $font-size-base;
    font-weight: $font-semibold;
    color: $text-primary;
  }
}

.mark-all-btn {
  font-size: $font-size-xs;
  color: $primary;
  padding: 0;
  min-height: auto;
}

.dropdown-loading,
.dropdown-empty {
  padding: 2rem 1rem;
  text-align: center;
  color: $text-muted;
  font-size: $font-size-sm;

  .empty-icon {
    margin: 0 auto 0.5rem;
    opacity: 0.5;
  }

  p {
    margin: 0;
  }
}

.notification-list {
  max-height: 320px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color $duration-fast $easing-standard;
  border-bottom: 1px solid $border-light;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: $bg-light;
  }

  &.unread {
    background-color: rgba(var(--color-primary-rgb), 0.05);

    &:hover {
      background-color: rgba(var(--color-primary-rgb), 0.09);
    }
  }
}

.notification-icon {
  margin-top: 2px;
  color: $primary;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;

  p {
    margin: 0;
    line-height: 1.35;
  }
}

.notification-title {
  font-size: $font-size-sm;
  font-weight: $font-semibold;
  color: $text-primary;
}

.notification-body {
  font-size: $font-size-xs;
  color: $text-secondary;
  margin-top: 2px !important;
}

.notification-time {
  font-size: 11px;
  color: $text-muted;
  margin-top: 4px !important;
}

.mark-read-btn {
  width: 24px;
  height: 24px;
  padding: 0;
  min-height: auto;
  color: $text-muted;
  flex-shrink: 0;

  &:hover {
    color: $primary;
  }
}

.dropdown-footer {
  padding: 0.5rem 1rem;
  text-align: center;
}

.view-all-btn {
  font-size: $font-size-xs;
  color: $primary;
  width: 100%;
  justify-content: center;
}
</style>
