import { PropsWithChildren } from 'react';
import classes from './Button.module.css';


type ButtonProps = {
  onClick: () => void,
  variant?: string,
  disabled?: boolean,
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  let className = `${classes.button}`;

  if ('small' === props.variant) {
    className += ` ${classes['button--small']}`;
  }

  if ('big' === props.variant) {
    className += ` ${classes['button--big']}`;
  }

  return (
    <button
      className={className}
      type='button'
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;