import { useState } from "react";
import { motion } from "framer-motion";
import { type Project } from "../../../models";
import classes from "./ColorPicker.module.css";

const colors: Array<Project["color"]> = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];

interface ColorPickerProps {
  onChange: (color: Project["color"]) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const selectColorHandler = (color: Project["color"]) => {
    setSelectedColor(color);
    onChange(color);
  };

  return (
    <motion.ul
      className={classes.colors}
      variants={{
        visible: { transition: { staggerChildren: 0.02 } },
      }}
    >
      {colors.map((color) => (
        <motion.li
          key={color}
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: [0.8, 1.3, 1] },
          }}
          exit={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
        >
          <button
            style={{
              borderColor: color,
              backgroundColor: color === selectedColor ? color : "#fff",
            }}
            className={`${classes.color} ${color === selectedColor ? classes["color--selected"] : ""}`}
            onClick={selectColorHandler.bind(null, color)}
          ></button>
        </motion.li>
      ))}
    </motion.ul>
  );
};
