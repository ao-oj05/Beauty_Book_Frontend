export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-[var(--surface)]">
      <main className="flex flex-col items-center justify-center gap-8 px-6 py-20 text-center">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--primary)] shadow-lg">
            <span className="text-4xl">💅</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Beauty Book
          </h1>
          <p className="max-w-md text-lg text-[var(--text-secondary)]">
            Sistema de gestión de citas para salones de belleza.
            Próximamente disponible.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)] border border-[var(--border)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)] animate-pulse" />
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            En desarrollo
          </span>
        </div>

        {/* Feature Preview */}
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3 max-w-2xl w-full">
          {[
            { icon: "📅", title: "Citas", desc: "Agenda y calendario" },
            { icon: "💇", title: "Servicios", desc: "Catálogo completo" },
            { icon: "👥", title: "Clientes", desc: "Directorio y seguimiento" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-2 p-6 rounded-xl bg-white border border-[var(--border)] shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="font-semibold text-[var(--text-primary)]">{feature.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
