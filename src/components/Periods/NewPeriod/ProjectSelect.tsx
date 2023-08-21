import { useState } from "react";
import { Project } from "../../../models";
import classes from './ProjectSelect.module.css';


type periodProps = {
  projects: Project[],
  selectedProject: Project | null
  onSelect: (selectedProject: Project | null) => void
  onCreateProject: () => void
};


const ProjectSelect = (props: periodProps) => {
  const [expanded, setExpanded] = useState(false);

  const expandProjectsHandler = (): void => {
    setExpanded(prevExpanded => !prevExpanded);
  }

  const selectNoProjetHandler = () => {
    props.onSelect(null);
  }

  const selection = props.selectedProject
    ? props.selectedProject.name
    : 'Choisir un project';

  const projectsList = props.projects.map(project => (
    <li
      className={`${classes['project-item']} ${project.id === props.selectedProject?.id ? classes['project-item--selected'] : ''}`}
      key={project.id}
      role='button'
      onClick={props.onSelect.bind(null, project)}
      style={{ color: project.color }}
    >
      {project.name}
    </li>
  ));



  return (
    <div
      className={`${classes['project-select']} ${expanded ? classes['project-select--expanded'] : ''}`}
      onClick={expandProjectsHandler}
      aria-expanded={expanded}
      style={props.selectedProject ? { color: props.selectedProject.color } : {}}
    >
      <div className={`${classes.selection} ${!props.selectedProject ? classes['selection--empty'] : ''}`} role='button'>
        {selection}
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg>
      </div>

      {expanded && (
        <>
          <div className={classes.backdrop}></div>
          <div className={classes.dropdown}>
            <ul>
              <li
                className={`${classes['project-item']} ${classes['project-item--no-project']}`}
                key='empty-selection'
                role='button'
                onClick={selectNoProjetHandler}
              >
                Sans projet
              </li>
              {projectsList}
            </ul>
            <button className={classes['new-project']} onClick={props.onCreateProject}>Créer un projet</button>
          </div>
        </>
      )}

    </div>
  )
};

export default ProjectSelect;