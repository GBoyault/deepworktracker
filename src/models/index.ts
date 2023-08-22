
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

export const isPeriod = (obj: any): obj is Period => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const hasId = obj.id !== undefined && typeof (obj as Period).id === 'string';
  const hasStart = obj.start !== undefined && typeof (obj as Period).start === 'number';

  return hasId && hasStart;
}


export type User = {
  name: string,
  periods: Period[],
  projects: Project[],
}


export enum ActionsKind {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  INIT = 'INIT'
};

export type PeriodsAction = {
  type: ActionsKind.CREATE;
  newPeriod: Period;
} | {
  type: ActionsKind.INIT;
  newPeriods: Period[];
} | {
  type: ActionsKind.UPDATE;
  updatedPeriod: Period;
} | {
  type: ActionsKind.DELETE;
  periodId: Period['id']
};

export type ProjectsAction = {
  type: ActionsKind.CREATE;
  newProject: Project;
} | {
  type: ActionsKind.INIT;
  newProjects: Project[];
};


export enum ButtonVariant {
  BIG = 'big',
  SMALL = 'small',
  SECONDARY = 'secondary',
  SIMPLE = 'simple'
};
