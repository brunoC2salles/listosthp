import React from 'react';
import { LegalPage } from '../components/LegalPage';

export function LegalPageWrapper() {
  return <LegalPage onBack={() => { window.location.href = '/'; }} />;
}
