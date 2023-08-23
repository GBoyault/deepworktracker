import React, { useEffect, useState } from 'react';
import { Period, Project } from '../../../models';
import Button from '../../UI/Button/Button';
import classes from './NewPeriod.module.css';
import ProjectSelect from './ProjectSelect';

type NewPeriodProp = {
  projects: Project[];
  lastCreatedProject: Project | null;
  onStartPeriod: (newPeriod: Period) => void;
  onCreateProject: () => void;
};

const NewPeriod = (props: NewPeriodProp) => {
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (props.lastCreatedProject) {
      setSelectedProject(props.lastCreatedProject);
    }
  }, [props.lastCreatedProject]);

  const descriptionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

    props.onStartPeriod(newPeriod);
    setDescription('');
    setSelectedProject(null);
  };

  return (
    <div className={classes['new-period']}>
      <div className={classes.inner}>
        <h2>Nouvelle période</h2>
        <input type='text' placeholder='description...' value={description} onChange={descriptionChangeHandler} />
        <ProjectSelect
          projects={props.projects}
          selectedProject={selectedProject}
          onSelect={selectProjectHandler}
          onCreateProject={props.onCreateProject}
        />
        <Button onClick={startPeriodHandler} variant={'BIG'}>
          Commencer
        </Button>
      </div>
    </div>
  );
};

export default NewPeriod;
