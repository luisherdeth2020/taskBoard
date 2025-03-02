export enum TodoStatus {
  PENDING = "Pendiente",
  IN_PROGRESS = "En progreso",
  COMPLETED = "Finalizada"
}

export enum TodoCategory {
  WORK = "Trabajo",
  GYM = "Gym",
  HOSPITAL = "Hospital",
  STUDY = "Estudio"
}

export interface Todo {
  id: number;
  text: string;
  description: string;
  status: TodoStatus;
  category: TodoCategory;
}
