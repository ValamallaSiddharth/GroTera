'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type GrowthObjective = 'leads' | 'commerce' | 'visibility';

type GrowthPlan = {
  budget: number;
  objective: GrowthObjective;
  setBudget: (budget: number) => void;
  setObjective: (objective: GrowthObjective) => void;
};

const GrowthPlanContext = createContext<GrowthPlan | null>(null);

export function GrowthPlanProvider({ children }: { children: React.ReactNode }) {
  const [budget, setBudget] = useState(12000);
  const [objective, setObjective] = useState<GrowthObjective>('leads');
  const value = useMemo(() => ({ budget, objective, setBudget, setObjective }), [budget, objective]);

  return <GrowthPlanContext.Provider value={value}>{children}</GrowthPlanContext.Provider>;
}

export function useGrowthPlan() {
  const context = useContext(GrowthPlanContext);
  if (!context) throw new Error('useGrowthPlan must be used within GrowthPlanProvider');
  return context;
}
