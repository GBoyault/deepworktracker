import { useState } from "react";
import { Project } from "../../../models/models";
import Button from "../../UI/Button/Button";

type NewProjectProps = {
  onCancel: () => void,
  onCreateProject: (newProject: Project) => void,
}

const NewProject = (props: NewProjectProps) => {
  const [color, setColor] = useState<Project['color']>('#256522');
  const [name, setName] = useState<Project['name']>('');

  const createProjectHandler = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      color,
      name: name.trim()
    };

    props.onCreateProject(newProject);
    setName('');
  };


  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };


  return (
    <div className="">
      <h2>Créer un nouveau projet</h2>

      <input type="text" placeholder='Nom...' value={name} onChange={nameChangeHandler} />


      <Button onClick={props.onCancel}>Annuler</Button>
      <Button onClick={createProjectHandler}>Valider</Button>
    </div>
  )
};

export default NewProject;