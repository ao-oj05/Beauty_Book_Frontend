import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex flex-col justify-center w-1/2 bg-[#ff4d6d] p-16 text-white">
        <div className="max-w-md mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <span className="text-3xl font-medium">BeautyBook</span>
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Tu salón de belleza <br />
            <span className="italic font-serif font-light">en línea</span>
          </h1>

          <p className="text-lg text-white/90">
            Agenda citas, gestiona servicios y haz crecer tu negocio con nuestra plataforma integral.
          </p>

          <div className="space-y-6 pt-4">
            <div className="flex gap-4">
              <div className="w-6 h-6 mt-1 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Reservas en tiempo real</h3>
                <p className="text-white/80 text-sm">Sistema de citas inteligente</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 mt-1 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Gestión de especialistas</h3>
                <p className="text-white/80 text-sm">Control total de servicios y horarios</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 mt-1 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Comprobantes digitales</h3>
                <p className="text-white/80 text-sm">Tickets automáticos por cada cita</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold text-gray-900">Iniciar Sesión</h2>
            <p className="text-gray-500">¡Nos alegra verte de nuevo!</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="border-2 border-[#ff4d6d] rounded-xl p-4 flex flex-col items-center gap-2 bg-rose-50 text-[#ff4d6d]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium text-gray-900">Cliente</span>
            </button>
            <button className="border border-gray-200 hover:border-gray-300 rounded-xl p-4 flex flex-col items-center gap-2 text-gray-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
              </svg>
              <span className="font-medium">Especialista</span>
            </button>
          </div>

          <form className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff4d6d]/20 focus:border-[#ff4d6d] transition-all"
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Contraseña</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff4d6d]/20 focus:border-[#ff4d6d] transition-all"
                placeholder="••••••••"
              />
            </div>

            <Link href="/dashboard/client" className="block w-full text-center bg-[#ff4d6d] hover:bg-[#c9184a] text-white py-3.5 rounded-xl font-medium transition-colors">
              Iniciar Sesión
            </Link>
          </form>

          <div className="text-center pt-4">
            <Link href="/register" className="text-[#ff4d6d] hover:text-[#c9184a] font-medium transition-colors">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
