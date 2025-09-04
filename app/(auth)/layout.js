export default function AuthLayout({ children }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Área Pública</h2>
      <div>{children}</div>
    </div>
  );
}
