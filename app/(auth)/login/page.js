"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const logar = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // importante para cookies
      body: JSON.stringify(form),
    });

    // Checa se o backend respondeu com sucesso
    if (!res.ok) {
      const data = await res.json(); // tenta pegar a mensagem de erro
      setMensagem(data.error || `Erro ${res.status}: ${res.statusText}`);
      return;
    }

    // Sucesso
    const data = await res.json();
    setMensagem("Login realizado!");
    router.push("/home"); // redireciona para a tela inicial

  } catch (error) {
    // Captura erros de conexão, CORS ou falha geral
    console.error("Erro na requisição:", error);
    setMensagem("Não foi possível conectar ao servidor.");
  }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <input
        name="email"
        placeholder="E-mail"
        onChange={handleChange}
      /><br />
      <input
        type="password"
        name="senha"
        placeholder="Senha"
        onChange={handleChange}
      /><br />
      <button onClick={logar}>Entrar</button>
      <p>{mensagem}</p>
      <p>
        Não tem conta?{" "}
        <a href="/register" style={{ color: "blue" }}>
          Cadastre-se aqui
        </a>
      </p>
    </div>
  );
}
