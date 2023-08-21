import { useReducer, useState } from 'react';
import { Period, Project, ActionsKind, PeriodsAction, ProjectsAction } from '../../models';

import NewPeriod from '../../components/Periods/NewPeriod/NewPeriod';
import PeriodList from '../../components/Periods/PeriodList/PeriodList';
import NewProject from '../../components/Periods/NewPeriod/NewProject';
import ActivePeriod from '../../components/Periods/ActivePeriod/ActivePeriod';
import Modal from '../../components/UI/Modal/Modal';
import classes from './TrackerView.module.css';


const DUMMY_PERIODS: Period[] = [
  {
    id: 'id2',
    description: 'implémentation chose',
    start: 1688658850419,
    end: 1688658959419,
  },
  {
    id: 'id3',
    description: 'implémentation machin',
    start: 1688754348599,
    end: 1688757958799,
  },
  {
    id: 'id4',
    start: 1688754348599,
    end: 1688759958799,
    description: 'implémentation projects',
    project: {
      id: 'idp1',
      name: 'TimeTracker',
      color: '#d38e34'
    }
  },
  {
    id: 'id5',
    start: 1688754348599,
    end: 1688756958799,
  },
  {
    id: 'id6',
    start: 1688754348599,
    end: 1688756058799,
  },
  {
    id: 'id7',
    description: 'implémentation durées',
    start: 1688754348599,
    end: 1688754958799,
  },
  {
    id: 'id8',
    start: 1688659987224,
    end: 1688659991141,
  },
  {
    id: 'id9',
    start: 1688659987224,
    end: 1688660987224,
  },
];
const DUMMY_PROJECTS: Project[] = [
  {
    id: 'idp1',
    name: 'Boggle',
    color: '#a75ee8'
  },
  {
    id: 'idp2',
    name: 'Des frites !',
    color: '#c1b313'
  },
];

const periodReducer = (periods: Period[], action: PeriodsAction): Period[] => {
  switch (action.type) {
    case ActionsKind.CREATE:
      return periods.concat(action.newPeriod);

    case ActionsKind.DELETE:
      return periods.filter(period => period.id !== action.periodId);

    case ActionsKind.UPDATE:
      const updatedPeriods = periods.slice();

      const updatedPeriodIndex = updatedPeriods.findIndex(period => period.id === action.updatedPeriod.id);
      updatedPeriods[updatedPeriodIndex] = action.updatedPeriod;

      return updatedPeriods;
  }

  return periods;
};

const projectdReducer = (projects: Project[], action: ProjectsAction): Project[] => {
  switch (action.type) {
    case ActionsKind.CREATE:
      return projects.concat(action.newProject)
  }

  return projects;
};


const TrackerView = () => {
  const [periods, periodsDispatch] = useReducer(periodReducer, DUMMY_PERIODS);
  const [projects, projectsDispatch] = useReducer(projectdReducer, DUMMY_PROJECTS);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [lastCreatedProject, setLastCreatedProject] = useState<Project | null>(null);
  const [activePeriod, setActivePeriod] = useState<Period | null>(null);

  const startPeriodHandler = (newPeriod: Period) => {
    setActivePeriod(newPeriod);
  };

  const updatePeriodHandler = (updatedPeriod: Period) => {
    periodsDispatch({ type: ActionsKind.UPDATE, updatedPeriod });
  }

  const deletePeriodHandler = (periodId: string) => {
    periodsDispatch({ type: ActionsKind.DELETE, periodId });
  };

  const createProjectHandler = (newProject: Project) => {
    projectsDispatch({ type: ActionsKind.CREATE, newProject });
    setShowNewProjectModal(false);
    setLastCreatedProject(newProject);
  };

  const stopPeriodHandler = () => {
    if (!activePeriod) {
      return;
    }

    activePeriod.end = Date.now();
    periodsDispatch({ type: ActionsKind.CREATE, newPeriod: activePeriod });
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