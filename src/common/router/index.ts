import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tasks",
    component: () => import("@/Tasks/views/Tasks.vue"),
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@/Project/views/Projects.vue"),
    children: [
      {
        path: "",
        component: () => import("@/Project/components/ProjectsList.vue"),
        name: "ProjectsList",
      },
      {
        path: "/new",
        name: "CreateProject",
        component: () => import("@/Project/components/ProjectForm.vue"),
      },
      {
        path: "/edit/:id",
        name: "EditProject",
        props: true,
        component: () => import("@/Project/components/ProjectForm.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
