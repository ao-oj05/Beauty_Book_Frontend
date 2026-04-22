"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Scissors } from "lucide-react";
import { API_URL } from "@/src/lib/config";

type TipoCuenta = "cliente" | "salon";

export default function RegisterPage() {
  const router = useRouter();
  const [tipoCuenta, setTipoCuenta] = useState<TipoCuenta>("cliente");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: tipoCuenta, nombre, email, password, telefono }),
      });

      if (!response.ok) {
        throw new Error("Error al registrarse. Quizás el correo ya existe.");
      }

      const data = await response.json();

      // Guardar sesión activa temporalmente
      localStorage.setItem("beautybook_sesion", JSON.stringify(data));

      // Redirigir según el tipo
      if (tipoCuenta === "cliente") {
        router.push("/dashboard");
      } else {
        router.push("/salon");
      }
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-md p-8">
        {/* Título */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Crear Cuenta</h1>
          <p className="text-gray-500 mt-1">Únete a nuestra comunidad</p>
        </div>

        {/* Selector de tipo de cuenta */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            type="button"
            onClick={() => setTipoCuenta("cliente")}
            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
              tipoCuenta === "cliente"
                ? "border-primary bg-accent shadow-sm"
                : "border-gray-100 hover:border-gray-200 bg-white"
            }`}
          >
            <User
              size={28}
              className={tipoCuenta === "cliente" ? "text-primary" : "text-gray-400"}
            />
            <span
              className={`text-sm font-semibold ${
                tipoCuenta === "cliente" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Cliente
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTipoCuenta("salon")}
            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
              tipoCuenta === "salon"
                ? "border-primary bg-accent shadow-sm"
                : "border-gray-100 hover:border-gray-200 bg-white"
            }`}
          >
            <Scissors
              size={28}
              className={tipoCuenta === "salon" ? "text-primary" : "text-gray-400"}
            />
            <span
              className={`text-sm font-semibold ${
                tipoCuenta === "salon" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Especialista
            </span>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {tipoCuenta === "cliente" ? "Nombre completo" : "Nombre del salón"}
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder={tipoCuenta === "cliente" ? "Tu nombre" : "Nombre de tu salón"}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="55 1234 5678"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-lg"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
