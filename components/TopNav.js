export default function TopNav() {
  return (
    <div
      dir="rtl"
      style={{
        width: "100%",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.04)"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "18px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        <div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#0f172a"
            }}
          >
            Invoice Control Center
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginTop: "4px"
            }}
          >
            מערכת בקרה לאוטומציית החשבוניות
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <a
            href="/dashboard"
            style={{
              textDecoration: "none",
              color: "#0f172a",
              background: "#f8fafc",
              padding: "10px 16px",
              borderRadius: "10px",
              fontWeight: "bold",
              border: "1px solid #e2e8f0"
            }}
          >
            מרכז בקרה
          </a>

          <a
            href="/invoices"
            style={{
              textDecoration: "none",
              color: "#0f172a",
              background: "#f8fafc",
              padding: "10px 16px",
              borderRadius: "10px",
              fontWeight: "bold",
              border: "1px solid #e2e8f0"
            }}
          >
            כל החשבוניות
          </a>

          <a
            href="/stats"
            style={{
              textDecoration: "none",
              color: "#0f172a",
              background: "#f8fafc",
              padding: "10px 16px",
              borderRadius: "10px",
              fontWeight: "bold",
              border: "1px solid #e2e8f0"
            }}
          >
            סטטיסטיקות
          </a>
        </div>
      </div>
    </div>
  );
}
