import { NotificationMutations } from "@/store/mutations";

import { store } from "@/store";

export class NotificationService {
  public notify(notification: Notification): void {
    store.commit(NotificationMutations.ADD_NOTIFICATION, notification);
  }
}
