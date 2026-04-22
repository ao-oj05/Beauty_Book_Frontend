import Link from "next/link";
import { Star, LogOut, Sparkles, Calendar, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header Panel */}
      <header className="bg-white px-8 py-4 shadow-sm flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
            <Star size={20} fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">BeautyBook</h1>
            <span className="text-sm text-gray-500">Panel de Cliente</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500">Bienvenido/a</p>
            <p className="text-sm font-medium text-gray-900">Laura Martínez</p>
          </div>
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium">
            <LogOut size={16} />
            Salir
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Ver Servicios Card */}
          <Link href="/dashboard/servicios" className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-primary/20 group">
            <div className="w-12 h-12 bg-accent text-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Ver Servicios</h2>
            <p className="text-sm text-gray-500">Explora todos nuestros tratamientos</p>
          </Link>

          {/* Agendar Cita Card */}
          <Link href="/dashboard/agendar" className="bg-primary hover:bg-primary-dark transition-colors p-6 rounded-3xl shadow-md cursor-pointer group text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar size={24} />
            </div>
            <h2 className="text-xl font-bold mb-1">Agendar Cita</h2>
            <p className="text-sm text-white/80">Reserva tu próximo servicio</p>
          </Link>

          {/* Citas Activas Card */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-transparent">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Citas Activas</h2>
            <p className="text-4xl font-light text-purple-600 mt-2">0</p>
          </div>

        </div>

        {/* Mis Citas Section */}
        <div className="bg-white rounded-3xl shadow-sm p-6 min-h-[300px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Mis Citas</h2>
            
            <span className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-full shadow-sm">
              Próximas (0)
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center mb-4">
              <Calendar size={32} />
            </div>
            <p className="text-gray-500 mb-6">No tienes citas próximas</p>
            <Link href="/dashboard/agendar" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-colors">
              Agendar una cita
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
