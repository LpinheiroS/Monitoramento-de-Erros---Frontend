"use client";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cadastrar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMensagem(data.message || data.error);
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Falha ao se conectar.");
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-icon">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.66-1.382c.15-.316.425-.562.771-.62A6.34 6.34 0 0019 16.5H5.06a2.25 2.25 0 00-2.25 2.25v.485c0 .598.487 1.085 1.085 1.085h13.11c.598 0 1.085-.487 1.085-1.085v-.485a2.25 2.25 0 00-2.25-2.25h-9.72m0 0v-.485a6.375 6.375 0 0112.66-1.382v.11" />
        </svg>
      </div>
      <h1 className="auth-title">Criar Conta</h1>
      <p className="auth-subtitle">Cadastre-se para acessar a plataforma</p>
      
      <form className="auth-form" onSubmit={cadastrar}>
        <div className="input-group">
          <input 
            className="input-field" 
            name="nome" 
            placeholder="Nome completo" 
            onChange={handleChange} 
            required 
          />
        </div>
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
        <button type="submit" className="btn-primary">Finalizar Cadastro</button>
      </form>

      {mensagem && <div className="alert-message">{mensagem}</div>}

      <div className="auth-footer">
        Já tem uma conta?
        <Link href="/login" className="auth-link">
          Faça login
        </Link>
      </div>
    </div>
  );
}
