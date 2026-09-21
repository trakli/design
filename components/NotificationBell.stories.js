import NotificationBell from './NotificationBell.vue';
import { ref } from 'vue';

export default {
  title: 'Components/NotificationBell',
  component: NotificationBell,
  tags: ['autodocs']
};

const sampleNotifications = [
  {
    id: '1',
    title: 'Monthly statement ready',
    body: 'Your statement for August has been processed.',
    created_at: new Date().toISOString(),
    type: 'info',
    read_at: null
  },
  {
    id: '2',
    title: 'Budget alert',
    body: 'You have reached 85% of your dining budget.',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    type: 'warning',
    read_at: null
  },
  {
    id: '3',
    title: 'Recurring transaction logged',
    body: 'Spotify subscription $9.99 paid.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    type: 'success',
    read_at: new Date().toISOString()
  }
];

export const Default = {
  render: () => ({
    components: { NotificationBell },
    setup() {
      const notifications = ref(sampleNotifications);
      const unreadCount = ref(2);

      const handleMarkRead = (id) => {
        const item = notifications.value.find((n) => n.id === id);
        if (item && !item.read_at) {
          item.read_at = new Date().toISOString();
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
      };

      const handleMarkAllRead = () => {
        notifications.value.forEach((n) => {
          n.read_at = new Date().toISOString();
        });
        unreadCount.value = 0;
      };

      return { notifications, unreadCount, handleMarkRead, handleMarkAllRead };
    },
    template: `
      <div style="padding: 2rem; display: flex; justify-content: center;">
        <NotificationBell
          :notifications="notifications"
          :unread-count="unreadCount"
          @mark-read="handleMarkRead"
          @mark-all-read="handleMarkAllRead"
        />
      </div>
    `
  })
};

export const Empty = {
  render: () => ({
    components: { NotificationBell },
    template: `
      <div style="padding: 2rem; display: flex; justify-content: center;">
        <NotificationBell :notifications="[]" :unread-count="0" />
      </div>
    `
  })
};
