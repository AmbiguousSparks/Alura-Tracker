import Task from "@/Tasks/interfaces/Task";
import { Module } from "vuex";
import { ApplicationState } from "@/store";
import { TaskActions } from "@/store/actions";
import httpClient from "@/http";
import { TaskMutations } from "@/store/mutations";

export interface TasksModule {
  tasks: Task[];
}

export const tasksModule: Module<TasksModule, ApplicationState> = {
  actions: {
    [TaskActions.CREATE_TASK]: async ({ commit }, task: Task) => {
      await httpClient.post(`/tasks`, task);
      commit(TaskMutations.ADD_TASK, task);
    },
    [TaskActions.UPDATE_TASK]: async (_, task: Task) => {
      await httpClient.put(`/tasks/${task.id}`, task);
    },
    [TaskActions.GET_TASKS]: async ({ commit }, filter: string) => {
      let url = "tasks";

      if (filter) {
        url += "?description=" + filter;
      }

      const response = await httpClient.get<Task>(url);

      commit(TaskMutations.DEFINE_TASKS, response.data);
    },
  },
  mutations: {
    [TaskMutations.ADD_TASK]: (state: TasksModule, task: Task) => {
      state.tasks.push(task);
    },
    [TaskMutations.DEFINE_TASKS]: (state: TasksModule, tasks: Task[]) => {
      state.tasks = tasks;
    },
  },
};
