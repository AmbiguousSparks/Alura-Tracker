import Project from "@/Project/models/project";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  NotificationMutations,
  UPDATE_PROJECT,
} from "@/store/mutations";
import { Notification } from "@/Notifications/models/notification";

export interface ApplicationState {
  projects: Project[];
  notifications: Notification[];
}

export const key: InjectionKey<Store<ApplicationState>> = Symbol();

export const store = createStore<ApplicationState>({
  state: {
    projects: [],
    notifications: [],
  },
  mutations: {
    [ADD_PROJECT](state, project: Project) {
      state.projects.push(project);
    },
    [UPDATE_PROJECT](state, id: string, project: Project) {
      const index = state.projects.findIndex((p) => p.id === id);
      if (index <= -1) {
        return;
      }
      state.projects[index] = project;
    },
    [DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter((p) => p.id !== id);
    },
    [NotificationMutations.ADD_NOTIFICATION]: (
      state,
      notification: Notification,
    ) => {
      notification.id = state.notifications.length + 1;
      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter(
          (p) => p.id !== notification.id,
        );
      }, 3000);
    },
  },
  getters: {
    getProject(state: ApplicationState) {
      return (id: string) => state.projects.find((p) => p.id === id);
    },
  },
});

export function useStore(): Store<ApplicationState> {
  return vuexUseStore(key);
}
