"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Star, Clock, User } from "lucide-react";

interface Servicio {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  duracion: string;
  especialista: string;
  precio: number;
  imagen: string | null;
}

const CATEGORIAS = ["Todas", "Uñas", "Pestañas", "Cabello", "Maquillaje"];

export default function ServiciosCatalogPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch("http://localhost:3001/services");
        const data = await response.json();
        setServicios(data);
      } catch (error) {
        console.error("Error cargando servicios:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchServicios();
  }, []);

  const serviciosFiltrados =
    categoriaActiva === "Todas"
      ? servicios
      : servicios.filter((s) => s.categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-surface">
      {/* Top Header */}
      <header className="bg-white px-8 py-4 shadow-sm flex items-center gap-4 sticky top-0 z-50">
        <Link href="/dashboard" className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <ArrowLeft size={16} />
          Volver
        </Link>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white ml-2">
          <Star size={14} fill="white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Catálogo de Servicios</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-primary rounded-[2rem] p-8 md:p-12 mb-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Descubre Nuestros <span className="italic">Servicios</span></h2>
            <p className="max-w-2xl text-white/90 text-lg">
              Explora nuestra selección de tratamientos de belleza profesionales. Cada servicio está diseñado para realzar tu belleza natural.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute left-1/2 bottom-0 w-48 h-48 bg-black/5 rounded-full blur-2xl translate-y-1/2"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                categoriaActiva === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-6">{serviciosFiltrados.length} servicios disponibles</p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviciosFiltrados.map((servicio) => (
            <div
              key={servicio.id}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col group"
            >
              {/* Imagen */}
              <div className="h-52 relative bg-gray-200">
                {servicio.imagen && (
                  <img
                    src={servicio.imagen}
                    alt={servicio.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm">
                  {servicio.categoria}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{servicio.nombre}</h3>
                <p className="text-sm text-gray-500 mb-5">{servicio.descripcion}</p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-primary" />
                    <span>{servicio.duracion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-primary" />
                    <span>{servicio.especialista}</span>
                  </div>
                </div>

                {/* Precio y botón */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${servicio.precio.toFixed(2)}</span>
                    <span className="text-sm text-gray-400 ml-1">MXN</span>
                  </div>
                  <Link
                    href={`/dashboard/agendar?servicio=${encodeURIComponent(servicio.nombre)}&categoria=${encodeURIComponent(servicio.categoria)}`}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
                  >
                    Agendar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
