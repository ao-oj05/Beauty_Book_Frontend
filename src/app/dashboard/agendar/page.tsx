"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  Download,
  Sparkles,
} from "lucide-react";

const SERVICIOS_DISPONIBLES = [
  { nombre: "Uñas de Gel", categoria: "Uñas", duracion: "90 min", especialista: "María García", precio: 350 },
  { nombre: "Manicure Clásico", categoria: "Uñas", duracion: "45 min", especialista: "María García", precio: 250 },
  { nombre: "Extensión de Pestañas", categoria: "Pestañas", duracion: "120 min", especialista: "Ana López", precio: 450 },
  { nombre: "Lifting de Pestañas", categoria: "Pestañas", duracion: "60 min", especialista: "Ana López", precio: 300 },
  { nombre: "Corte y Estilo", categoria: "Cabello", duracion: "60 min", especialista: "Laura Sánchez", precio: 280 },
  { nombre: "Tinte y Color", categoria: "Cabello", duracion: "120 min", especialista: "Laura Sánchez", precio: 550 },
  { nombre: "Maquillaje Profesional", categoria: "Maquillaje", duracion: "60 min", especialista: "Carmen Ruiz", precio: 400 },
  { nombre: "Maquillaje de Novia", categoria: "Maquillaje", duracion: "90 min", especialista: "Carmen Ruiz", precio: 800 },
];

const HORAS_DISPONIBLES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
];

// Generar próximos 14 días
function generarDias(): { fecha: string; dia: string; numero: number; mes: string }[] {
  const dias: { fecha: string; dia: string; numero: number; mes: string }[] = [];
  const hoy = new Date();
  const nombresDias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const nombresMeses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  for (let i = 1; i <= 14; i++) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + i);
    // Saltar domingos
    if (d.getDay() === 0) continue;
    dias.push({
      fecha: d.toISOString().split("T")[0],
      dia: nombresDias[d.getDay()],
      numero: d.getDate(),
      mes: nombresMeses[d.getMonth()],
    });
  }
  return dias;
}

interface CitaConfirmada {
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

export default function AgendarCitaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><p className="text-gray-400">Cargando...</p></div>}>
      <AgendarCitaContent />
    </Suspense>
  );
}

function AgendarCitaContent() {
  const searchParams = useSearchParams();
  const servicioPreseleccionado = searchParams.get("servicio") || "";

  const [paso, setPaso] = useState<"seleccion" | "resumen" | "ticket">("seleccion");
  const [servicioSeleccionado, setServicioSeleccionado] = useState(servicioPreseleccionado);
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [citaConfirmada, setCitaConfirmada] = useState<CitaConfirmada | null>(null);

  const diasDisponibles = generarDias();

  const servicioInfo = SERVICIOS_DISPONIBLES.find((s) => s.nombre === servicioSeleccionado);

  const puedeConfirmar = servicioSeleccionado && fechaSeleccionada && horaSeleccionada;

  const handleVerResumen = () => {
    if (puedeConfirmar) setPaso("resumen");
  };

  const handleConfirmar = () => {
    const nuevaCita: CitaConfirmada = {
      id: `BB-${Date.now().toString().slice(-6)}`,
      servicio: servicioSeleccionado,
      categoria: servicioInfo?.categoria || "",
      fecha: fechaSeleccionada,
      hora: horaSeleccionada,
      estado: "Pendiente",
      especialista: servicioInfo?.especialista || "",
      precio: servicioInfo?.precio || 0,
      duracion: servicioInfo?.duracion || "",
    };
    // Guardar en localStorage para que el dashboard la muestre
    const citasGuardadas = JSON.parse(localStorage.getItem("beautybook_citas") || "[]");
    citasGuardadas.push(nuevaCita);
    localStorage.setItem("beautybook_citas", JSON.stringify(citasGuardadas));
    setCitaConfirmada(nuevaCita);
    setPaso("ticket");
  };

  const handleDescargarTicket = () => {
    if (!citaConfirmada) return;

    const diaInfo = diasDisponibles.find((d) => d.fecha === citaConfirmada.fecha);
    const fechaTexto = diaInfo
      ? `${diaInfo.dia} ${diaInfo.numero} de ${diaInfo.mes}`
      : citaConfirmada.fecha;

    const contenido = `
╔══════════════════════════════════════╗
║         BEAUTYBOOK - TICKET          ║
╠══════════════════════════════════════╣
║                                      ║
║  Folio: ${citaConfirmada.id.padEnd(28)}║
║                                      ║
║  Servicio: ${citaConfirmada.servicio.padEnd(25)}║
║  Categoría: ${citaConfirmada.categoria.padEnd(24)}║
║  Fecha: ${fechaTexto.padEnd(28)}║
║  Hora: ${citaConfirmada.hora.padEnd(29)}║
║  Duración: ${(servicioInfo?.duracion || "").padEnd(25)}║
║                                      ║
║  Estado: ${citaConfirmada.estado.padEnd(27)}║
║                                      ║
║  ¡Gracias por tu preferencia!        ║
║  Te notificaremos cuando el salón    ║
║  confirme tu cita.                   ║
║                                      ║
╚══════════════════════════════════════╝
    `.trim();

    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ticket-${citaConfirmada.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white px-8 py-4 shadow-sm flex items-center gap-4 sticky top-0 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver
        </Link>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white ml-2">
          <Star size={14} fill="white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Agendar Cita</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* ===================== PASO 1: SELECCIÓN ===================== */}
        {paso === "seleccion" && (
          <div className="space-y-8">
            {/* Seleccionar Servicio */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Elige tu servicio</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICIOS_DISPONIBLES.map((s) => (
                  <button
                    key={s.nombre}
                    onClick={() => setServicioSeleccionado(s.nombre)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      servicioSeleccionado === s.nombre
                        ? "border-primary bg-accent shadow-sm"
                        : "border-gray-100 hover:border-primary/30 bg-white"
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{s.nombre}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {s.categoria} · {s.duracion}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Seleccionar Fecha y Hora juntos */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Fecha y hora</h2>
              </div>

              {/* Días */}
              <p className="text-sm font-medium text-gray-700 mb-3">Selecciona un día:</p>
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {diasDisponibles.map((d) => (
                  <button
                    key={d.fecha}
                    onClick={() => setFechaSeleccionada(d.fecha)}
                    className={`flex flex-col items-center min-w-[70px] py-3 px-3 rounded-2xl border-2 transition-all ${
                      fechaSeleccionada === d.fecha
                        ? "border-primary bg-primary text-white shadow-sm"
                        : "border-gray-100 hover:border-primary/30 bg-white text-gray-700"
                    }`}
                  >
                    <span className="text-xs font-medium opacity-80">{d.dia}</span>
                    <span className="text-xl font-bold">{d.numero}</span>
                    <span className="text-xs opacity-70">{d.mes}</span>
                  </button>
                ))}
              </div>

              {/* Horas */}
              {fechaSeleccionada && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Selecciona una hora:</p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {HORAS_DISPONIBLES.map((hora) => (
                      <button
                        key={hora}
                        onClick={() => setHoraSeleccionada(hora)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all ${
                          horaSeleccionada === hora
                            ? "border-primary bg-primary text-white shadow-sm"
                            : "border-gray-100 hover:border-primary/30 bg-white text-gray-700"
                        }`}
                      >
                        {hora}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botón Confirmar */}
            <button
              onClick={handleVerResumen}
              disabled={!puedeConfirmar}
              className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all ${
                puedeConfirmar
                  ? "bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Ver resumen de la cita
            </button>
          </div>
        )}

        {/* ===================== PASO 2: RESUMEN ===================== */}
        {paso === "resumen" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Resumen de tu cita
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Servicio</span>
                  <span className="font-semibold text-gray-900">{servicioSeleccionado}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Categoría</span>
                  <span className="font-semibold text-gray-900">{servicioInfo?.categoria}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Fecha</span>
                  <span className="font-semibold text-gray-900">
                    {(() => {
                      const d = diasDisponibles.find((d) => d.fecha === fechaSeleccionada);
                      return d ? `${d.dia} ${d.numero} de ${d.mes}` : fechaSeleccionada;
                    })()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Hora</span>
                  <span className="font-semibold text-gray-900">{horaSeleccionada}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-500">Duración estimada</span>
                  <span className="font-semibold text-gray-900">{servicioInfo?.duracion}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setPaso("seleccion")}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Modificar
                </button>
                <button
                  onClick={handleConfirmar}
                  className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-md transition-all"
                >
                  Confirmar cita
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== PASO 3: TICKET ===================== */}
        {paso === "ticket" && citaConfirmada && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Cita registrada!</h2>
              <p className="text-gray-500 mb-8">
                Tu cita queda en espera de que el salón la confirme. Te notificaremos cuando sea aceptada.
              </p>

              {/* Ticket visual */}
              <div className="bg-surface border-2 border-dashed border-primary/30 rounded-2xl p-6 text-left max-w-sm mx-auto mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-primary" />
                  <span className="font-bold text-gray-900">BeautyBook</span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Folio</span>
                    <span className="font-mono font-bold text-primary">{citaConfirmada.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Servicio</span>
                    <span className="font-medium text-gray-900">{citaConfirmada.servicio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fecha</span>
                    <span className="font-medium text-gray-900">
                      {(() => {
                        const d = diasDisponibles.find((d) => d.fecha === citaConfirmada.fecha);
                        return d ? `${d.dia} ${d.numero} de ${d.mes}` : citaConfirmada.fecha;
                      })()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hora</span>
                    <span className="font-medium text-gray-900">{citaConfirmada.hora}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Estado</span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {citaConfirmada.estado}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <button
                  onClick={handleDescargarTicket}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-accent transition-colors"
                >
                  <Download size={18} />
                  Descargar ticket
                </button>
                <Link
                  href="/dashboard"
                  className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-md transition-all text-center"
                >
                  Ir a mis citas
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
