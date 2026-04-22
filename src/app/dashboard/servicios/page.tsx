"use client";

import Link from "next/link";
import { ArrowLeft, Star, Clock, User, ImageIcon } from "lucide-react";
import { useState } from "react";

const serviciosData = [
  {
    id: 1,
    categoria: "Uñas",
    titulo: "Uñas de Gel",
    descripcion: "Aplicación de gel con diseño personalizado para lucir unas manos perfectas.",
    duracion: "90 minutos",
    especialista: "Especialista profesional",
    imagen: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    categoria: "Pestañas",
    titulo: "Extensión de Pestañas",
    descripcion: "Pestañas pelo por pelo, efecto natural y duradero para realzar tu mirada.",
    duracion: "120 minutos",
    especialista: "Especialista profesional",
    imagen: null
  },
  {
    id: 3,
    categoria: "Cabello",
    titulo: "Corte y Estilo",
    descripcion: "Corte a la moda y peinado con productos de alta calidad.",
    duracion: "60 minutos",
    especialista: "Especialista profesional",
    imagen: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    categoria: "Maquillaje",
    titulo: "Maquillaje Profesional",
    descripcion: "Maquillaje para eventos, adaptado a tus gustos y tipo de piel.",
    duracion: "60 minutos",
    especialista: "Especialista profesional",
    imagen: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop"
  }
];

export default function ServiciosCatalogPage() {
  const [filtro, setFiltro] = useState("Todas");

  const categorias = ["Todas", "Uñas", "Pestañas", "Cabello", "Maquillaje"];

  const serviciosFiltrados = serviciosData.filter(servicio => 
    filtro === "Todas" || servicio.categoria === filtro
  );

  return (
    <div className="min-h-screen bg-surface pb-12">
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
          {/* Decorative shapes */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute left-1/2 bottom-0 w-48 h-48 bg-black/5 rounded-full blur-2xl translate-y-1/2"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltro(categoria)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
                filtro === categoria 
                  ? "bg-primary text-white border-transparent" 
                  : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-6">
          {serviciosFiltrados.length} {serviciosFiltrados.length === 1 ? "servicio disponible" : "servicios disponibles"}
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviciosFiltrados.map((servicio) => (
            <div key={servicio.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col group">
              <div className="h-48 relative bg-gray-100 flex items-center justify-center text-gray-400">
                {servicio.imagen ? (
                  <img src={servicio.imagen} alt={servicio.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <ImageIcon size={48} className="opacity-50" />
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 shadow-sm">
                  {servicio.categoria}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{servicio.titulo}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">{servicio.descripcion}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Clock size={16} />
                    <span>{servicio.duracion}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} />
                    <span>{servicio.especialista}</span>
                  </div>
                </div>
                
                <Link href={`/dashboard/agendar?servicio=${servicio.categoria}`} className="w-full text-center bg-accent text-primary hover:bg-primary hover:text-white py-3 rounded-xl font-medium transition-colors block">
                  Agendar
                </Link>
              </div>
            </div>
          ))}
          
          {serviciosFiltrados.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No hay servicios disponibles en esta categoría.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
