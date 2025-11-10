import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpia el DOM de jsdom después de cada prueba
afterEach(() => {
  cleanup();
});