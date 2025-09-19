// src/utils/helpers.ts

// Formatea una fecha a DD/MM/YYYY
export const formatearFecha = (fecha: Date): string => {
  if (!fecha || !(fecha instanceof Date) || isNaN(fecha.getTime())) {
    return 'Fecha inválida';
  }

  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
};

// Valida si un email tiene formato correcto
export const validarEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

// Calcula la edad basada en la fecha de nacimiento
export const calcularEdad = (fechaNacimiento: Date): number => {
  if (!fechaNacimiento || !(fechaNacimiento instanceof Date)) {
    return 0;
  }

  const hoy = new Date();
  if (fechaNacimiento > hoy) return 0;

  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();
  const mesNacimiento = fechaNacimiento.getMonth();
  const diaNacimiento = fechaNacimiento.getDate();

  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && diaActual < diaNacimiento)
  ) {
    edad--;
  }

  return edad;
};

// Capitaliza la primera letra de cada palabra
export const capitalizarTexto = (texto: string): string => {
  if (!texto || typeof texto !== 'string') return '';

  return texto
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
};

// Genera un ID único
export const generarId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Formatea un número como moneda argentina sin espacio extra
export const formatearMoneda = (monto: number): string => {
  if (typeof monto !== 'number' || isNaN(monto)) return '$0,00';

  const formatted = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(monto);

  // Elimina cualquier espacio entre el $ y el número
  return formatted.replace(/\$\s?/, '$');
};
