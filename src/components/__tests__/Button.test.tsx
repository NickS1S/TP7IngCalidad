// src/components/__tests__/Button.test.tsx - Pruebas unitarias del componente Button
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Componente Button - Pruebas Unitarias', () => {
  test('debería renderizar correctamente con texto', () => {
    render(<Button>Hacer clic</Button>);

    const button = screen.getByText('Hacer clic');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-testid', 'button');
  });

  test('debería ejecutar la función onClick cuando se hace clic', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Botón de prueba</Button>);

    const button = screen.getByText('Botón de prueba');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('debería estar deshabilitado cuando la prop disabled es true', () => {
    render(<Button disabled>Botón deshabilitado</Button>);

    const button = screen.getByText('Botón deshabilitado');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  test('debería aplicar las clases CSS correctas para variant primary', () => {
    render(<Button variant="primary">Botón primario</Button>);

    const button = screen.getByText('Botón primario');
    expect(button).toHaveClass('bg-blue-500', 'text-white');
  });

  test('debería aplicar las clases CSS correctas para variant secondary', () => {
    render(<Button variant="secondary">Botón secundario</Button>);

    const button = screen.getByText('Botón secundario');
    expect(button).toHaveClass('bg-gray-500', 'text-white');
  });

  test('debería aplicar las clases CSS correctas para variant danger', () => {
    render(<Button variant="danger">Botón peligroso</Button>);

    const button = screen.getByText('Botón peligroso');
    expect(button).toHaveClass('bg-red-500', 'text-white');
  });

  test('debería aplicar clases CSS personalizadas', () => {
    render(<Button className="mi-clase-personalizada">Botón con clase</Button>);

    const button = screen.getByText('Botón con clase');
    expect(button).toHaveClass('mi-clase-personalizada');
  });

  test('debería tener type="button" por defecto', () => {
    render(<Button>Botón por defecto</Button>);

    const button = screen.getByText('Botón por defecto');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('debería permitir cambiar el type', () => {
    render(<Button type="submit">Botón enviar</Button>);

    const button = screen.getByText('Botón enviar');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('no debería ejecutar onClick cuando está deshabilitado', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Botón deshabilitado
      </Button>
    );

    const button = screen.getByText('Botón deshabilitado');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('debería renderizar children de tipo ReactNode', () => {
    render(
      <Button>
        <span>Icono</span>
        <span>Texto</span>
      </Button>
    );

    expect(screen.getByText('Icono')).toBeInTheDocument();
    expect(screen.getByText('Texto')).toBeInTheDocument();
  });

  test('debería tener las clases base correctas', () => {
    render(<Button>Botón base</Button>);

    const button = screen.getByText('Botón base');
    expect(button).toHaveClass('px-4', 'py-2', 'rounded', 'font-medium');
  });

  test('debería manejar múltiples clics', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Botón múltiple</Button>);

    const button = screen.getByText('Botón múltiple');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});
