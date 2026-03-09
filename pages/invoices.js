import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";

function buildDownloadLink(fileLink) {
  if (!fileLink) return "";

  return `https://michael7878.sharepoint.com/sites/InvoiceAutomationTest/_layouts/download.aspx?SourceUrl=${encodeURIComponent(
    fileLink
  )}`;
}

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
    return (
      <div style={loadingStyle}>
        טוען נתונים...
      </div>
    );
  }

  return (
    <div dir="rtl" style={pageStyle}>
      <TopNav />

      <div style={containerStyle}>
        <div style={headerCard}>
          <h1 style={titleStyle}>כל החשבוניות</h1>
          <p style={subtitleStyle}>
            רשימה מלאה של הלוגים ממערכת האוטומציה
          </p>
        </div>

        <div style={tableCard}>
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
                    <span style={statusStyle}>
                      {log.status}
                    </span>
                  </td>

                  <td>{log.invoiceDate || "-"}</td>

                  <td>{log.uploadDate}</td>

                  <td>
                    {log.fileLink ? (
                      <div style={actionsStyle}>
                        <a
                          href={log.fileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={openButton}
                        >
                          🧾 פתח חשבונית
                        </a>

                        <a
                          href={buildDownloadLink(log.fileLink)}
                          style={downloadButton}
                        >
                          ⬇ הורד
                        </a>
                      </div>
                    ) : (
                      <span>-</span>
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

const pageStyle = {
  background: "#f4f6fb",
  minHeight: "100vh",
  fontFamily: "Arial"
};

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px"
};

const containerStyle = {
  maxWidth: "1300px",
  margin: "0 auto",
  padding: "30px 20px"
};

const headerCard = {
  background: "white",
  padding: "30px",
  borderRadius: "16px",
  marginBottom: "25px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
};

const titleStyle = {
  margin: 0,
  fontSize: "36px"
};

const subtitleStyle = {
  color: "#64748b",
  marginTop: "8px"
};

const tableCard = {
  background: "white",
  padding: "20px",
  borderRadius: "16px",
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

const actionsStyle = {
  display: "flex",
  gap: "10px"
};

const openButton = {
  textDecoration: "none",
  background: "#eff6ff",
  color: "#1d4ed8",
  border: "1px solid #bfdbfe",
  padding: "8px 12px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "bold"
};

const downloadButton = {
  textDecoration: "none",
  background: "#ecfdf5",
  color: "#166534",
  border: "1px solid #bbf7d0",
  padding: "8px 12px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "bold"
};
