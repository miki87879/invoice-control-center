import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";

export default function DashboardPage() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);

  useEffect(() => {
    const auth = localStorage.getItem("invoice_auth");

    if (auth !== "true") {
      window.location.href = "/login";
      return;
    }

    setAuthorized(true);
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      const response = await fetch(
        "https://michael78.app.n8n.cloud/webhook/invoice-logs"
      );

      if (!response.ok) {
        throw new Error("Failed loading logs");
      }

      const data = await response.json();

      if (data.logs && Array.isArray(data.logs)) {
        setLogs(data.logs);
        setTotalInvoices(data.totalInvoices || data.logs.length);
      } else {
        setLogs([]);
        setTotalInvoices(0);
      }
    } catch (error) {
      console.error("Failed loading logs", error);
      setLogs([]);
      setTotalInvoices(0);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("invoice_auth");
    window.location.href = "/login";
  }

  if (!authorized) return null;

  if (loading) {
    return (
      <div
        dir="rtl"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial",
          background: "#f4f6fb"
        }}
      >
        טוען נתונים...
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      style={{
        background: "#f4f6fb",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >
      <TopNav />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        <div
          style={{
            background: "white",
            padding: "28px 32px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "38px",
                color: "#0f172a"
              }}
            >
              מרכז הבקרה
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                marginTop: "10px"
              }}
            >
              תמונת מצב כללית של מערכת אוטומציית החשבוניות
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "#ef4444",
              border: "none",
              color: "white",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            התנתק
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
            marginBottom: "24px"
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
            }}
          >
            <h3 style={{ marginTop: 0, color: "#0f172a", fontSize: "24px" }}>
              מצב מערכת
            </h3>

            <p style={{ color: "#16a34a", fontWeight: "bold", fontSize: "20px" }}>
              האוטומציה פעילה ✅
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
            }}
          >
            <h3 style={{ marginTop: 0, color: "#0f172a", fontSize: "24px" }}>
              חשבוניות שעובדו
            </h3>

            <p style={{ fontSize: "42px", fontWeight: "bold", margin: "10px 0 0 0" }}>
              {totalInvoices}
            </p>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}
        >
          <h2 style={{ marginTop: 0, color: "#0f172a" }}>פעילות אחרונה</h2>

          {logs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#64748b",
                padding: "20px 0"
              }}
            >
              אין לוגים להצגה
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  padding: "16px 0"
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    color: "#111827",
                    marginBottom: "10px"
                  }}
                >
                  {log.company || "לא ידוע"}
                </div>

                <div style={{ color: "#475569", marginTop: "6px", fontSize: "16px" }}>
                  חשבונית: {log.invoiceNumber || "-"}
                </div>

                <div style={{ color: "#475569", marginTop: "6px", fontSize: "16px" }}>
                  סטטוס: {log.status || "Uploaded"}
                </div>

                <div style={{ color: "#475569", marginTop: "6px", fontSize: "16px" }}>
                  תאריך חשבונית:{" "}
                  <span style={dateTextStyle}>
                    {log.invoiceDate || "-"}
                  </span>
                </div>

                <div style={{ color: "#475569", marginTop: "6px", fontSize: "16px" }}>
                  תאריך העלאה למערכת:{" "}
                  <span style={dateTextStyle}>
                    {log.uploadDate || "-"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const dateTextStyle = {
  direction: "ltr",
  unicodeBidi: "isolate",
  display: "inline-block"
};
