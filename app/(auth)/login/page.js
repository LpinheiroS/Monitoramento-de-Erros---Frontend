"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const logar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // importante para cookies
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setMensagem(data.error || `Erro ${res.status}: ${res.statusText}`);
        return;
      }

      setMensagem("Login realizado!");
      router.push("/home"); // redireciona para a tela inicial

    } catch (error) {
      console.error("Erro na requisição:", error);
      setMensagem("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>
      <h1 className="auth-title">Bem-vindo de volta</h1>
      <p className="auth-subtitle">Acesso ao painel de monitoramento</p>
      
      <form className="auth-form" onSubmit={logar}>
        <div className="input-group">
          <input
            className="input-field"
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            className="input-field"
            type="password"
            name="senha"
            placeholder="Senha"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Entrar</button>
      </form>

      {mensagem && <div className="alert-message">{mensagem}</div>}

      <div className="auth-footer">
        Não tem conta?
        <Link href="/register" className="auth-link">
          Cadastre-se aqui
        </Link>
      </div>
    </div>
  );
}
