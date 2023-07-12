import { Period as PeriodType } from '../../../models/models';

type periodProps = {
  period: PeriodType,
};

const EditPeriod = (props: periodProps) => {
  return (
    <div className="">
      Éditer la période
    </div>
  )
};

export default EditPeriod;