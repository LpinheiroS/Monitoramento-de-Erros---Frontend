"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/home", {
          credentials: "include"
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data.usuario);
        } else {
          router.push("/login"); // redireciona para login se não autorizado
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, [router]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Bem-vindo!</h1>
      <button
        onClick={async () => {
          await fetch("http://localhost:5000/api/logout", {
            method: "POST",
            credentials: "include"
          });
          router.push("/login");
        }}
      >
        Sair
      </button>
    </div>
  );
}
