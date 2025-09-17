import React, { useState, useEffect, useContext } from "react";

import { type Project, type Period } from "../../../models";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { ProjectSelect } from "./";
import { Button } from "../../UI/";
import classes from "./NewPeriod.module.css";

interface NewPeriodProp {
  projects: Project[];
  lastCreatedProject: Project | null;
  onStartPeriod: (newPeriod: Period) => void;
  onCreateProject: () => void;
  onDeleteProject: (deletedProjectId: Project["id"]) => void;
}

export const NewPeriod = ({
  projects,
  lastCreatedProject,
  onStartPeriod,
  onCreateProject,
  onDeleteProject,
}: NewPeriodProp) => {
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { theme } = useContext(SettingsContext);

  useEffect(() => {
    if (lastCreatedProject) {
      setSelectedProject(lastCreatedProject);
    }
  }, [lastCreatedProject]);

  const descriptionChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDescription(e.target.value);
  };

  const selectProjectHandler = (project: Project | null): void => {
    setSelectedProject(project);
  };

  const startPeriodHandler = (): void => {
    const newPeriod: Period = {
      id: Date.now().toString(),
      start: Date.now(),
    };

    if (selectedProject) {
      newPeriod.project = selectedProject;
    }

    if (description.trim().length > 0) {
      newPeriod.description = description;
    }

    onStartPeriod(newPeriod);
    setDescription("");
    setSelectedProject(null);
  };

  const className =
    theme === "dark"
      ? classes["new-period"]
      : `${classes["new-period"]} ${classes["new-period--theme-light"]}`;

  return (
    <div className={className}>
      <div className={classes.inner}>
        <h2>Nouvelle période</h2>
        <input
          type="text"
          placeholder="description..."
          value={description}
          onChange={descriptionChangeHandler}
        />
        <ProjectSelect
          projects={projects}
          selectedProject={selectedProject}
          onSelect={selectProjectHandler}
          onCreateProject={onCreateProject}
          onDeleteProject={onDeleteProject}
        />
        <Button onClick={startPeriodHandler} variant={"BIG"}>
          Commencer
        </Button>
      </div>
    </div>
  );
};
