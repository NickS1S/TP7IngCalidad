// src/pages/index.tsx - Página principal del proyecto
import React, { useState } from 'react';
import Button from '../components/Button';
import {
  formatearFecha,
  validarEmail,
  calcularEdad,
  capitalizarTexto,
  formatearMoneda,
} from '../utils/helpers';

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: Date;
}

const HomePage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
  });
  const [errores, setErrores] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState('');

  const validarFormulario = (): boolean => {
    const nuevosErrores: string[] = [];

    if (!formulario.nombre.trim()) {
      nuevosErrores.push('El nombre es requerido');
    }

    if (!formulario.email.trim()) {
      nuevosErrores.push('El email es requerido');
    } else if (!validarEmail(formulario.email)) {
      nuevosErrores.push('El email no tiene un formato válido');
    }

    if (!formulario.fechaNacimiento) {
      nuevosErrores.push('La fecha de nacimiento es requerida');
    } else {
      const fecha = new Date(formulario.fechaNacimiento);
      const edad = calcularEdad(fecha);
      if (edad < 13) {
        nuevosErrores.push('Debe ser mayor de 13 años');
      }
    }

    setErrores(nuevosErrores);
    return nuevosErrores.length === 0;
  };

  const agregarUsuario = (): void => {
    if (!validarFormulario()) {
      return;
    }

    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre: capitalizarTexto(formulario.nombre.trim()),
      email: formulario.email.trim(),
      fechaNacimiento: new Date(formulario.fechaNacimiento),
    };

    setUsuarios(prev => [...prev, nuevoUsuario]);
    setFormulario({ nombre: '', email: '', fechaNacimiento: '' });
    setMensaje('Usuario agregado exitosamente');
    setErrores([]);

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setMensaje(''), 3000);
  };

  const eliminarUsuario = (id: string): void => {
    setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
    setMensaje('Usuario eliminado exitosamente');
    setTimeout(() => setMensaje(''), 3000);
  };

  const limpiarFormulario = (): void => {
    setFormulario({ nombre: '', email: '', fechaNacimiento: '' });
    setErrores([]);
    setMensaje('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚀 Pipeline CI/CD - Ingeniería de Software
          </h1>
          <p className="text-lg text-gray-600">
            Proyecto de demostración con pruebas automatizadas
          </p>
        </header>

        {/* Mensajes */}
        {mensaje && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {mensaje}
          </div>
        )}

        {errores.length > 0 && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <ul className="list-disc list-inside">
              {errores.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Agregar Usuario
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre completo
              </label>
              <input
                id="nombre"
                type="text"
                value={formulario.nombre}
                onChange={e =>
                  setFormulario(prev => ({ ...prev, nombre: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu nombre"
                data-testid="input-nombre"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formulario.email}
                onChange={e =>
                  setFormulario(prev => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tu.email@ejemplo.com"
                data-testid="input-email"
              />
            </div>

            <div>
              <label
                htmlFor="fechaNacimiento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha de nacimiento
              </label>
              <input
                id="fechaNacimiento"
                type="date"
                value={formulario.fechaNacimiento}
                onChange={e =>
                  setFormulario(prev => ({
                    ...prev,
                    fechaNacimiento: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-testid="input-fecha"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={agregarUsuario} variant="primary">
              ➕ Agregar Usuario
            </Button>
            <Button onClick={limpiarFormulario} variant="secondary">
              🗑️ Limpiar
            </Button>
          </div>
        </div>

        {/* Lista de usuarios */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Usuarios Registrados ({usuarios.length})
          </h2>

          {usuarios.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hay usuarios registrados. ¡Agrega el primero!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Nombre
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Fecha Nacimiento
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Edad
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(usuario => (
                    <tr
                      key={usuario.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{usuario.nombre}</td>
                      <td className="py-3 px-4">{usuario.email}</td>
                      <td className="py-3 px-4">
                        {formatearFecha(usuario.fechaNacimiento)}
                      </td>
                      <td className="py-3 px-4">
                        {calcularEdad(usuario.fechaNacimiento)} años
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          onClick={() => eliminarUsuario(usuario.id)}
                          variant="danger"
                          className="text-sm"
                        >
                          🗑️ Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Estadísticas */}
        {usuarios.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📊 Estadísticas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {usuarios.length}
                </p>
                <p className="text-sm text-gray-600">Total Usuarios</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {usuarios.length > 0
                    ? Math.round(
                        usuarios.reduce(
                          (acc, u) => acc + calcularEdad(u.fechaNacimiento),
                          0
                        ) / usuarios.length
                      )
                    : 0}
                </p>
                <p className="text-sm text-gray-600">Edad Promedio</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {usuarios.filter(u => validarEmail(u.email)).length}
                </p>
                <p className="text-sm text-gray-600">Emails Válidos</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500">
          <p>🎓 Proyecto de Ingeniería y Calidad de Software - UTN</p>
          <p className="mt-2">
            Pipeline automatizado con GitHub Actions, Jest, ESLint y Prettier
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
