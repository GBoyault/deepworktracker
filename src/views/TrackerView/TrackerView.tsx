import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { type Period, type Project } from '../../models'
import { useProjects, usePeriods, useActivePeriod } from '../../hooks/'
import { Modal } from '../../components/UI/'
import {
  NewPeriod,
  PeriodList,
  PeriodListPlaceholder,
  NewProject,
  ActivePeriod
} from '../../components/Periods/'

import classes from './TrackerView.module.css'

export const TrackerView = () => {
  const [projects, projectsDispatch] = useProjects()
  const [periods, periodsDispatch] = usePeriods()
  const [activePeriod, setActivePeriod] = useActivePeriod()

  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [lastCreatedProject, setLastCreatedProject] = useState<Project | null>(null)

  const startPeriodHandler = (newPeriod: Period) => {
    setActivePeriod(newPeriod)
  }

  const deleteProjectHandler = (deletedProjectId: Project['id']) => {
    projectsDispatch({ type: 'DELETE', deletedProjectId })
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
    <motion.div
      className={classes['tracker-view']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode='wait'>
        {activePeriod && (
          <ActivePeriod
            key='tracking'
            period={activePeriod}
            onClick={stopPeriodHandler}
          />
        )}
        {!activePeriod && (
          <motion.div
            key='not-tracking'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <NewPeriod
              projects={projects}
              lastCreatedProject={lastCreatedProject}
              onStartPeriod={startPeriodHandler}
              onCreateProject={() => { setShowNewProjectModal(true) }}
              onDeleteProject={deleteProjectHandler}
            />
            {periods.length > 0
              ? <PeriodList
                periods={periods}
                onDeletePeriod={deletePeriodHandler}
                lastCreatedProject={lastCreatedProject}
                projects={projects}
                onCreateProject={() => { setShowNewProjectModal(true) }}
                onDeleteProject={deleteProjectHandler}
                onUpdatePeriod={updatePeriodHandler}
              />
              : <PeriodListPlaceholder />
            }
            <AnimatePresence>
              {showNewProjectModal && (
                <Modal onClose={() => { setShowNewProjectModal(false) }}>
                  <NewProject onCreateProject={createProjectHandler} onCancel={() => { setShowNewProjectModal(false) }}
                  />
                </Modal>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
