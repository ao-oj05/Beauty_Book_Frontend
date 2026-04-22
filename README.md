# 💅 Beauty Book — Frontend

> Sistema profesional de gestión de citas para salones de belleza.

## 📋 Descripción

**Beauty Book** es una aplicación web para la gestión integral de un salón de belleza. Permite administrar citas, servicios, estilistas, clientes y reportes de manera eficiente y profesional.

### Funcionalidades principales
- 📅 Gestión de citas con calendario interactivo
- 💇 Catálogo de servicios por categorías
- 👩‍🎨 Gestión de estilistas y horarios
- 👥 Directorio de clientes
- 📊 Reportes y estadísticas
- 🔐 Autenticación y roles de usuario

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 16.2.4 | Framework React con SSR |
| React | 19.2.4 | Librería de UI |
| TypeScript | 5.x | Tipado estático |
| TailwindCSS | 4.x | Framework de CSS utilitario |

## 🚀 Inicio Rápido

### Requisitos previos
- Node.js 18+ 
- npm 9+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/<tu-usuario>/beauty-book-front.git

# Entrar al directorio
cd beauty-book-front

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📁 Estructura del Proyecto

```
beauty-book-front/
├── public/              # Archivos estáticos (imágenes, íconos)
├── src/
│   └── app/             # App Router de Next.js
│       ├── globals.css   # Estilos globales
│       ├── layout.tsx    # Layout principal
│       └── page.tsx      # Página principal
├── .gitignore
├── next.config.ts        # Configuración de Next.js
├── package.json
├── postcss.config.mjs    # Configuración de PostCSS
└── tsconfig.json         # Configuración de TypeScript
```

## 📦 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Dev | `npm run dev` | Servidor de desarrollo |
| Build | `npm run build` | Compilación de producción |
| Start | `npm run start` | Servidor de producción |
| Lint | `npm run lint` | Análisis de código |

## 🏗️ Arquitectura del Proyecto

Este proyecto es parte de una arquitectura orientada a servicios con 3 repositorios:

| Repositorio | Descripción |
|-------------|-------------|
| `beauty-book-front` | Frontend (este repositorio) |
| `beauty-book-back` | Backend — API REST |
| `beauty-book-infra` | Infraestructura — Docker, BD |

## 👩‍💻 Autora

- **Jacqueline** — Desarrollo completo

## 📄 Licencia

Este proyecto es de uso académico.
