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
      <div style={loadingPageStyle}>
        טוען חשבוניות...
      </div>
    );
  }

  return (
    <div dir="rtl" style={pageStyle}>
      <TopNav />

      <div style={wrapperStyle}>
        <div style={heroCardStyle}>
          <h1 style={titleStyle}>כל החשבוניות</h1>
          <p style={subtitleStyle}>רשימה מלאה של הלוגים ממערכת האוטומציה</p>
        </div>

        <div style={tableCardStyle}>
          {logs.length === 0 ? (
            <div style={emptyStateStyle}>לא נמצאו חשבוניות להצגה</div>
          ) : (
            <div style={tableWrapperStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>חברה</th>
                    <th style={thStyle}>חשבונית</th>
                    <th style={thStyle}>סטטוס</th>
                    <th style={thStyle}>תאריך חשבונית</th>
                    <th style={thStyle}>תאריך העלאה למערכת</th>
                    <th style={thStyle}>מסמך</th>
                  </tr>
                </thead>

                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index} style={rowStyle}>
                      <td style={tdStyle}>{log.company || "לא ידוע"}</td>

                      <td style={tdStyle}>{log.invoiceNumber || "-"}</td>

                      <td style={tdStyle}>
                        <span
                          style={{
                            ...statusBadgeStyle,
                            ...(log.status === "Error"
                              ? errorBadgeStyle
                              : log.status === "Skipped"
                              ? skippedBadgeStyle
                              : uploadedBadgeStyle)
                          }}
                        >
                          {log.status || "Uploaded"}
                        </span>
                      </td>

                      <td style={tdStyle}>
                        <span style={dateTextStyle}>
                          {log.invoiceDate || "-"}
                        </span>
                      </td>

                      <td style={tdStyle}>
                        <span style={dateTextStyle}>
                          {log.uploadDate || "-"}
                        </span>
                      </td>

                      <td style={tdStyle}>
                        {log.fileLink ? (
                          <div style={actionsStyle}>
                            <a
                              href={log.fileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={openButtonStyle}
                            >
                              🧾 פתח חשבונית
                            </a>

                            <a
                              href={`${log.fileLink}?download=1`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={downloadButtonStyle}
                            >
                              ⬇ הורד
                            </a>
                          </div>
                        ) : (
                          <span style={dashStyle}>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  background: "#f4f6fb",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  color: "#0f172a"
};

const loadingPageStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f4f6fb",
  fontFamily: "Arial, sans-serif",
  color: "#0f172a",
  fontSize: "18px"
};

const wrapperStyle = {
  maxWidth: "1450px",
  margin: "0 auto",
  padding: "30px 20px"
};

const heroCardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "28px 32px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
  marginBottom: "24px"
};

const titleStyle = {
  margin: 0,
  fontSize: "38px",
  fontWeight: "700",
  color: "#0f172a"
};

const subtitleStyle = {
  marginTop: "10px",
  marginBottom: 0,
  color: "#64748b",
  fontSize: "16px"
};

const tableCardStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
};

const tableWrapperStyle = {
  width: "100%",
  overflowX: "auto"
};

const tableStyle = {
  width: "100%",
  minWidth: "1150px",
  borderCollapse: "collapse",
  tableLayout: "auto"
};

const thStyle = {
  textAlign: "right",
  padding: "16px 12px",
  fontSize: "15px",
  fontWeight: "700",
  color: "#475569",
  borderBottom: "2px solid #e5e7eb",
  whiteSpace: "nowrap"
};

const tdStyle = {
  textAlign: "right",
  padding: "18px 12px",
  fontSize: "15px",
  color: "#0f172a",
  borderBottom: "1px solid #f1f5f9",
  verticalAlign: "middle"
};

const rowStyle = {
  background: "#ffffff"
};

const dateTextStyle = {
  direction: "ltr",
  unicodeBidi: "isolate",
  display: "inline-block",
  whiteSpace: "nowrap"
};

const statusBadgeStyle = {
  display: "inline-block",
  padding: "7px 12px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "700",
  whiteSpace: "nowrap"
};

const uploadedBadgeStyle = {
  background: "#dcfce7",
  color: "#166534"
};

const skippedBadgeStyle = {
  background: "#fef3c7",
  color: "#92400e"
};

const errorBadgeStyle = {
  background: "#fee2e2",
  color: "#991b1b"
};

const actionsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  alignItems: "center"
};

const openButtonStyle = {
  display: "inline-block",
  textDecoration: "none",
  background: "#eff6ff",
  color: "#1d4ed8",
  border: "1px solid #bfdbfe",
  padding: "8px 12px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "700",
  whiteSpace: "nowrap"
};

const downloadButtonStyle = {
  display: "inline-block",
  textDecoration: "none",
  background: "#ecfdf5",
  color: "#166534",
  border: "1px solid #bbf7d0",
  padding: "8px 12px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "700",
  whiteSpace: "nowrap"
};

const dashStyle = {
  color: "#94a3b8",
  fontWeight: "600"
};

const emptyStateStyle = {
  padding: "30px",
  textAlign: "center",
  color: "#64748b",
  fontSize: "16px"
};
