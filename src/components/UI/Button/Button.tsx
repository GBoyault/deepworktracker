import { PropsWithChildren } from 'react';
import { ButtonVariant } from '../../../models';
import classes from './Button.module.css';


type ButtonProps = {
  onClick: () => void,
  variant?: ButtonVariant,
  disabled?: boolean,
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  let className = `${classes.button}`;

  switch (props.variant) {
    case 'SMALL':
      className += ` ${classes['button--small']}`;
      break;
    case 'BIG':
      className += ` ${classes['button--big']}`;
      break;
    case 'SECONDARY':
      className += ` ${classes['button--secondary']}`;
      break;
    case 'SIMPLE':
      className += ` ${classes['button--simple']}`;
      break;
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