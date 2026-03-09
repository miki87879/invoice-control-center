import { useEffect, useState } from "react";

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

      const data = await response.json();

      if (data.logs) {
        setLogs(data.logs);
        setTotalInvoices(data.totalInvoices || data.logs.length);
      }

    } catch (error) {
      console.error("Failed loading logs", error);
    }

    setLoading(false);

  }

  function handleLogout() {
    localStorage.removeItem("invoice_auth");
    window.location.href = "/login";
  }

  if (!authorized) return null;

  if (loading) {
    return (
      <div style={{
        minHeight:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        fontFamily:"Arial"
      }}>
        טוען נתונים...
      </div>
    );
  }

  return (

    <div dir="rtl" style={{
      background:"#f4f6fb",
      minHeight:"100vh",
      fontFamily:"Arial",
      padding:"40px 20px"
    }}>

      <div style={{maxWidth:"1200px",margin:"0 auto"}}>

        <div style={{
          background:"white",
          padding:"30px",
          borderRadius:"16px",
          boxShadow:"0 10px 40px rgba(0,0,0,0.08)",
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:"30px"
        }}>

          <div>
            <h1 style={{margin:0}}>מרכז הבקרה</h1>
            <p style={{color:"#64748b"}}>
              מערכת ניהול לאוטומציית החשבוניות
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background:"#ef4444",
              border:"none",
              color:"white",
              padding:"12px 18px",
              borderRadius:"8px",
              cursor:"pointer"
            }}
          >
            התנתק
          </button>

        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
          gap:"20px",
          marginBottom:"30px"
        }}>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"14px",
            boxShadow:"0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <h3>מצב מערכת</h3>
            <p style={{color:"green",fontWeight:"bold"}}>
              האוטומציה פעילה ✅
            </p>
          </div>

          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"14px",
            boxShadow:"0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <h3>חשבוניות שעובדו</h3>
            <p style={{fontSize:"28px",fontWeight:"bold"}}>
              {totalInvoices}
            </p>
          </div>

        </div>

        <div style={{
          background:"white",
          padding:"25px",
          borderRadius:"14px",
          boxShadow:"0 10px 30px rgba(0,0,0,0.05)"
        }}>

          <h2>פעילות אחרונה</h2>

          {logs.map((log,index)=>(
            <div key={index} style={{
              borderBottom:"1px solid #eee",
              padding:"14px 0"
            }}>

              <div style={{fontWeight:"bold"}}>
                {log.company || "לא ידוע"}
              </div>

              <div style={{color:"#555"}}>
                חשבונית: {log.invoiceNumber || "-"}
              </div>

              <div style={{color:"#888"}}>
                זמן עיבוד: {log.processingTime} שניות
              </div>

              <div style={{color:"#888"}}>
                תאריך: {log.date}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>

  );
}
