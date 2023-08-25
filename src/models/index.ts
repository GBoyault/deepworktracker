
export interface Project {
  id: string;
  name: string;
  color: `#${string}`;
}

export interface Period {
  id: string;
  start: number;
  end?: number;
  project?: Project;
  description?: string;
};

export const isPeriod = (obj: any): obj is Period => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const hasId = obj.id !== undefined && typeof (obj as Period).id === 'string';
  const hasStart = obj.start !== undefined && typeof (obj as Period).start === 'number';

  return hasId && hasStart;
}


// export enum ActionsKind {
//   CREATE = 'CREATE',
//   UPDATE = 'UPDATE',
//   DELETE = 'DELETE',
//   INIT = 'INIT'
// };

export type PeriodsAction = {
  type: 'CREATE';
  newPeriod: Period;
} | {
  type: 'INIT';
  newPeriods: Period[];
} | {
  type: 'UPDATE';
  updatedPeriod: Period;
} | {
  type: 'DELETE';
  periodId: Period['id']
};

export type PeriodsActionType = PeriodsAction['type'];


export type ProjectsAction = {
  type: 'CREATE';
  newProject: Project;
} | {
  type: 'INIT';
  newProjects: Project[];
};

export type ProjectsActionType = ProjectsAction['type'];

// export enum ButtonVariant {
//   BIG = 'big',
//   SMALL = 'small',
//   SECONDARY = 'secondary',
//   SIMPLE = 'simple'
// };

export type ButtonVariant = 'BIG' | 'SMALL' | 'SECONDARY' | 'SIMPLE';