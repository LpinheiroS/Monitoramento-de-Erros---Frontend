export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, background: "#eee", padding: 20 }}>
        <h3>Menu</h3>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/profile">Perfil</a></li>
          <li><a href="/settings">Configurações</a></li>
        </ul>
      </aside>
      <main style={{ flex: 1, padding: 20 }}>
        {children}
      </main>
    </div>
  );
}
