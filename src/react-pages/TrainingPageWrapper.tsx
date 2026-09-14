import React from 'react';
import { TrainingPage } from '../components/TrainingPage';

export function TrainingPageWrapper() {
  return <TrainingPage onBack={() => { window.location.href = '/'; }} />;
}
