import { useEffect, useState } from 'react';
import { Period, periodSchema } from '../../models';


export const useActivePeriod = () => {
  const [activePeriod, setActivePeriod] = useState<Period | null>(null);

  useEffect(() => {
    const initialActivePeriod = getInitialActivePeriod();
    setActivePeriod(initialActivePeriod);
  }, []);

  useEffect(() => {
    localStorage.setItem('dwt_active_period', JSON.stringify(activePeriod));
  }, [activePeriod]);

  return [activePeriod, setActivePeriod] as const;
};

const getInitialActivePeriod = () => {
  const storedActivePeriod = localStorage.getItem('dwt_active_period');
  if (!storedActivePeriod) {
    return null;
  }

  const parsedActivePeriod = JSON.parse(storedActivePeriod);
  const activePeriodValidation = periodSchema.safeParse(parsedActivePeriod);

  if (!activePeriodValidation.success) {
    return null;
  }

  return activePeriodValidation.data;
};
