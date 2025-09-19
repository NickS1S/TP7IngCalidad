// jest.setup.js - Configuración inicial de Jest
import '@testing-library/jest-dom';

// Configuración global para pruebas
global.console = {
  ...console,
  // Silenciar warnings en tests
  warn: jest.fn(),
  error: jest.fn(),
};