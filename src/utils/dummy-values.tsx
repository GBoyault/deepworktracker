import { type Period, type Project } from '../models'

export const DUMMY_PERIODS: Period[] = [
  {
    id: 'id2',
    description: 'implémentation chose',
    start: 1688658850419,
    end: 1688658959419
  },
  {
    id: 'id3',
    description: 'implémentation machin',
    start: 1688754348599,
    end: 1688757958799
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
    end: 1688756958799
  },
  {
    id: 'id6',
    start: 1688754348599,
    end: 1688756058799
  },
  {
    id: 'id7',
    description: 'implémentation durées',
    start: 1688754348599,
    end: 1688754958799
  },
  {
    id: 'id8',
    start: 1688659987224,
    end: 1688659991141
  },
  {
    id: 'id9',
    start: 1688659987224,
    end: 1688660987224
  }
]

export const DUMMY_PROJECTS: Project[] = [
  {
    id: 'idp1',
    name: 'Boggle App',
    color: '#a75ee8'
  },
  {
    id: 'idp2',
    name: 'TypeScript',
    color: '#c1b313'
  }
]
