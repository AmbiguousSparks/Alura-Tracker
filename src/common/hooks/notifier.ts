import { Notification } from "@/Notifications/models/notification";
import { store } from "@/store";
import { NotificationMutations } from "@/store/mutations";

type Notifier = {
  notify: (notification: Notification) => void;
};

export default (): Notifier => {
  const notify = (notification: Notification) =>
    store.commit(NotificationMutations.ADD_NOTIFICATION, notification);

  return {
    notify,
  };
};
