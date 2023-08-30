import classes from './PeriodListPlaceholder.module.css'

const PeriodListPlaceholder = () => {
  return (
    <div className={classes.placeholder}>
      <p>Terminez au moins une période de concentration, puis retrouvez ici le récapitulatif de votre journée.</p>
      <div className={classes['empty-period']}/>
      <div className={classes['empty-period']}/>
      <div className={classes['empty-period']}/>
    </div>
  )
}

export default PeriodListPlaceholder
