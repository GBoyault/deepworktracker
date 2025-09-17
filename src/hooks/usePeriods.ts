import { useEffect, useReducer } from "react";
import { type Period, type PeriodsAction, periodSchema } from "../models";
import { PeriodDuration } from "../utils/period-duration";

export const usePeriods = () => {
  const [periods, periodsDispatch] = useReducer(periodReducer, []);

  useEffect(() => {
    const initialPeriods = getInitialPeriods().filter((period) =>
      PeriodDuration.isToday(period.start)
    );

    periodsDispatch({ type: "INIT", newPeriods: initialPeriods });
  }, []);

  useEffect(() => {
    localStorage.setItem("dwt_periods", JSON.stringify(periods));
  }, [periods]);

  return [periods, periodsDispatch] as const;
};

const getInitialPeriods = () => {
  const storedPeriods = localStorage.getItem("dwt_periods");
  if (!storedPeriods) {
    return [];
  }
  const parsedPeriods = JSON.parse(storedPeriods);
  const periodValidation = periodSchema.array().safeParse(parsedPeriods);
  if (!periodValidation.success) {
    return [];
  }
  return periodValidation.data;
};

const periodReducer = (periods: Period[], action: PeriodsAction): Period[] => {
  switch (action.type) {
    case "INIT":
      return action.newPeriods.slice();

    case "CREATE":
      return [action.newPeriod, ...periods];

    case "DELETE":
      return periods.filter((period) => period.id !== action.periodId);

    case "UPDATE": {
      const updatedPeriods = periods.slice();
      const updatedPeriodIndex = updatedPeriods.findIndex(
        (period) => period.id === action.updatedPeriod.id
      );
      updatedPeriods[updatedPeriodIndex] = action.updatedPeriod;

      return updatedPeriods;
    }
  }
};
