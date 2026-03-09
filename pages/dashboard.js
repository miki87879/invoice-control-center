import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("invoice_auth");

    if (auth === "true") {
      setAuthorized(true);
      setLoading(false);
      return;
    }

    window.location.href = "/login";
  }, []);

  function handleLogout() {
    localStorage.removeItem("invoice_auth");
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          background: "#f5f7fb"
        }}
      >
        טוען...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
            padding: "28px 32px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "34px",
                color: "#1e293b"
              }}
            >
              מרכז הבקרה
            </h1>

            <p
              style={{
                marginTop: "10px",
                color: "#64748b",
                fontSize: "16px"
              }}
            >
              מערכת ניהול ובקרה לאוטומציית החשבוניות
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "12px 18px",
              borderRadius: "10px",
              border: "none",
              background: "#ef4444",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            התנתק
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px"
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#1e293b",
                fontSize: "22px"
              }}
            >
              מצב מערכת
            </h2>

            <p
              style={{
                color: "#16a34a",
                fontWeight: "bold",
                fontSize: "18px"
              }}
            >
              האוטומציה פעילה ✅
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#1e293b",
                fontSize: "22px"
              }}
            >
              סטטוס התחברות
            </h2>

            <p
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                fontSize: "18px"
              }}
            >
              מחובר כאדמין
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#1e293b",
                fontSize: "22px"
              }}
            >
              השלב הבא
            </h2>

            <p
              style={{
                color: "#475569",
                fontSize: "16px",
                lineHeight: "1.7"
              }}
            >
              בשלב הבא נחבר את הדשבורד ללוגים האמיתיים ונוסיף כרטיסי סטטיסטיקה,
              טבלה, פילטרים וגרפים.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
