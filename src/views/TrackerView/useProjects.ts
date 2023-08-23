import { useEffect, useReducer } from 'react';
import { DUMMY_PROJECTS } from '../../utils/dummy-values';
import { Project, ProjectsAction, projectSchema } from '../../models';

export const useProjects = () => {
  const [projects, projectsDispatch] = useReducer(projectdReducer, []);

  useEffect(() => {
    const initialProject = getInitialProjects();
    projectsDispatch({ type: 'INIT', newProjects: initialProject });
  }, []);

  useEffect(() => {
    localStorage.setItem('dwp_projects', JSON.stringify(projects));
  }, [projects]);

  return [projects, projectsDispatch] as const;
};

const getInitialProjects = () => {
  const storedProjects = localStorage.getItem('dwp_projects');
  if (!storedProjects) {
    return DUMMY_PROJECTS;
  }

  const parsedProjects = JSON.parse(storedProjects);
  const projectValidation = projectSchema.array().safeParse(parsedProjects);
  if (!projectValidation.success) {
    return DUMMY_PROJECTS;
  }
  return projectValidation.data;
};

const projectdReducer = (projects: Project[], action: ProjectsAction): Project[] => {
  switch (action.type) {
    case 'CREATE':
      return projects.concat(action.newProject);

    case 'INIT':
      return projects.concat(action.newProjects);
  }
};
