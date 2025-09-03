"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cadastrar = async () => {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMensagem(data.message || data.error);
  };

  const logar = async () => {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, senha: form.senha }),
    });
    const data = await res.json();
    setMensagem(data.message || data.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login / Cadastro</h1>
      <input name="nome" placeholder="Nome" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input type="password" name="senha" placeholder="Senha" onChange={handleChange} /><br />
      <button onClick={cadastrar}>Cadastrar</button>
      <button onClick={logar}>Login</button>
      <p>{mensagem}</p>
    </div>
  );
}
