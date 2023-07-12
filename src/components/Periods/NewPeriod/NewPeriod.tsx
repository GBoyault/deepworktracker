import React, { useState } from 'react';
import classes from './NewPeriod.module.css';
import { Project, Period } from '../../../models/models';
import ProjectSelect from './ProjectSelect';
import Button from '../../UI/Button/Button';


type NewPeriodProp = {
  projects: Project[],
  onCreatePeriod: (newPeriod: Period) => void,
  onCreateProject: () => void
};

const NewPeriod = (props: NewPeriodProp) => {
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const descriptionChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
  };


  const selectProjectHandler = (project: Project | null): void => {
    setSelectedProject(project);
  }

  const startPeriodHandler = (): void => {
    const newPeriod: Period = {
      id: 'newID',
      start: Date.now()
    };

    if (selectedProject) {
      newPeriod.project = selectedProject;
    }

    if (description.trim().length > 0) {
      newPeriod.description = description;
    }

    props.onCreatePeriod(newPeriod);
  };


  return (
    <>
      <div className={classes['new-period']}>
        <div className={classes.inner}>
          <h2>Nouvelle période</h2>
          <input type="text" placeholder='description...' value={description} onChange={descriptionChangeHandler} />
          <ProjectSelect
            projects={props.projects}
            selectedProject={selectedProject}
            onSelect={selectProjectHandler}
            onCreateProject={props.onCreateProject}
          />
          <Button onClick={startPeriodHandler} variant='big'>Commencer</Button>
        </div>
      </div>
    </>
  );
};

export default NewPeriod;