import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AnimatePresence } from 'framer-motion'

import { type Project, type Period as PeriodType } from '../../../models'
import { Period, EditPeriod, DailySummary } from '../'
import { Modal } from '../../UI/'

import classes from './PeriodList.module.css'

interface PeriodListProp {
  periods: PeriodType[]
  projects: Project[]
  lastCreatedProject: Project | null
  onCreateProject: () => void
  onDeleteProject: (deletedProjectId: Project['id']) => void
  onDeletePeriod: (periodId: string) => void
  onUpdatePeriod: (periodData: PeriodType) => void
}

export const PeriodList = (props: PeriodListProp) => {
  const [periodToEdit, setPeriodToEdit] = useState<PeriodType | null>(null)
  const { periods } = props

  const editPeriodHandler = (period: PeriodType) => {
    setPeriodToEdit(period)
  }

  const updatedPeriodHandler = (updatedPeriod: PeriodType) => {
    props.onUpdatePeriod(updatedPeriod)
    setPeriodToEdit(null)
  }

  const deletePeriodHandler = () => {
    if (periodToEdit) {
      props.onDeletePeriod(periodToEdit.id)
    }
    setPeriodToEdit(null)
  }

  return (
    <>
      <div className={classes['period-list']} >
        <DailySummary periods={periods} />
        {periods.map((period, index) => (
          <Period
            key={period.id}
            period={period}
            isLast={index === 0}
            onClick={editPeriodHandler.bind(null, period)}
          />
        ))}
      </div >
      <AnimatePresence>
        {periodToEdit && (
          <Modal onClose={() => { setPeriodToEdit(null) }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <EditPeriod
                period={periodToEdit}
                projects={props.projects}
                lastCreatedProject={props.lastCreatedProject}
                onDelete={deletePeriodHandler}
                onSave={updatedPeriodHandler}
                onCancel={() => { setPeriodToEdit(null) }}
                onCreateProject={props.onCreateProject}
                onDeleteProject={props.onDeleteProject}
              />
            </LocalizationProvider>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
