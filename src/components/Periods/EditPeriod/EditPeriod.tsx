import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { Period as PeriodType, Project } from '../../../models';
import Button from '../../UI/Button/Button';
import ProjectSelect from '../NewPeriod/ProjectSelect';
import classes from './EditPeriod.module.css';

type periodProps = {
  period: PeriodType;
  projects: Project[];
  lastCreatedProject: Project | null;
  onDelete: () => void;
  onSave: (periodData: PeriodType) => void;
  onCancel: () => void;
  onCreateProject: () => void;
};

const EditPeriod = (props: periodProps) => {
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState<number | undefined>(0);

  const {
    description: initialDescription,
    project: initialProject,
    start: initialStart,
    end: initialEnd,
  } = props.period;

  useEffect(() => {
    setStart(initialStart);
    setEnd(initialEnd);

    if (initialDescription) {
      setDescription(initialDescription);
    }

    if (initialProject) {
      setSelectedProject(initialProject);
    }
  }, [initialDescription, initialProject, initialStart, initialEnd]);

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

  const startChangeHandler = (updatedStart: moment.Moment | null) => {
    if (updatedStart) {
      setStart(+updatedStart.format('x'));
    }
  };

  const endChangeHandler = (updatedEnd: moment.Moment | null) => {
    if (updatedEnd) {
      setEnd(+updatedEnd.format('x'));
    }
  };

  const saveChangesHandler = () => {
    const updatedPeriodData: PeriodType = {
      ...props.period,
      description,
      start,
      end,
    };

    if (selectedProject) {
      updatedPeriodData.project = selectedProject;
    } else if (props.period.project) {
      delete updatedPeriodData.project;
    }

    props.onSave(updatedPeriodData);
  };

  const dateStart = moment(start);
  const dateEnd = moment(end);

  return (
    <div className={classes['edit-period']}>
      <h2>Éditer la période</h2>
      <div className={classes.dates}>
        <DateTimePicker label='Début' ampm={false} value={dateStart} format='HH:mm' onChange={startChangeHandler} />
        <DateTimePicker
          label='Fin'
          value={dateEnd}
          ampm={false}
          format='HH:mm'
          onChange={endChangeHandler}
          minDateTime={dateStart}
        />
      </div>
      <input
        className={classes.input}
        type='text'
        placeholder='description...'
        value={description}
        onChange={descriptionChangeHandler}
      />
      <ProjectSelect
        projects={props.projects}
        selectedProject={selectedProject}
        onSelect={selectProjectHandler}
        onCreateProject={props.onCreateProject}
      />
      <div className={classes.actions}>
        <Button onClick={props.onDelete} variant={'SIMPLE'}>
          Supprimer la période
        </Button>
        <Button onClick={props.onCancel} variant={'SECONDARY'}>
          Annuler
        </Button>
        <Button onClick={saveChangesHandler} disabled={!end || start > end}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default EditPeriod;
