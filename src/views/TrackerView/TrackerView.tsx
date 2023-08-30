import { useState } from 'react'

import { type Period, type Project } from '../../models'
import { useProjects } from '../../hooks/useProjects'
import { usePeriods } from '../../hooks/usePeriods'
import { useActivePeriod } from '../../hooks/useActivePeriod'

import NewPeriod from '../../components/Periods/NewPeriod/NewPeriod'
import PeriodList from '../../components/Periods/PeriodList/PeriodList'
import PeriodListPlaceholder from '../../components/Periods/PeriodList/PeriodListPlaceholder'
import NewProject from '../../components/Periods/NewPeriod/NewProject'
import ActivePeriod from '../../components/Periods/ActivePeriod/ActivePeriod'
import Modal from '../../components/UI/Modal/Modal'
import classes from './TrackerView.module.css'

const TrackerView = () => {
  const [projects, projectsDispatch] = useProjects()
  const [periods, periodsDispatch] = usePeriods()
  const [activePeriod, setActivePeriod] = useActivePeriod()

  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [lastCreatedProject, setLastCreatedProject] = useState<Project | null>(null)

  const startPeriodHandler = (newPeriod: Period) => {
    setActivePeriod(newPeriod)
  }

  const updatePeriodHandler = (updatedPeriod: Period) => {
    periodsDispatch({ type: 'UPDATE', updatedPeriod })
  }

  const deletePeriodHandler = (periodId: string) => {
    periodsDispatch({ type: 'DELETE', periodId })
  }

  const createProjectHandler = (newProject: Project) => {
    projectsDispatch({ type: 'CREATE', newProject })
    setShowNewProjectModal(false)
    setLastCreatedProject(newProject)
  }

  const stopPeriodHandler = () => {
    if (!activePeriod) {
      return
    }

    const newPeriod = { ...activePeriod, end: Date.now() }
    periodsDispatch({ type: 'CREATE', newPeriod })
    setActivePeriod(null)
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
            onCreateProject={() => { setShowNewProjectModal(true) }}
          />
          {periods.length > 0
            ? <PeriodList
              periods={periods}
              onDeletePeriod={deletePeriodHandler}
              lastCreatedProject={lastCreatedProject}
              projects={projects}
              onCreateProject={() => { setShowNewProjectModal(true) }}
              onUpdatePeriod={updatePeriodHandler}
            />
            : <PeriodListPlaceholder />
          }
          {showNewProjectModal && (
            <Modal onClose={() => { setShowNewProjectModal(false) }}>
              <NewProject onCreateProject={createProjectHandler} onCancel={() => { setShowNewProjectModal(false) }}
              />
            </Modal>
          )}
        </>
      )}

    </div>
  )
}

export default TrackerView
