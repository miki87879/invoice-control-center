import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";

export default function InvoicesPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("invoice_auth");

    if (auth !== "true") {
      window.location.href = "/login";
      return;
    }

    loadInvoices();
  }, []);

  async function loadInvoices() {
    try {
      const response = await fetch(
        "https://michael78.app.n8n.cloud/webhook/invoice-logs"
      );

      const data = await response.json();

      if (data.logs) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error("Error loading invoices", error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial",
        }}
      >
        טוען חשבוניות...
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      style={{
        background: "#f4f6fb",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <TopNav />

      <div style={{ maxWidth: "1200px", margin: "auto", padding: "30px" }}>
        <h1 style={{ marginBottom: "20px" }}>כל החשבוניות</h1>

        <div
          style={{
            background: "white",
            borderRadius: "14px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th style={th}>חברה</th>
                <th style={th}>חשבונית</th>
                <th style={th}>סטטוס</th>
                <th style={th}>זמן עיבוד</th>
                <th style={th}>תאריך</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={td}>{log.company || "לא ידוע"}</td>

                  <td style={td}>{log.invoiceNumber || "-"}</td>

                  <td style={td}>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#166534",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {log.status || "Uploaded"}
                    </span>
                  </td>

                  <td style={td}>{log.processingTime} שניות</td>

                  <td style={td}>{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const th = {
  textAlign: "right",
  padding: "12px",
  fontWeight: "bold",
  fontSize: "14px",
  color: "#475569",
};

const td = {
  padding: "12px",
  fontSize: "14px",
};
