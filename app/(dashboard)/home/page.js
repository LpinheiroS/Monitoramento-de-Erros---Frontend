"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [notas, setNotas] = useState([]);
  const [erroFatal, setErroFatal] = useState("");

  useEffect(() => {
    const carregarDashboard = async () => {
      try {
        // 1. Verificar Login
        const resUser = await fetch("http://localhost:5000/api/home", {
          credentials: "include"
        });

        if (!resUser.ok) {
          router.push("/login");
          return;
        }

        const dataUser = await resUser.json();
        setUsuario(dataUser.usuario);

        // 2. Buscar Notas
        const resNotas = await fetch("http://localhost:5000/api/notas", {
          credentials: "include"
        });

        if (resNotas.ok) {
          const notasData = await resNotas.json();
          setNotas(notasData);
        } else {
          setErroFatal("Falha ao carregar as notas do sistema.");
        }
      } catch (err) {
        console.error(err);
        setErroFatal("Não foi possível conectar ao servidor.");
      } finally {
        setLoading(false);
      }
    };

    carregarDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Mapeando erros nas notas, aguarde...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Monitoramento de Notas</h1>
          <p className="auth-subtitle" style={{ marginBottom: 0, marginTop: '0.25rem' }}>
            Olá, {usuario?.nome || usuario?.email || 'Usuário'}! Verifique as falhas de integração abaixo.
          </p>
        </div>
        <button
          className="btn-secondary"
          onClick={async () => {
             await fetch("http://localhost:5000/api/logout", {
               method: "POST",
               credentials: "include"
             });
             router.push("/login");
          }}
        >
          Sair da Conta
        </button>
      </header>

      {erroFatal && <div className="alert-message">{erroFatal}</div>}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Filial</th>
              <th>Nota</th>
              <th>Série</th>
              <th>Status</th>
              <th>Erro Encontrado</th>
            </tr>
          </thead>
          <tbody>
            {notas.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", color: 'var(--text-muted)' }}>
                  Nenhuma nota com erro encontrada. Tudo certo!
                </td>
              </tr>
            ) : (
              notas.map((nota, index) => (
                <tr key={`${nota.codemp}-${nota.codfil}-${nota.numnfv}-${index}`}>
                  <td>{nota.codemp}</td>
                  <td>{nota.codfil}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{nota.numnfv}</td>
                  <td>{nota.codsnf}</td>
                  <td>
                    {nota.sitimp === 0 ? (
                      <span className="status-badge status-ok">OK</span>
                    ) : (
                      <span className="status-badge status-error">Falha</span>
                    )}
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: "300px" }}>
                    {nota.msgret || "Sem descrição de erro."}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
