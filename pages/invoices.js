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

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  if (loading) {
    return <div style={{ padding: 40 }}>טוען נתונים...</div>;
  }

  return (
    <div dir="rtl">
      <TopNav />

      <div style={containerStyle}>
        <h1 style={titleStyle}>כל החשבוניות</h1>
        <p style={subtitleStyle}>
          רשימה מלאה של הלוגים ממערכת האוטומציה
        </p>

        <div style={tableContainer}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>חברה</th>
                <th>חשבונית</th>
                <th>סטטוס</th>
                <th>תאריך חשבונית</th>
                <th>תאריך העלאה למערכת</th>
                <th>מסמך</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.company}</td>

                  <td>{log.invoiceNumber}</td>

                  <td>
                    <span style={statusStyle}>{log.status}</span>
                  </td>

                  <td>{log.invoiceDate || "-"}</td>

                  <td>{log.uploadDate}</td>

                  <td>
                    {log.fileLink ? (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <a
                          href={log.fileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={invoiceButtonStyle}
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
                      <span style={{ color: "#94a3b8" }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px"
};

const titleStyle = {
  fontSize: "32px",
  marginBottom: "10px"
};

const subtitleStyle = {
  color: "#64748b",
  marginBottom: "30px"
};

const tableContainer = {
  background: "white",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse"
};

const statusStyle = {
  background: "#dcfce7",
  color: "#166534",
  padding: "6px 12px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "bold"
};

const invoiceButtonStyle = {
  display: "inline-block",
  textDecoration: "none",
  background: "#eff6ff",
  color: "#1d4ed8",
  border: "1px solid #bfdbfe",
  padding: "8px 12px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "bold"
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
  fontWeight: "bold"
};
