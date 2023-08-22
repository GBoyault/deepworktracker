import classes from './AboutView.module.css'

const AboutView = () => {
  return (
    <div className={classes['about-view']}>
      <h2>À propos</h2>
      <p>Web app de time tracking, orienté autour du concept de deep work de <a href='https://calnewport.com/' rel='noreferrer' target='_blank'>Cal Newport</a>, pour noter son temps de concentration profonde sur une journée de travail.</p>
      <p>Projet en cours de réalisation, pour me former à React + TypeScript.</p>
      <p>Réalisation : <a href='https://gabrielboyault.com/' target='_blank'>Gabriel Boyault</a><br /></p>
    </div>
  );
}

export default AboutView;