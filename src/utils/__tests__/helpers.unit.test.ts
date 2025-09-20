// src/utils/__tests__/helpers.test.ts
import {
  formatearFecha,
  validarEmail,
  calcularEdad,
  capitalizarTexto,
  formatearMoneda,
} from '../helpers';

describe('Helpers - Funciones de utilidad', () => {
  test('formatearFecha debe formatear correctamente', () => {
    const fecha = new Date(2023, 11, 25); // 25 diciembre 2023
    expect(formatearFecha(fecha)).toBe('25/12/2023');

    expect(formatearFecha(null as unknown as Date)).toBe('Fecha inválida');
    expect(formatearFecha(new Date('invalid date'))).toBe('Fecha inválida');
  });

  test('validarEmail debe validar correctamente', () => {
    expect(validarEmail('test@ejemplo.com')).toBe(true);
    expect(validarEmail('test.ejemplo.com')).toBe(false);
    expect(validarEmail('')).toBe(false);
    expect(validarEmail(null as unknown as string)).toBe(false);
  });

  test('calcularEdad debe calcular correctamente', () => {
    const fechaNacimiento = new Date(2000, 0, 1);
    const edad = calcularEdad(fechaNacimiento);
    expect(edad).toBeGreaterThan(0);

    expect(calcularEdad(null as unknown as Date)).toBe(0);
    expect(calcularEdad(new Date(3000, 0, 1))).toBe(0);
  });

  test('capitalizarTexto debe capitalizar correctamente', () => {
    expect(capitalizarTexto('hola mundo')).toBe('Hola Mundo');
    expect(capitalizarTexto('')).toBe('');
    expect(capitalizarTexto(null as unknown as string)).toBe('');
  });

  test('formatearMoneda debe formatear correctamente', () => {
    expect(formatearMoneda(1000)).toBe('$1.000,00');
    expect(formatearMoneda(0)).toBe('$0,00');
    expect(formatearMoneda(null as unknown as number)).toBe('$0,00');
    expect(formatearMoneda('texto' as unknown as number)).toBe('$0,00');
  });
});
