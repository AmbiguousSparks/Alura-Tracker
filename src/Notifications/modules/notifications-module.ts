import { Notification } from "@/Notifications/models/notification";
import { Module } from "vuex";
import { ApplicationState } from "@/store";
import { NotificationMutations } from "@/store/mutations";

export interface NotificationsModule {
  notifications: Notification[];
}

export const notificationsModule: Module<
  NotificationsModule,
  ApplicationState
> = {
  mutations: {
    [NotificationMutations.ADD_NOTIFICATION]: (
      state: NotificationsModule,
      notification: Notification,
    ) => {
      if (!state.notifications) {
        state.notifications = [];
      }
      notification.id = state.notifications.length + 1;
      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (p) => p.id !== notification.id,
        );
      }, 3000);
    },
  },
};
