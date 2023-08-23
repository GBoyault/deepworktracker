import { useEffect, useState } from 'react';
import { Period, periodSchema } from '../../models';

export const useActivePeriod = () => {
  const [activePeriod, setActivePeriod] = useState<Period | null>(null);

  useEffect(() => {
    const initialActivePeriod = getInitialActivePeriod();
    setActivePeriod(initialActivePeriod);
  }, []);

  useEffect(() => {
    localStorage.setItem('dwp_active_period', JSON.stringify(activePeriod));
  }, [activePeriod]);

  return [activePeriod, setActivePeriod] as const;
};

// On extrait la fonction du useEffect pour la rendre plus lisible
// en la nommant ça permet de mieux comprendre ce qu'elle fait
const getInitialActivePeriod = () => {
  const storedActivePeriod = localStorage.getItem('dwp_active_period');
  if (!storedActivePeriod) {
    // Early return pattern
    // ça permet de sortir de la fonction plus tôt et de pas imbriquer le reste du code dans un else
    return null;
  }

  const parsedActivePeriod = JSON.parse(storedActivePeriod);

  // on valide le type de la période récupérée car le JSON stringifié est de type any
  const activePeriodValidation = periodSchema.safeParse(parsedActivePeriod);
  if (!activePeriodValidation.success) {
    return null;
  }

  // on utilise le type validé plutôt que le JSON stringifié qui est de type any
  return activePeriodValidation.data;
};
