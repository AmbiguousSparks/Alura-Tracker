import Project from "@/Project/models/project";

export default interface ITarefa {
  duracaoEmSegundos: number;
  descricao: string;
  project: Project;
}
