import Project from "@/Project/models/project";
import { Module } from "vuex";
import { ApplicationState } from "@/store";
import { ProjectActions } from "@/store/actions";
import httpClient from "@/http";
import { ProjectMutations } from "@/store/mutations";

export interface ProjectsModule {
  projects: Project[];
}

export const projectsModule: Module<ProjectsModule, ApplicationState> = {
  actions: {
    [ProjectActions.GET_PROJECTS]: async ({ commit }) => {
      const response = await httpClient.get<Project>("/projects");

      commit(ProjectMutations.DEFINE_PROJECTS, response.data);
    },
    [ProjectActions.UPDATE_PROJECT]: async (_, { id, project }) => {
      await httpClient.put(`/projects/${id}`, project);
    },
    [ProjectActions.DELETE_PROJECT]: async ({ commit }, id: string) => {
      await httpClient.delete(`/projects/${id}`);

      commit(ProjectMutations.DELETE_PROJECT, id);
    },
    [ProjectActions.CREATE_PROJECT]: async (_, project: Project) => {
      await httpClient.post<Project>("/projects", project);
    },
  },
  mutations: {
    [ProjectMutations.ADD_PROJECT]: (
      state: ProjectsModule,
      project: Project,
    ) => {
      state.projects.push(project);
    },
    [ProjectMutations.DEFINE_PROJECTS]: (
      state: ProjectsModule,
      projects: Project[],
    ) => {
      state.projects = projects;
    },
    [ProjectMutations.UPDATE_PROJECT]: (
      state: ProjectsModule,
      id: string,
      project: Project,
    ) => {
      const index = state.projects.findIndex((p) => p.id === id);
      if (index <= -1) {
        return;
      }
      state.projects[index] = project;
    },
    [ProjectMutations.DELETE_PROJECT]: (state: ProjectsModule, id: string) => {
      state.projects = state.projects.filter((p) => p.id !== id);
    },
  },
  getters: {
    getProject(state: ProjectsModule) {
      return (id: string) => {
        return state.projects.find((p) => p.id === id);
      };
    },
  },
};
