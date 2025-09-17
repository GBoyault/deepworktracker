import { useEffect, useReducer } from "react";

import { type Project, type ProjectsAction, projectSchema } from "../models";
import { DUMMY_PROJECTS } from "../utils/dummy-values";

export const useProjects = () => {
  const [projects, projectsDispatch] = useReducer(projectdReducer, []);

  useEffect(() => {
    const initialProjects = getInitialProjects();
    projectsDispatch({ type: "INIT", newProjects: initialProjects });
  }, []);

  useEffect(() => {
    localStorage.setItem("dwt_projects", JSON.stringify(projects));
  }, [projects]);

  return [projects, projectsDispatch] as const;
};

const projectdReducer = (
  projects: Project[],
  action: ProjectsAction
): Project[] => {
  switch (action.type) {
    case "CREATE":
      return projects.concat(action.newProject);

    case "INIT":
      return action.newProjects;

    case "DELETE":
      return projects.filter(
        (project) => project.id !== action.deletedProjectId
      );
  }

  return projects;
};

const getInitialProjects = () => {
  const storedProjects = localStorage.getItem("dwt_projects");
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
