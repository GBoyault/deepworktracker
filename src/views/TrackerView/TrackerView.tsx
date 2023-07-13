import { useReducer, useState } from 'react';
import { Period, Project, ActionsKind, PeriodsAction, ProjectsAction } from '../../models/models';
import NewPeriod from '../../components/Periods/NewPeriod/NewPeriod';
import PeriodList from '../../components/Periods/PeriodList/PeriodList';
import NewProject from '../../components/Periods/NewPeriod/NewProject';
import Modal from '../../components/UI/Modal/Modal';
import styles from './TrackerView.module.css';


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
    color: '#622a94'
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

  const createPeriodHandler = (newPeriod: Period) => {
    periodsDispatch({ type: ActionsKind.CREATE, newPeriod });
  };

  const deletePeriodHandler = (periodId: string) => {
    periodsDispatch({ type: ActionsKind.DELETE, periodId });
  };

  const createProjectHandler = (newProject: Project) => {
    projectsDispatch({ type: ActionsKind.CREATE, newProject });
    setShowNewProjectModal(false);
  };

  return (
    <div className={styles['tracker-view']}>
      <NewPeriod
        projects={projects}
        onCreatePeriod={createPeriodHandler}
        onCreateProject={() => setShowNewProjectModal(true)}
      />
      <PeriodList
        periods={periods}
        onDeletePeriod={deletePeriodHandler}
      />
      {showNewProjectModal && (
        <Modal onClose={() => setShowNewProjectModal(false)}>
          <NewProject
            onCreateProject={createProjectHandler}
            onCancel={() => setShowNewProjectModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default TrackerView;