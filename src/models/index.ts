import { z } from 'zod';

// créer ton schema de validation
const colorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/);
export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: colorSchema,
});
// et tu créer ton type à partir de ton schema
export type Project = z.infer<typeof projectSchema>;

export const periodSchema = z.object({
  id: z.string(),
  start: z.number(),
  end: z.number().optional(),
  project: projectSchema.optional(),
  description: z.string().optional(),
});
export type Period = z.infer<typeof periodSchema>;

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
