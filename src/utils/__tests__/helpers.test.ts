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
    // Usar Date con año, mes, día para evitar problemas de zona horaria
    const fecha = new Date(2023, 11, 25); // 25 diciembre 2023
    expect(formatearFecha(fecha)).toBe('25/12/2023');

    expect(formatearFecha(null as any)).toBe('Fecha inválida');
    expect(formatearFecha(new Date('invalid date'))).toBe('Fecha inválida');
  });

  test('validarEmail debe validar correctamente', () => {
    expect(validarEmail('test@ejemplo.com')).toBe(true);
    expect(validarEmail('test.ejemplo.com')).toBe(false);
    expect(validarEmail('')).toBe(false);
    expect(validarEmail(null as any)).toBe(false);
  });

  test('calcularEdad debe calcular correctamente', () => {
    const fechaNacimiento = new Date(2000, 0, 1); // 1 enero 2000
    const edad = calcularEdad(fechaNacimiento);
    expect(edad).toBeGreaterThan(0);

    expect(calcularEdad(null as any)).toBe(0);
    expect(calcularEdad(new Date(3000, 0, 1))).toBe(0); // fecha futura
  });

  test('capitalizarTexto debe capitalizar correctamente', () => {
    expect(capitalizarTexto('hola mundo')).toBe('Hola Mundo');
    expect(capitalizarTexto('')).toBe('');
    expect(capitalizarTexto(null as any)).toBe('');
  });

  test('formatearMoneda debe formatear correctamente', () => {
    expect(formatearMoneda(1000)).toBe('$1.000,00');
    expect(formatearMoneda(0)).toBe('$0,00');
    expect(formatearMoneda(null as any)).toBe('$0,00');
    expect(formatearMoneda('texto' as any)).toBe('$0,00');
  });
});
