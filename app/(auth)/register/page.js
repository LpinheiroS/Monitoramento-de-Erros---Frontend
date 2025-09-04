"use client";
import { useState } from "react";

export default function Register() {
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

  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastro</h1>
      <input name="nome" placeholder="Nome" onChange={handleChange} /><br />
      <input name="email" placeholder="E-mail" onChange={handleChange} /><br />
      <input type="password" name="senha" placeholder="Senha" onChange={handleChange} /><br />
      <button onClick={cadastrar}>Cadastrar</button>
      <p>{mensagem}</p>
      <p>
        <a href="/login" style={{ color: "blue" }}>
          Voltar
        </a>
      </p>
    </div>
  );
}
