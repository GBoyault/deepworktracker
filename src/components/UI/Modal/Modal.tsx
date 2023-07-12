import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

type ModalProps = {
  onClose: () => void
}


const Backdrop = (props: ModalProps) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props: PropsWithChildren) => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
};


const Modal = (props: PropsWithChildren<ModalProps>) => {
  const portalElement = document.getElementById('overlays') as HTMLElement;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;