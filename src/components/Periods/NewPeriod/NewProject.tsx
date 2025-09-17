import { useState } from "react";
import { type Project } from "../../../models";
import { ColorPicker } from "./";
import { Button } from "../../UI/";
import classes from "./NewProject.module.css";

interface NewProjectProps {
  onCancel: () => void;
  onCreateProject: (newProject: Project) => void;
}

export const NewProject = ({ onCancel, onCreateProject }: NewProjectProps) => {
  const [color, setColor] = useState<Project["color"]>("#f44336");
  const [name, setName] = useState<Project["name"]>("");

  const createProjectHandler = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      color,
      name: name.trim(),
    };

    onCreateProject(newProject);
    setName("");
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const colorChangeHandler = (color: Project["color"]) => {
    setColor(color);
  };

  return (
    <div className={classes["new-project"]}>
      <h2>Créer un nouveau projet</h2>

      <input
        className={classes.input}
        type="text"
        placeholder="Nom..."
        value={name}
        onChange={nameChangeHandler}
      />

      <ColorPicker onChange={colorChangeHandler} />

      <div className={classes.actions}>
        <Button onClick={onCancel} variant={"SECONDARY"}>
          Annuler
        </Button>
        <Button onClick={createProjectHandler} disabled={name.trim() === ""}>
          Valider
        </Button>
      </div>
    </div>
  );
};
