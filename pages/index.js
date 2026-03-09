export default function Home() {
  return (
    <div style={{
      fontFamily: "Arial",
      background: "#f4f6fb",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      
      <div style={{
        background: "white",
        padding: "60px",
        borderRadius: "14px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        textAlign: "center",
        width: "500px"
      }}>

        <h1 style={{
          marginBottom: "20px",
          color: "#1f2d3d"
        }}>
          Invoice Control Center
        </h1>

        <p style={{
          color: "#6b7a90",
          marginBottom: "40px"
        }}>
          Secure dashboard for invoice automation monitoring
        </p>

        <a href="/login">
          <button style={{
            padding: "14px 28px",
            background: "#2f6fed",
            border: "none",
            color: "white",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer"
          }}>
            Login to Dashboard
          </button>
        </a>

      </div>

    </div>
  )
}
