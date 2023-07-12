
export type Project = {
  id: string,
  name: string,
  color: `#${string}`
}

export type Period = {
  id: string,
  start: number,
  end?: number,
  project?: Project,
  description?: string
};

export type User = {
  name: string,
  periods: Period[],
  projects: Project[],
}


export enum ActionsKind {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
};

export interface PeriodsAction {
  type: ActionsKind;
  newPeriod: Period;
}

export interface ProjectsAction {
  type: ActionsKind;
  newProject: Project;
}