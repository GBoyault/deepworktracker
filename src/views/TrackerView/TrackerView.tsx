import { useEffect, useReducer, useState } from 'react';
import { Period, isPeriod, Project, PeriodsAction, ProjectsAction } from '../../models';

import { DUMMY_PROJECTS } from '../../utils/dummy-values';

import NewPeriod from '../../components/Periods/NewPeriod/NewPeriod';
import PeriodList from '../../components/Periods/PeriodList/PeriodList';
import NewProject from '../../components/Periods/NewPeriod/NewProject';
import ActivePeriod from '../../components/Periods/ActivePeriod/ActivePeriod';
import Modal from '../../components/UI/Modal/Modal';
import classes from './TrackerView.module.css';


const periodReducer = (periods: Period[], action: PeriodsAction): Period[] => {
  switch (action.type) {
    case 'INIT':
      return action.newPeriods.slice();

    case 'CREATE':
      return periods.concat(action.newPeriod);

    case 'DELETE':
      return periods.filter(period => period.id !== action.periodId);

    case 'UPDATE':
      const updatedPeriods = periods.slice();

      const updatedPeriodIndex = updatedPeriods.findIndex(period => period.id === action.updatedPeriod.id);
      updatedPeriods[updatedPeriodIndex] = action.updatedPeriod;

      return updatedPeriods;
  }

  return periods;
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


const TrackerView = () => {
  const [projects, projectsDispatch] = useReducer(projectdReducer, []);
  const [periods, periodsDispatch] = useReducer(periodReducer, []);
  const [activePeriod, setActivePeriod] = useState<Period | null>(null);

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [lastCreatedProject, setLastCreatedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Active Period ?
    const storedActivePeriod = localStorage.getItem('dwp_active_period');
    if (storedActivePeriod) {
      const parsedActivePeriod = JSON.parse(storedActivePeriod);

      if (isPeriod(parsedActivePeriod)) {
        const newActivePeriod: Period = {
          id: parsedActivePeriod.id,
          start: parsedActivePeriod.start
        };

        if (parsedActivePeriod.project) {
          newActivePeriod.project = parsedActivePeriod.project;
        }

        if (parsedActivePeriod.description) {
          newActivePeriod.description = parsedActivePeriod.description;
        }

        setActivePeriod(newActivePeriod);
      }
    }

    // Periods ?
    const storedPeriods = localStorage.getItem('dwp_periods');
    if (storedPeriods) {
      const parsedPeriods = JSON.parse(storedPeriods);
      periodsDispatch({ type: 'INIT', newPeriods: parsedPeriods })
    }

    // Projects ?
    const storedProjects = localStorage.getItem('dwp_projects');
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      projectsDispatch({ type: 'INIT', newProjects: parsedProjects })
    } else {
      projectsDispatch({ type: 'INIT', newProjects: DUMMY_PROJECTS })
    }

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
  }

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
  }

  return (
    <div className={classes['tracker-view']}>
      {activePeriod && (
        <ActivePeriod
          period={activePeriod}
          onClick={stopPeriodHandler}
        />
      )}
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
              <NewProject
                onCreateProject={createProjectHandler}
                onCancel={() => setShowNewProjectModal(false)}
              />
            </Modal>
          )}
        </>
      )}

    </div>
  );
}

export default TrackerView;