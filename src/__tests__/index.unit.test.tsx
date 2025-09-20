// src/pages/__tests__/index.test.tsx - Pruebas de la página principal
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/index';

// Mock de las funciones de utilidad
jest.mock('../../utils/helpers', () => ({
  formatearFecha: jest.fn(fecha => {
    if (!fecha || !(fecha instanceof Date)) return 'Fecha inválida';
    return '25/12/2023';
  }),
  validarEmail: jest.fn(email => {
    return email && email.includes('@') && email.includes('.');
  }),
  calcularEdad: jest.fn(fecha => {
    if (!fecha) return 0;
    return 25;
  }),
  capitalizarTexto: jest.fn(texto => {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }),
  formatearMoneda: jest.fn(monto => `$${monto || 0}`),
}));

describe('HomePage - Pruebas Unitarias', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debería renderizar el título principal', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Pipeline CI\/CD - Ingeniería de Software/i)
    ).toBeInTheDocument();
  });

  test('debería renderizar el formulario de agregar usuario', () => {
    render(<HomePage />);
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de nacimiento/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /agregar usuario/i })
    ).toBeInTheDocument();
  });

  test('debería mostrar mensaje cuando no hay usuarios', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/no hay usuarios registrados/i)
    ).toBeInTheDocument();
  });

  test('debería permitir escribir en los campos del formulario', () => {
    render(<HomePage />);
    const inputNombre = screen.getByTestId('input-nombre');
    const inputEmail = screen.getByTestId('input-email');
    const inputFecha = screen.getByTestId('input-fecha');

    fireEvent.change(inputNombre, { target: { value: 'Juan Pérez' } });
    fireEvent.change(inputEmail, { target: { value: 'juan@ejemplo.com' } });
    fireEvent.change(inputFecha, { target: { value: '1998-05-15' } });

    expect(inputNombre).toHaveValue('Juan Pérez');
    expect(inputEmail).toHaveValue('juan@ejemplo.com');
    expect(inputFecha).toHaveValue('1998-05-15');
  });

  test('debería mostrar errores de validación cuando faltan campos', () => {
    render(<HomePage />);
    const botonAgregar = screen.getByRole('button', {
      name: /agregar usuario/i,
    });
    fireEvent.click(botonAgregar);

    expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
    expect(
      screen.getByText(/la fecha de nacimiento es requerida/i)
    ).toBeInTheDocument();
  });

  test('debería mostrar error cuando el email es inválido', () => {
    render(<HomePage />);
    const inputNombre = screen.getByTestId('input-nombre');
    const inputEmail = screen.getByTestId('input-email');
    const inputFecha = screen.getByTestId('input-fecha');
    const botonAgregar = screen.getByRole('button', {
      name: /agregar usuario/i,
    });

    fireEvent.change(inputNombre, { target: { value: 'Juan Pérez' } });
    fireEvent.change(inputEmail, { target: { value: 'email-invalido' } });
    fireEvent.change(inputFecha, { target: { value: '1998-05-15' } });
    fireEvent.click(botonAgregar);

    expect(
      screen.getByText(/el email no tiene un formato válido/i)
    ).toBeInTheDocument();
  });

  test('debería agregar un usuario correctamente', () => {
    render(<HomePage />);
    const inputNombre = screen.getByTestId('input-nombre');
    const inputEmail = screen.getByTestId('input-email');
    const inputFecha = screen.getByTestId('input-fecha');
    const botonAgregar = screen.getByRole('button', {
      name: /agregar usuario/i,
    });

    fireEvent.change(inputNombre, { target: { value: 'juan pérez' } });
    fireEvent.change(inputEmail, { target: { value: 'juan@ejemplo.com' } });
    fireEvent.change(inputFecha, { target: { value: '1998-05-15' } });
    fireEvent.click(botonAgregar);

    expect(screen.getByText('Juan pérez')).toBeInTheDocument();
    expect(screen.getByText('juan@ejemplo.com')).toBeInTheDocument();
  });

  test('debería mostrar mensaje de éxito al agregar usuario', () => {
    render(<HomePage />);
    const inputNombre = screen.getByTestId('input-nombre');
    const inputEmail = screen.getByTestId('input-email');
    const inputFecha = screen.getByTestId('input-fecha');
    const botonAgregar = screen.getByRole('button', {
      name: /agregar usuario/i,
    });

    fireEvent.change(inputNombre, { target: { value: 'María García' } });
    fireEvent.change(inputEmail, { target: { value: 'maria@ejemplo.com' } });
    fireEvent.change(inputFecha, { target: { value: '1995-03-20' } });
    fireEvent.click(botonAgregar);

    expect(
      screen.getByText(/usuario agregado exitosamente/i)
    ).toBeInTheDocument();
  });

  test('debería limpiar el formulario después de agregar usuario', () => {
    render(<HomePage />);
    const inputNombre = screen.getByTestId('input-nombre');
    const inputEmail = screen.getByTestId('input-email');
    const inputFecha = screen.getByTestId('input-fecha');
    const botonAgregar = screen.getByRole('button', {
      name: /agregar usuario/i,
    });

    fireEvent.change(inputNombre, { target: { value: 'Ana López' } });
    fireEvent.change(inputEmail, { target: { value: 'ana@ejemplo.com' } });
    fireEvent.change(inputFecha, { target: { value: '1992-08-10' } });
    fireEvent.click(botonAgregar);

    expect(inputNombre).toHaveValue('');
    expect(inputEmail).toHaveValue('');
    expect(inputFecha).toHaveValue('');
  });

  test('debería limpiar el formulario al hacer clic en Limpiar', () => {
    render(<HomePage />);
    const inputNombre = screen.getByTestId('input-nombre');
    const inputEmail = screen.getByTestId('input-email');
    const botonLimpiar = screen.getByRole('button', { name: /limpiar/i });

    fireEvent.change(inputNombre, { target: { value: 'Texto de prueba' } });
    fireEvent.change(inputEmail, { target: { value: 'test@ejemplo.com' } });
    fireEvent.click(botonLimpiar);

    expect(inputNombre).toHaveValue('');
    expect(inputEmail).toHaveValue('');
  });

  test('debería eliminar un usuario al hacer clic en eliminar', () => {
    render(<HomePage />);
    const inputNombre = screen.getByTestId('input-nombre');
    const inputEmail = screen.getByTestId('input-email');
    const inputFecha = screen.getByTestId('input-fecha');
    const botonAgregar = screen.getByRole('button', {
      name: /agregar usuario/i,
    });

    fireEvent.change(inputNombre, { target: { value: 'Usuario Temporal' } });
    fireEvent.change(inputEmail, { target: { value: 'temporal@ejemplo.com' } });
    fireEvent.change(inputFecha, { target: { value: '1990-01-01' } });
    fireEvent.click(botonAgregar);

    expect(screen.getByText('Usuario temporal')).toBeInTheDocument();

    const botonEliminar = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(botonEliminar);

    expect(screen.queryByText('Usuario temporal')).not.toBeInTheDocument();
  });

  // TEST CORREGIDO: ya no falla por elementos duplicados
  test('debería mostrar la sección de usuarios registrados', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /usuarios registrados/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('debería mostrar el contador correcto de usuarios', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /usuarios registrados \(0\)/i,
      })
    ).toBeInTheDocument();

    const inputNombre = screen.getByTestId('input-nombre');
    const inputEmail = screen.getByTestId('input-email');
    const inputFecha = screen.getByTestId('input-fecha');
    const botonAgregar = screen.getByRole('button', {
      name: /agregar usuario/i,
    });

    fireEvent.change(inputNombre, { target: { value: 'Contador Test' } });
    fireEvent.change(inputEmail, { target: { value: 'contador@ejemplo.com' } });
    fireEvent.change(inputFecha, { target: { value: '1990-12-25' } });
    fireEvent.click(botonAgregar);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /usuarios registrados \(1\)/i,
      })
    ).toBeInTheDocument();
  });

  test('debería renderizar el footer del proyecto', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/🎓 proyecto de ingeniería y calidad de software - utn/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/pipeline automatizado con github actions/i)
    ).toBeInTheDocument();
  });
});
