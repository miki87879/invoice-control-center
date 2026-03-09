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

      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }

      const data = await response.json();

      if (data.logs && Array.isArray(data.logs)) {
        setLogs(data.logs);
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error("Error loading invoices", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }

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
        fontFamily: "Arial"
      }}
    >
      <TopNav />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "30px 20px" }}>
        <div
          style={{
            background: "white",
            padding: "28px 32px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
            marginBottom: "24px"
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "38px",
              color: "#0f172a"
            }}
          >
            כל החשבוניות
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
              marginTop: "10px"
            }}
          >
            רשימה מלאה של הלוגים ממערכת האוטומציה
          </p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}
        >
          {logs.length === 0 ? (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                color: "#64748b",
                fontSize: "16px"
              }}
            >
              לא נמצאו חשבוניות להצגה
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  <th style={th}>חברה</th>
                  <th style={th}>חשבונית</th>
                  <th style={th}>סטטוס</th>
                  <th style={th}>תאריך חשבונית</th>
                  <th style={th}>תאריך העלאה למערכת</th>
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
                          background:
                            log.status === "Error"
                              ? "#fee2e2"
                              : log.status === "Skipped"
                              ? "#fef3c7"
                              : "#dcfce7",
                          color:
                            log.status === "Error"
                              ? "#991b1b"
                              : log.status === "Skipped"
                              ? "#92400e"
                              : "#166534",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        {log.status || "Uploaded"}
                      </span>
                    </td>

                    <td style={td}>
                      <span style={dateTextStyle}>
                        {log.invoiceDate || "-"}
                      </span>
                    </td>

                    <td style={td}>
                      <span style={dateTextStyle}>
                        {log.uploadDate || "-"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
  color: "#475569"
};

const td = {
  padding: "12px",
  fontSize: "14px",
  color: "#0f172a"
};

const dateTextStyle = {
  direction: "ltr",
  unicodeBidi: "isolate",
  display: "inline-block"
};
