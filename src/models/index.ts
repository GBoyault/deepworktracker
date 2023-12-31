import { z } from 'zod'

const colorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/)

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: colorSchema
})

export type Project = z.infer<typeof projectSchema>

export const periodSchema = z.object({
  id: z.string(),
  start: z.number(),
  end: z.number().optional(),
  project: projectSchema.optional(),
  description: z.string().optional()
})

export type Period = z.infer<typeof periodSchema>

export type PeriodsAction = {
  type: 'CREATE'
  newPeriod: Period
} | {
  type: 'INIT'
  newPeriods: Period[]
} | {
  type: 'UPDATE'
  updatedPeriod: Period
} | {
  type: 'DELETE'
  periodId: Period['id']
}

export type PeriodsActionType = PeriodsAction['type']

export type ProjectsAction = {
  type: 'CREATE'
  newProject: Project
} | {
  type: 'INIT'
  newProjects: Project[]
} | {
  type: 'DELETE'
  deletedProjectId: Project['id']
}

export type ProjectsActionType = ProjectsAction['type']

export type ButtonVariant = 'BIG' | 'SMALL' | 'SECONDARY' | 'SIMPLE'
