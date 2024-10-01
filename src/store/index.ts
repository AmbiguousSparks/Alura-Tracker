import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import {
  ProjectsModule,
  projectsModule,
} from "@/Project/modules/projects-module";
import { TasksModule, tasksModule } from "@/Tasks/modules/tasks-module";
import {
  NotificationsModule,
  notificationsModule,
} from "@/Notifications/modules/notifications-module";

export interface ApplicationState {
  projectsModule: ProjectsModule;
  notificationsModule: NotificationsModule;
  tasksModule: TasksModule;
}

export const key: InjectionKey<Store<ApplicationState>> = Symbol();

export const store = createStore<ApplicationState>({
  state: {
    notificationsModule: {
      notifications: [],
    },
    tasksModule: {
      tasks: [],
    },
    projectsModule: {
      projects: [],
    },
  },
  modules: {
    notificationsModule,
    projectsModule,
    tasksModule,
  },
});

export function useStore(): Store<ApplicationState> {
  return vuexUseStore(key);
}
