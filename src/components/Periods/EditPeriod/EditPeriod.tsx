import { Period as PeriodType } from '../../../models/models';
import Button from '../../UI/Button/Button';
type periodProps = {
  period: PeriodType,
  onDelete: () => void
};

const EditPeriod = (props: periodProps) => {
  return (
    <div className="">
      Éditer la période
      <Button onClick={props.onDelete}>Supprimer la période</Button>
    </div>
  )
};

export default EditPeriod;