import { useState } from 'react'
import { type Project } from '../../../models'
import classes from './ColorPicker.module.css'

const colors: Array<Project['color']> = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b'
]

interface ColorPickerProps {
  onChange: (color: Project['color']) => void
}

const ColorPicker = (props: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0])

  const selectColorHandler = (color: Project['color']) => {
    setSelectedColor(color)
    props.onChange(color)
  }

  return (
    <ul className={classes.colors}>
      {colors.map(color => (
        <li key={color}>
          <button
            style={{ borderColor: color, backgroundColor: color === selectedColor ? color : '#fff' }}
            className={`${classes.color} ${color === selectedColor ? classes['color--selected'] : ''}`}
            onClick={selectColorHandler.bind(null, color)}
          ></button>
        </li>
      ))}
    </ul>
  )
}

export default ColorPicker
