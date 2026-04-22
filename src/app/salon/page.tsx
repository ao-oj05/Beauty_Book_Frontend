"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star, LogOut, Calendar, CheckCircle2, Clock, Sparkles, Plus, Image as ImageIcon, X } from "lucide-react";
import { API_URL } from "@/src/lib/config";

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

interface ServicioSalon {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  duracion: string;
  especialista: string;
  precio: number;
  imagen: string | null;
}

export default function SalonDashboard() {
  const [nombreSalon, setNombreSalon] = useState("Mi Salón");
  const [citas, setCitas] = useState<Cita[]>([]);
  const [servicios, setServicios] = useState<ServicioSalon[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Estados del formulario
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    categoria: "Uñas",
    descripcion: "",
    duracion: "60 minutos",
    especialista: "",
    precio: "",
    imagen: null as string | null
  });

  useEffect(() => {
    // Leer nombre del salón de la sesión
    const sesion = JSON.parse(localStorage.getItem("beautybook_sesion") || "{}");
    if (sesion.nombre) setNombreSalon(sesion.nombre);

    // Cargar citas desde el backend
    fetch(`${API_URL}/appointments`)
      .then(res => res.json())
      .then(data => setCitas(data))
      .catch(err => console.error("Error al cargar citas:", err));

    // Cargar servicios desde el backend
    fetch(`${API_URL}/services`)
      .then(res => res.json())
      .then(data => setServicios(data))
      .catch(err => console.error("Error al cargar servicios:", err));
  }, []);

  const citasPendientes = citas.filter((c) => c.estado === "Pendiente");
  const citasConfirmadas = citas.filter((c) => c.estado === "Confirmada");

  const confirmarCita = async (id: string) => {
    try {
      await fetch(`${API_URL}/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Confirmada" }),
      });
      setCitas(citas.map((c) => (c.id === id ? { ...c, estado: "Confirmada" } : c)));
    } catch (err) {
      console.error("Error al confirmar cita", err);
    }
  };

  const rechazarCita = async (id: string) => {
    try {
      await fetch(`${API_URL}/appointments/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Rechazada" }),
      });
      // Para simular el borrado o cambio de vista
      setCitas(citas.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error al rechazar cita", err);
    }
  };

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr + "T00:00:00");
    const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${dias[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  };

  const handleSalir = () => {
    localStorage.removeItem("beautybook_sesion");
  };

  const handleImagenSubida = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoServicio({ ...nuevoServicio, imagen: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarServicio = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      nombre: nuevoServicio.nombre,
      categoria: nuevoServicio.categoria,
      descripcion: nuevoServicio.descripcion,
      duracion: nuevoServicio.duracion,
      especialista: nuevoServicio.especialista,
      precio: parseFloat(nuevoServicio.precio),
      imagen: nuevoServicio.imagen
    };

    try {
      const response = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error("Error al guardar el servicio");
      }
      const servicioAgregado = await response.json();
      setServicios([...servicios, servicioAgregado]);
      
      // Limpiar form
      setNuevoServicio({
        nombre: "",
        categoria: "Uñas",
        descripcion: "",
        duracion: "60 minutos",
        especialista: "",
        precio: "",
        imagen: null
      });
      setMostrarModal(false);
    } catch (err) {
      console.error("Error al guardar servicio", err);
    }
  };

  return (
    <div className="min-h-screen bg-surface relative">
      {/* Header */}
      <header className="bg-white px-8 py-4 shadow-sm flex items-center justify-between sticky top-0 z-40">
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

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Mis Servicios */}
        <section className="bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Mis Servicios</h2>
              <p className="text-sm text-gray-500 mt-1">Gestiona los servicios que ofreces</p>
            </div>
            <button 
              onClick={() => setMostrarModal(true)}
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus size={18} />
              Agregar servicio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((servicio) => (
              <div key={servicio.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200 relative flex items-center justify-center">
                  {servicio.imagen ? (
                    <img src={servicio.imagen} alt={servicio.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={40} className="text-gray-400 opacity-50" />
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                    {servicio.categoria}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg">{servicio.nombre}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-primary font-bold">${servicio.precio.toFixed(2)} MXN</span>
                    <span className="text-sm text-gray-500">{servicio.duracion}</span>
                  </div>
                </div>
              </div>
            ))}
            {servicios.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aún no has agregado ningún servicio.
              </div>
            )}
          </div>
        </section>

        {/* Stats y Citas (lo existente) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <section className="bg-white rounded-3xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Citas Pendientes</h2>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                {citasPendientes.length}
              </span>
            </div>

            {citasPendientes.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-sm text-gray-500">No hay citas por confirmar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {citasPendientes.map((cita) => (
                  <div key={cita.id} className="border border-gray-100 rounded-xl p-4 hover:border-yellow-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{cita.servicio}</h3>
                      <p className="text-primary font-semibold text-sm">${cita.precio.toFixed(2)}</p>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      <p>{formatearFecha(cita.fecha)} - {cita.hora}</p>
                      <p>Especialista: {cita.especialista}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => confirmarCita(cita.id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1.5 rounded-lg text-sm font-medium transition-colors">
                        Confirmar
                      </button>
                      <button onClick={() => rechazarCita(cita.id)} className="flex-1 bg-white border border-red-200 text-red-500 hover:bg-red-50 py-1.5 rounded-lg text-sm font-medium transition-colors">
                        Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white rounded-3xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Citas Confirmadas</h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                {citasConfirmadas.length}
              </span>
            </div>

            {citasConfirmadas.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Calendar size={24} />
                </div>
                <p className="text-sm text-gray-500">No hay citas confirmadas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {citasConfirmadas.map((cita) => (
                  <div key={cita.id} className="border border-green-100 bg-green-50/30 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900">{cita.servicio}</h3>
                      <p className="text-primary font-semibold text-sm">${cita.precio.toFixed(2)}</p>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{formatearFecha(cita.fecha)} - {cita.hora}</p>
                      <p>Especialista: {cita.especialista}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Modal Nuevo Servicio */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Agregar Nuevo Servicio</h3>
              <button onClick={() => setMostrarModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="form-servicio" onSubmit={guardarServicio} className="space-y-4">
                
                {/* Foto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Foto del servicio</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:bg-gray-50 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImagenSubida} 
                      className="hidden" 
                      id="upload-foto"
                    />
                    <label htmlFor="upload-foto" className="cursor-pointer flex flex-col items-center">
                      {nuevoServicio.imagen ? (
                        <div className="w-full h-32 relative rounded-xl overflow-hidden">
                          <img src={nuevoServicio.imagen} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <>
                          <ImageIcon size={32} className="text-gray-400 mb-2" />
                          <span className="text-sm text-primary font-medium">Haz clic para subir una imagen</span>
                          <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input required type="text" value={nuevoServicio.nombre} onChange={e => setNuevoServicio({...nuevoServicio, nombre: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej. Corte de Pelo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select value={nuevoServicio.categoria} onChange={e => setNuevoServicio({...nuevoServicio, categoria: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="Uñas">Uñas</option>
                      <option value="Pestañas">Pestañas</option>
                      <option value="Cabello">Cabello</option>
                      <option value="Maquillaje">Maquillaje</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea required value={nuevoServicio.descripcion} onChange={e => setNuevoServicio({...nuevoServicio, descripcion: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" rows={2} placeholder="Descripción del tratamiento..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio (MXN)</label>
                    <input required type="number" step="0.01" value={nuevoServicio.precio} onChange={e => setNuevoServicio({...nuevoServicio, precio: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                    <input required type="text" value={nuevoServicio.duracion} onChange={e => setNuevoServicio({...nuevoServicio, duracion: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ej. 60 minutos" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especialista</label>
                  <input required type="text" value={nuevoServicio.especialista} onChange={e => setNuevoServicio({...nuevoServicio, especialista: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Nombre de quien lo realiza" />
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button type="button" onClick={() => setMostrarModal(false)} className="px-5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors">
                Cancelar
              </button>
              <button type="submit" form="form-servicio" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm">
                Guardar Servicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
