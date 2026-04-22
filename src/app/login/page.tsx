"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Correo o contraseña incorrectos");
      }

      const data = await response.json();
      
      // Guardar sesión activa
      localStorage.setItem("beautybook_sesion", JSON.stringify(data.user));
      localStorage.setItem("beautybook_token", data.access_token);

      // Redirigir según el tipo de cuenta
      if (data.user.tipo === "salon") {
        router.push("/salon");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
            <Star size={24} fill="white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido de nuevo</h1>
          <p className="text-gray-500 mt-2">Inicia sesión en tu cuenta de BeautyBook</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <a href="#" className="text-sm text-primary hover:text-primary-dark">¿Olvidaste tu contraseña?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
