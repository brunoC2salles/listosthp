import React from 'react';
import { AgencySolutionPage } from '../components/AgencySolutionPage';

export function AgencySolutionPageWrapper() {
  return <AgencySolutionPage onBack={() => { window.location.href = '/'; }} />;
}
