"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Scissors, CheckCircle, Download } from "lucide-react";

export default function AgendarCitaPage() {
  const [paso, setPaso] = useState<"formulario" | "ticket">("formulario");
  
  // State for form
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaso("ticket");
  };

  const handleDescargarTicket = () => {
    // In a real app, this would generate a PDF or similar
    window.print();
  };

  if (paso === "ticket") {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-md p-8 relative overflow-hidden text-center border-t-8 border-primary print:shadow-none print:border-none print:w-full print:max-w-none">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h2>
          <p className="text-gray-500 mb-8">
            En espera de que lo acepte el equipo del salón.
          </p>

          <div className="bg-surface rounded-2xl p-6 text-left mb-8 space-y-4 border border-dashed border-gray-300">
            <h3 className="font-bold text-gray-900 text-center border-b border-gray-200 pb-4 mb-4">Ticket de Cita</h3>
            <div className="flex justify-between">
              <span className="text-gray-500">Servicio:</span>
              <span className="font-medium text-gray-900">{servicio || "No especificado"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fecha:</span>
              <span className="font-medium text-gray-900">{fecha || "No especificada"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Hora:</span>
              <span className="font-medium text-gray-900">{hora || "No especificada"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Estado:</span>
              <span className="font-medium text-warning">Pendiente de confirmación</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 print:hidden">
            <button 
              onClick={handleDescargarTicket}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
            >
              <Download size={18} />
              Descargar Ticket
            </button>
            <Link 
              href="/dashboard"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition-colors block"
            >
              Ir a Mis Citas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-12">
      <header className="bg-white px-8 py-4 shadow-sm flex items-center gap-4 sticky top-0 z-50">
        <Link href="/dashboard" className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <ArrowLeft size={16} />
          Volver
        </Link>
        <h1 className="text-xl font-bold text-gray-900 ml-2">Agendar Cita</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-[2rem] shadow-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-12">
            
            {/* Formulario Principal */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalles de la Cita</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1. Selecciona el Servicio
                </label>
                <div className="relative">
                  <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white appearance-none"
                    value={servicio}
                    onChange={(e) => setServicio(e.target.value)}
                    required
                  >
                    <option value="" disabled>Elige un servicio...</option>
                    <option value="Uñas de Gel">Uñas de Gel</option>
                    <option value="Extensión de Pestañas">Extensión de Pestañas</option>
                    <option value="Corte y Estilo">Corte y Estilo</option>
                    <option value="Maquillaje Profesional">Maquillaje Profesional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2. Fecha y Hora
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="time" 
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white"
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Selecciona la fecha y la hora en la que deseas tu cita.</p>
              </div>
            </div>

            {/* Resumen Sidebar */}
            <div className="w-full md:w-80 bg-surface rounded-2xl p-6 h-fit border border-gray-100 flex flex-col">
              <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-4">Resumen de tu Cita</h3>
              
              <div className="space-y-4 mb-8 flex-1">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Servicio</p>
                  <p className="font-medium text-gray-900">{servicio || "Pendiente"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fecha</p>
                  <p className="font-medium text-gray-900">{fecha || "Pendiente"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Hora</p>
                  <p className="font-medium text-gray-900">{hora || "Pendiente"}</p>
                </div>
              </div>

              <div className="mt-auto">
                <button 
                  type="submit" 
                  disabled={!servicio || !fecha || !hora}
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-colors shadow-sm"
                >
                  Confirmar Cita
                </button>
                <p className="text-xs text-center text-gray-500 mt-3">
                  Al confirmar, el salón revisará tu solicitud.
                </p>
              </div>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
