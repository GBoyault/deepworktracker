import { useEffect, useState } from "react";
import { type Period, periodSchema } from "../models";
import { PeriodDuration } from "../utils/period-duration";

export const useActivePeriod = () => {
  const [activePeriod, setActivePeriod] = useState<Period | null>(null);

  useEffect(() => {
    const initialActivePeriod = getInitialActivePeriod();
    setActivePeriod(initialActivePeriod);
  }, []);

  useEffect(() => {
    localStorage.setItem("dwt_active_period", JSON.stringify(activePeriod));
  }, [activePeriod]);

  return [activePeriod, setActivePeriod] as const;
};

const getInitialActivePeriod = () => {
  const storedActivePeriod = localStorage.getItem("dwt_active_period");
  if (!storedActivePeriod) {
    return null;
  }

  const parsedActivePeriod = JSON.parse(storedActivePeriod);
  const activePeriodValidation = periodSchema.safeParse(parsedActivePeriod);

  if (
    !activePeriodValidation.success ||
    !PeriodDuration.isToday(activePeriodValidation.data.start)
  ) {
    return null;
  }

  return activePeriodValidation.data;
};
