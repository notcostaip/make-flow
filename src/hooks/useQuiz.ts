import { useState, useCallback } from 'react';

export type QuizState = 'idle' | 'in-progress' | 'completed';

export interface QuizManager {
  currentStep: number;
  totalSteps: number;
  state: QuizState;
  answers: Record<number, string>;
  startQuiz: () => void;
  nextStep: (answer?: string) => void;
  completeQuiz: (answer?: string) => void;
}

export function useQuiz(totalSteps: number = 7): QuizManager {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<QuizState>('idle');
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const startQuiz = useCallback(() => {
    setState('in-progress');
    setCurrentStep(1);
  }, []);

  const nextStep = useCallback((answer?: string) => {
    if (answer) {
      setAnswers(prev => ({ ...prev, [currentStep]: answer }));
    }
    
    setCurrentStep((prev) => {
      if (prev >= totalSteps) {
        setState('completed');
        return totalSteps;
      }
      return prev + 1;
    });
  }, [totalSteps, currentStep]);

  const completeQuiz = useCallback((answer?: string) => {
    if (answer) {
      setAnswers(prev => ({ ...prev, [currentStep]: answer }));
    }
    setState('completed');
    setCurrentStep(totalSteps);
  }, [totalSteps, currentStep]);

  return {
    currentStep,
    totalSteps,
    state,
    answers,
    startQuiz,
    nextStep,
    completeQuiz,
  };
}
