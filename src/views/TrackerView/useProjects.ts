import { useEffect, useReducer } from 'react';

import { Project, ProjectsAction, projectSchema } from '../../models';
import { DUMMY_PROJECTS } from '../../utils/dummy-values';

export const useProjects = () => {
  const [projects, projectsDispatch] = useReducer(projectdReducer, []);

  useEffect(() => {
    // Projects ?
    const initialProjects = getInitialProjects();
    projectsDispatch({ type: 'INIT', newProjects: initialProjects })
  }, []);

  useEffect(() => {
    localStorage.setItem('dwt_projects', JSON.stringify(projects));
  }, [projects]);

  return [projects, projectsDispatch] as const;
};

const projectdReducer = (projects: Project[], action: ProjectsAction): Project[] => {
  switch (action.type) {
    case 'CREATE':
      return projects.concat(action.newProject)

    case 'INIT':
      return projects.concat(action.newProjects)
  }

  return projects;
};


const getInitialProjects = () => {
  const storedProjects = localStorage.getItem('dwt_projects');
  if (!storedProjects) {
    return DUMMY_PROJECTS;
  }

  const parsedProjects = JSON.parse(storedProjects);
  const projectsValidation = projectSchema.array().safeParse(parsedProjects);
  if (!projectsValidation.success) {
    return DUMMY_PROJECTS;
  }

  return projectsValidation.data;
};