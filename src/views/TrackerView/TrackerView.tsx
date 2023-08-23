import { useState } from 'react';
import { Period, Project } from '../../models';

import ActivePeriod from '../../components/Periods/ActivePeriod/ActivePeriod';
import NewPeriod from '../../components/Periods/NewPeriod/NewPeriod';
import NewProject from '../../components/Periods/NewPeriod/NewProject';
import PeriodList from '../../components/Periods/PeriodList/PeriodList';
import Modal from '../../components/UI/Modal/Modal';
import classes from './TrackerView.module.css';
import { useActivePeriod } from './useActivePeriod';
import { usePeriods } from './usePeriods';
import { useProjects } from './useProjects';

const TrackerView = () => {
  const [projects, projectsDispatch] = useProjects();
  const [periods, periodsDispatch] = usePeriods();
  const [activePeriod, setActivePeriod] = useActivePeriod();

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [lastCreatedProject, setLastCreatedProject] = useState<Project | null>(null);

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

    // atention à la mutabilité sur ce genre de truc
    // tu risques de modifier le state directement et de perdre la maitrise de ton state sur le render
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
