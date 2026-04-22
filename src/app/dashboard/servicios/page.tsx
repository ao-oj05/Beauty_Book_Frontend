"use client";

import Link from "next/link";
import { useState } from "react";
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

const SERVICIOS: Servicio[] = [
  {
    id: 1,
    nombre: "Uñas de Gel",
    categoria: "Uñas",
    descripcion: "Aplicación de gel con diseño personalizado para lucir unas manos perfectas.",
    duracion: "90 minutos",
    especialista: "María García",
    precio: 350,
    imagen: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    nombre: "Manicure Clásico",
    categoria: "Uñas",
    descripcion: "Limado, cutícula y esmaltado básico con acabado profesional.",
    duracion: "45 minutos",
    especialista: "María García",
    precio: 250,
    imagen: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    nombre: "Extensión de Pestañas",
    categoria: "Pestañas",
    descripcion: "Pestañas pelo por pelo, efecto natural y duradero para realzar tu mirada.",
    duracion: "120 minutos",
    especialista: "Ana López",
    precio: 450,
    imagen: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    nombre: "Lifting de Pestañas",
    categoria: "Pestañas",
    descripcion: "Curvado natural y laminado para unas pestañas espectaculares sin extensiones.",
    duracion: "60 minutos",
    especialista: "Ana López",
    precio: 300,
    imagen: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    nombre: "Corte y Estilo",
    categoria: "Cabello",
    descripcion: "Corte a la moda y peinado con productos de alta calidad.",
    duracion: "60 minutos",
    especialista: "Laura Sánchez",
    precio: 280,
    imagen: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 6,
    nombre: "Tinte y Color",
    categoria: "Cabello",
    descripcion: "Coloración profesional, mechas, balayage y técnicas de tendencia.",
    duracion: "120 minutos",
    especialista: "Laura Sánchez",
    precio: 550,
    imagen: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 7,
    nombre: "Maquillaje Profesional",
    categoria: "Maquillaje",
    descripcion: "Maquillaje para eventos, adaptado a tus gustos y tipo de piel.",
    duracion: "60 minutos",
    especialista: "Carmen Ruiz",
    precio: 400,
    imagen: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 8,
    nombre: "Maquillaje de Novia",
    categoria: "Maquillaje",
    descripcion: "Look especial para tu gran día, incluye prueba previa y retoque.",
    duracion: "90 minutos",
    especialista: "Carmen Ruiz",
    precio: 800,
    imagen: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=400&auto=format&fit=crop",
  },
];

const CATEGORIAS = ["Todas", "Uñas", "Pestañas", "Cabello", "Maquillaje"];

export default function ServiciosCatalogPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  const serviciosFiltrados =
    categoriaActiva === "Todas"
      ? SERVICIOS
      : SERVICIOS.filter((s) => s.categoria === categoriaActiva);

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
