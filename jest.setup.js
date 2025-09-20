/* eslint-env jest */
import '@testing-library/jest-dom';

// Silenciar warnings y errores en la consola durante los tests
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
