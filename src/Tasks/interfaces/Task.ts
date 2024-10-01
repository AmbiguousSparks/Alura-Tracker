import Project from "@/Project/models/project";

export default interface Task {
  duration: number;
  description: string;
  project: Project;
}
