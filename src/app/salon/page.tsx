"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star, LogOut, Calendar, CheckCircle2, Clock, Sparkles } from "lucide-react";

interface Cita {
  id: string;
  servicio: string;
  categoria: string;
  fecha: string;
  hora: string;
  estado: string;
  especialista: string;
  precio: number;
  duracion: string;
}

export default function SalonDashboard() {
  const [nombreSalon, setNombreSalon] = useState("Mi Salón");
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    // Leer nombre del salón de la sesión
    const sesion = JSON.parse(localStorage.getItem("beautybook_sesion") || "{}");
    if (sesion.nombre) setNombreSalon(sesion.nombre);

    // Leer citas (todas las citas del sistema)
    const citasGuardadas = JSON.parse(localStorage.getItem("beautybook_citas") || "[]");
    setCitas(citasGuardadas);
  }, []);

  const citasPendientes = citas.filter((c) => c.estado === "Pendiente");
  const citasConfirmadas = citas.filter((c) => c.estado === "Confirmada");

  const confirmarCita = (id: string) => {
    const citasActualizadas = citas.map((c) =>
      c.id === id ? { ...c, estado: "Confirmada" } : c
    );
    setCitas(citasActualizadas);
    localStorage.setItem("beautybook_citas", JSON.stringify(citasActualizadas));
  };

  const rechazarCita = (id: string) => {
    const citasActualizadas = citas.filter((c) => c.id !== id);
    setCitas(citasActualizadas);
    localStorage.setItem("beautybook_citas", JSON.stringify(citasActualizadas));
  };

  // Formatear fecha legible
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr + "T00:00:00");
    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${dias[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  };

  const handleSalir = () => {
    localStorage.removeItem("beautybook_sesion");
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white px-8 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
            <Star size={20} fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">BeautyBook</h1>
            <span className="text-sm text-gray-500">Panel del Salón</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500">Salón</p>
            <p className="text-sm font-medium text-gray-900">{nombreSalon}</p>
          </div>
          <Link
            href="/"
            onClick={handleSalir}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium"
          >
            <LogOut size={16} />
            Salir
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Pendientes</h2>
            <p className="text-4xl font-light text-yellow-600 mt-2">{citasPendientes.length}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Confirmadas</h2>
            <p className="text-4xl font-light text-green-600 mt-2">{citasConfirmadas.length}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Calendar size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Total Citas</h2>
            <p className="text-4xl font-light text-purple-600 mt-2">{citas.length}</p>
          </div>
        </div>

        {/* Citas Pendientes */}
        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Citas Pendientes</h2>
            <span className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              {citasPendientes.length} por confirmar
            </span>
          </div>

          {citasPendientes.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-gray-500">No hay citas pendientes por confirmar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {citasPendientes.map((cita) => (
                <div
                  key={cita.id}
                  className="border border-gray-100 rounded-2xl p-5 hover:border-yellow-200 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{cita.servicio}</h3>
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded-full text-xs font-semibold">
                          Pendiente
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={14} className="text-gray-400" />
                          <span>{formatearFecha(cita.fecha)} a las {cita.hora}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Sparkles size={14} className="text-gray-400" />
                          <span>Especialista: {cita.especialista}</span>
                        </div>
                      </div>
                      <p className="text-primary font-semibold mt-2">${cita.precio.toFixed(2)} MXN</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmarCita(cita.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => rechazarCita(cita.id)}
                        className="bg-white border border-red-200 text-red-500 hover:bg-red-50 px-5 py-2 rounded-xl text-sm font-medium transition-colors"
                      >
                        Rechazar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Citas Confirmadas */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Citas Confirmadas</h2>
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              {citasConfirmadas.length} confirmadas
            </span>
          </div>

          {citasConfirmadas.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} />
              </div>
              <p className="text-gray-500">Aún no hay citas confirmadas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {citasConfirmadas.map((cita) => (
                <div
                  key={cita.id}
                  className="border border-green-100 bg-green-50/30 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{cita.servicio}</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs font-semibold">
                      Confirmada
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} className="text-gray-400" />
                      <span>{formatearFecha(cita.fecha)} a las {cita.hora}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles size={14} className="text-gray-400" />
                      <span>Especialista: {cita.especialista}</span>
                    </div>
                  </div>
                  <p className="text-primary font-semibold mt-2">${cita.precio.toFixed(2)} MXN</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
