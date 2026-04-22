import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffafa] font-sans">
      {/* Navigation Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-rose-100 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#ff4d6d] flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span className="text-xl font-medium text-gray-800">BeautyBook</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link href="/" className="text-[#ff4d6d] border-b-2 border-[#ff4d6d] pb-1">Inicio</Link>
          <Link href="#nosotros" className="hover:text-[#ff4d6d] transition-colors">Nosotros</Link>
          <Link href="#servicios" className="hover:text-[#ff4d6d] transition-colors">Servicios</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/register" className="text-gray-600 font-medium hover:text-[#ff4d6d] transition-colors">
            Registro
          </Link>
          <Link href="/login" className="bg-[#ff4d6d] hover:bg-[#c9184a] text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-md shadow-rose-200">
            Iniciar sesión
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text */}
        <div className="space-y-8 relative z-10">
          <div className="absolute -z-10 -left-20 top-20 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50"></div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Belleza & Estilo <br />
            <span className="italic font-serif font-light">Studio Deluxe</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Es más que un salón de belleza, es un lugar donde tus sueños de estilo se hacen realidad.
          </p>
          
          <p className="text-lg italic text-gray-500">
            ¡Ven y déjanos cuidar de ti!
          </p>
          
          <Link href="/dashboard/client" className="inline-block bg-[#ff4d6d] hover:bg-[#c9184a] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-rose-300 transition-transform hover:-translate-y-1">
            Agenda ahora
          </Link>
        </div>

        {/* Right Column - Images Composition */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          {/* Main Large Image */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4/5 h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800" 
              alt="Modelo de salón de belleza" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Circle Image 1 - Top Right */}
          <div className="absolute right-[-20px] top-12 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1512496015851-a1fb8cbd06dd?auto=format&fit=crop&q=80&w=400" 
              alt="Uñas decoradas" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Circle Image 2 - Bottom Left */}
          <div className="absolute left-0 bottom-24 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400" 
              alt="Manicure detallado" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Dark decorative bar */}
          <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-12 h-64 bg-gray-900 rounded-l-2xl"></div>
        </div>
      </main>

      {/* About Section snippet just to fill the page like the mockup */}
      <section id="nosotros" className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Sobre <span className="text-[#ff4d6d] italic font-serif">Nosotros</span>
        </h2>
      </section>
    </div>
  );
}
