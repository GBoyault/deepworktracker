import { motion } from 'framer-motion'
import classes from './AboutView.module.css'

const AboutView = () => {
  return (
    <motion.div
      className={classes['about-view']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>À propos</h2>
      <p>Web app de time tracking, orientée autour du concept de deep work de <a href='https://calnewport.com/' rel='noreferrer' target='_blank'>Cal Newport</a>, pour noter son temps de concentration profonde sur une journée de travail et idéalement de l'améliorer.<br />
      L'écart entre ce qu'on pense faire en une journée et la réalité est parfois surprenant !</p>
      <p>Les périodes de moins de 15 minutes sont considérées comme des interruptions, des périodes trop courtes pour permettre une réflexion efficace.</p>
      <h2>Technos</h2>
      <p>React + TypeScript. Actuellement les données sont stockées en localStorage et ne sont prises en compte qu'une journée. Dans un futur incertain j'aimerais implémenter un système de compte utilisateurs et une vue tableau de bord, peut-être avec Firebase comme base de donnée. </p>
      <br />
      <p>Réalisation : <a href='https://gabrielboyault.com/' target='_blank' rel="noreferrer">Gabriel Boyault</a><br />
        Code : <a href='https://github.com/GBoyault/deepworktracker/' target='_blank' rel="noreferrer">github</a></p>
    </motion.div>
  )
}

export default AboutView
