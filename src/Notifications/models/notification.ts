export interface Notification {
  message: string;
  title: string;
  type: NotificationType;
  id: number;
}

export enum NotificationType {
  Success,
  Danger,
  Warning,
}

class NotificationClasses {
  [NotificationType.Success] = "is-success";
  [NotificationType.Warning] = "is-warning";
  [NotificationType.Danger] = "is-danger";
}

const classes = new NotificationClasses();

export default classes;
