// src/components/__tests__/Button.integration.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button'; // Ajustá la ruta si tu componente está en otro lugar

describe('Button - Integración', () => {
  test('debería renderizar el botón con el texto correcto', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  test('debería llamar a la función onClick al hacer clic', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Presionar</Button>);

    const boton = screen.getByRole('button', { name: /presionar/i });
    fireEvent.click(boton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
