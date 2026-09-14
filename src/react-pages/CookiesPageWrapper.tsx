import React from 'react';
import { CookiesPage } from '../components/CookiesPage';

export function CookiesPageWrapper() {
  return <CookiesPage onBack={() => { window.location.href = '/'; }} />;
}
