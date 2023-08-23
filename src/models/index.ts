export type Project = {
  id: string;
  name: string;
  color: `#${string}`;
};

export type Period = {
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
};

export type User = {
  name: string;
  periods: Period[];
  projects: Project[];
};

// Je preferer les union type plutot que les enum voici un exemple :

export type PeriodsAction =
  | {
      type: 'CREATE';
      newPeriod: Period;
    }
  | {
      type: 'INIT';
      newPeriods: Period[];
    }
  | {
      type: 'UPDATE';
      updatedPeriod: Period;
    }
  | {
      type: 'DELETE';
      periodId: Period['id'];
    };
// J'essaie le plus possible de faire des inferences de type plutot que de les expliciter
// comme ça le type se met à jour tout seul et il y moins de répétition

// Pour le nommage tu explicites le fait que c'est un type d'action sur l'objet Period
export type PeriodActionType = PeriodsAction['type'];

export type ProjectsAction =
  | {
      type: 'CREATE';
      newProject: Project;
    }
  | {
      type: 'INIT';
      newProjects: Project[];
    };
export type ProjectActionType = ProjectsAction['type'];

export type ButtonVariant = 'BIG' | 'SMALL' | 'SECONDARY' | 'SIMPLE';
