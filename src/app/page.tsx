import Link from "next/link";
import { Star, Scissors, Sparkles, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffafd]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
            <Star size={20} fill="white" />
          </div>
          <span className="text-xl font-medium text-gray-800">BeautyBook</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-primary border-b-2 border-primary pb-1 font-medium">Inicio</Link>
          <Link href="#nosotros" className="text-gray-500 hover:text-primary transition-colors">Nosotros</Link>
          <Link href="#servicios" className="text-gray-500 hover:text-primary transition-colors">Servicios</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/register" className="text-gray-600 font-medium hover:text-primary transition-colors">
            Registro
          </Link>
          <Link href="/login" className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium transition-colors shadow-md">
            Iniciar sesión
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-accent-dark/40 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex-1 space-y-6 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Belleza & Estilo<br/>
            <span className="italic font-serif font-medium text-gray-800">Studio Deluxe</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg">
            Es más que un salón de belleza, es un lugar donde tus sueños de estilo se hacen realidad.
          </p>
          <p className="text-lg italic text-gray-500 pb-4">
            ¡Ven y déjanos cuidar de ti!
          </p>
          <Link href="/dashboard" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Agenda ahora
          </Link>
        </div>

        <div className="flex-1 relative">
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            {/* Main Image Placeholder */}
            <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Imagen Principal (Cabello)</span>
              {/* In reality this would be an image, for now just a placeholder container matching shape */}
              <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop" alt="Peluquería" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Floating Images */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl z-20">
            <img src="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=400&auto=format&fit=crop" alt="Uñas" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl z-20">
            <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&auto=format&fit=crop" alt="Maquillaje" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Sobre <span className="text-primary italic">Nosotros</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Somos un equipo de profesionales apasionados por resaltar tu belleza natural.
          Con años de experiencia y las mejores técnicas del mercado.
        </p>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 bg-[#fffafd] px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Nuestros <span className="text-primary italic">Servicios</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Ofrecemos una amplia gama de servicios de belleza diseñados para realzar tu estilo natural.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-left group">
            <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Scissors size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cabello</h3>
            <p className="text-gray-600 text-sm mb-6">Cortes modernos, peinados y tratamientos capilares para todo tipo de cabello.</p>

          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-left group">
            <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Uñas</h3>
            <p className="text-gray-600 text-sm mb-6">Diseños únicos en uñas, esmaltes de larga duración y tratamientos de cuidado.</p>

          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-left group">
            <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Maquillaje</h3>
            <p className="text-gray-600 text-sm mb-6">Maquillaje para eventos especiales, bodas, sesiones fotográficas y más.</p>

          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow text-left group">
            <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Pestañas</h3>
            <p className="text-gray-600 text-sm mb-6">Extensiones de pestañas pelo a pelo, lifting y laminado para una mirada perfecta.</p>

          </div>
        </div>
      </section>
    </div>
  );
}
