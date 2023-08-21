
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

export type PeriodsAction = {
  type: ActionsKind.CREATE;
  newPeriod: Period;
} | {
  type: ActionsKind.UPDATE;
  updatedPeriod: Period;
} | {
  type: ActionsKind.DELETE;
  periodId: Period['id']
};

export type ProjectsAction = {
  type: ActionsKind;
  newProject: Project;
};


export enum ButtonVariant {
  BIG = 'big',
  SMALL = 'small',
  SECONDARY = 'secondary',
  SIMPLE = 'simple'
};
