import { motion } from 'framer-motion'
import { type PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

interface ModalProps {
  onClose: () => void
}

const Backdrop = (props: ModalProps) => {
  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={classes.backdrop}
    onClick={props.onClose}
  />
}

const ModalOverlay = (props: PropsWithChildren) => {
  return (
    <motion.div
      variants={{
        hidden: { y: -30, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.25 }}
      className={classes.modal}
    >
      <div className={classes.content}>{props.children}</div>
    </motion.div>
  )
}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const portalElement = document.getElementById('overlays') as HTMLElement

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  )
}

export default Modal
