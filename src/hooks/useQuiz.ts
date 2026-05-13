import { useState, useCallback } from 'react';

export type QuizState = 'idle' | 'in-progress' | 'completed';

export interface QuizManager {
  currentStep: number;
  totalSteps: number;
  state: QuizState;
  startQuiz: () => void;
  nextStep: () => void;
  completeQuiz: () => void;
}

export function useQuiz(totalSteps: number = 7): QuizManager {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<QuizState>('idle');

  const startQuiz = useCallback(() => {
    setState('in-progress');
    setCurrentStep(1);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= totalSteps) {
        setState('completed');
        return totalSteps;
      }
      return prev + 1;
    });
  }, [totalSteps]);

  const completeQuiz = useCallback(() => {
    setState('completed');
    setCurrentStep(totalSteps);
  }, [totalSteps]);

  return {
    currentStep,
    totalSteps,
    state,
    startQuiz,
    nextStep,
    completeQuiz,
  };
}
