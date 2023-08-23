import { useEffect, useReducer, useState } from 'react';
import { Period, PeriodsAction, Project, ProjectsAction, periodSchema, projectSchema } from '../../models';

import { DUMMY_PROJECTS } from '../../utils/dummy-values';

import ActivePeriod from '../../components/Periods/ActivePeriod/ActivePeriod';
import NewPeriod from '../../components/Periods/NewPeriod/NewPeriod';
import NewProject from '../../components/Periods/NewPeriod/NewProject';
import PeriodList from '../../components/Periods/PeriodList/PeriodList';
import Modal from '../../components/UI/Modal/Modal';
import classes from './TrackerView.module.css';

const periodReducer = (periods: Period[], action: PeriodsAction): Period[] => {
  switch (action.type) {
    case 'INIT':
      return action.newPeriods.slice();

    case 'CREATE':
      return periods.concat(action.newPeriod);

    case 'DELETE':
      return periods.filter((period) => period.id !== action.periodId);

    case 'UPDATE':
      const updatedPeriods = periods.slice();

      const updatedPeriodIndex = updatedPeriods.findIndex((period) => period.id === action.updatedPeriod.id);
      updatedPeriods[updatedPeriodIndex] = action.updatedPeriod;

      return updatedPeriods;
  }

  return periods;
};

const projectdReducer = (projects: Project[], action: ProjectsAction): Project[] => {
  switch (action.type) {
    case 'CREATE':
      return projects.concat(action.newProject);

    case 'INIT':
      return projects.concat(action.newProjects);
  }

  return projects;
};

const TrackerView = () => {
  const [projects, projectsDispatch] = useReducer(projectdReducer, []);
  const [periods, periodsDispatch] = useReducer(periodReducer, []);
  const [activePeriod, setActivePeriod] = useState<Period | null>(null);

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [lastCreatedProject, setLastCreatedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Active Period ?
    const initialActivePeriod = getInitialActivePeriod();
    setActivePeriod(initialActivePeriod);

    // Periods ?
    const initialPeriods = getInitialPeriods();
    periodsDispatch({ type: 'INIT', newPeriods: initialPeriods });

    // Projects ?
    const initialProject = getInitialProjects();
    projectsDispatch({ type: 'INIT', newProjects: initialProject });
  }, []);

  useEffect(() => {
    localStorage.setItem('dwp_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('dwp_periods', JSON.stringify(periods));
  }, [periods]);

  useEffect(() => {
    localStorage.setItem('dwp_active_period', JSON.stringify(activePeriod));
  }, [activePeriod]);

  const startPeriodHandler = (newPeriod: Period) => {
    setActivePeriod(newPeriod);
  };

  const updatePeriodHandler = (updatedPeriod: Period) => {
    periodsDispatch({ type: 'UPDATE', updatedPeriod });
  };

  const deletePeriodHandler = (periodId: string) => {
    periodsDispatch({ type: 'DELETE', periodId });
  };

  const createProjectHandler = (newProject: Project) => {
    projectsDispatch({ type: 'CREATE', newProject });
    setShowNewProjectModal(false);
    setLastCreatedProject(newProject);
  };

  const stopPeriodHandler = () => {
    if (!activePeriod) {
      return;
    }

    activePeriod.end = Date.now();
    periodsDispatch({ type: 'CREATE', newPeriod: activePeriod });
    setActivePeriod(null);
  };

  return (
    <div className={classes['tracker-view']}>
      {activePeriod && <ActivePeriod period={activePeriod} onClick={stopPeriodHandler} />}
      {!activePeriod && (
        <>
          <NewPeriod
            projects={projects}
            lastCreatedProject={lastCreatedProject}
            onStartPeriod={startPeriodHandler}
            onCreateProject={() => setShowNewProjectModal(true)}
          />
          {periods.length > 0 && (
            <PeriodList
              periods={periods}
              onDeletePeriod={deletePeriodHandler}
              lastCreatedProject={lastCreatedProject}
              projects={projects}
              onCreateProject={() => setShowNewProjectModal(true)}
              onUpdatePeriod={updatePeriodHandler}
            />
          )}
          {showNewProjectModal && (
            <Modal onClose={() => setShowNewProjectModal(false)}>
              <NewProject onCreateProject={createProjectHandler} onCancel={() => setShowNewProjectModal(false)} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default TrackerView;

// On extrait la fonction du useEffect pour la rendre plus lisible
// en la nommant ça permet de mieux comprendre ce qu'elle fait
const getInitialActivePeriod = () => {
  const storedActivePeriod = localStorage.getItem('dwp_active_period');
  if (!storedActivePeriod) {
    // Early return pattern
    // ça permet de sortir de la fonction plus tôt et de pas imbriquer le reste du code dans un else
    return null;
  }

  const parsedActivePeriod = JSON.parse(storedActivePeriod);

  // on valide le type de la période récupérée car le JSON stringifié est de type any
  const activePeriodValidation = periodSchema.safeParse(parsedActivePeriod);
  if (!activePeriodValidation.success) {
    return null;
  }

  // on utilise le type validé plutôt que le JSON stringifié qui est de type any
  return activePeriodValidation.data;
};

const getInitialPeriods = () => {
  const storedPeriods = localStorage.getItem('dwp_periods');
  if (!storedPeriods) {
    return [];
  }
  const parsedPeriods = JSON.parse(storedPeriods);
  const periodValidation = periodSchema.array().safeParse(parsedPeriods);
  if (!periodValidation.success) {
    return [];
  }
  return periodValidation.data;
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
