<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import classes, {
  Notification,
  NotificationType,
} from "@/Notifications/models/notification";

const store = useStore();

const notifications: Notification[] = computed(
  () => store.state.notificationsModule.notifications,
);

const getTypeClass = (type: NotificationType) => classes[type];
</script>

<template>
  <div class="notifications">
    <article
      class="message"
      :class="getTypeClass(notification.type)"
      :key="notification.id"
      v-for="notification of notifications"
    >
      <div class="message-header">
        <p>{{ notification.title }}</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        {{ notification.message }}
      </div>
    </article>
  </div>
</template>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>
