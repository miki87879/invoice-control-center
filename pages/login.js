import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("invoice_auth", "true");
        window.location.href = "/dashboard";
        return;
      }

      setErrorMessage("שם משתמש או סיסמה שגויים");
    } catch (error) {
      setErrorMessage("אירעה שגיאה בהתחברות");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "18px",
          boxShadow: "0 12px 40px rgba(15, 23, 42, 0.10)",
          padding: "40px 32px"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              color: "#1e293b"
            }}
          >
            התחברות למערכת
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#64748b",
              fontSize: "15px",
              lineHeight: "1.6"
            }}
          >
            Invoice Control Center
            <br />
            מערכת בקרה לאוטומציית החשבוניות
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "18px", textAlign: "right" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#334155",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              שם משתמש
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="הכנס שם משתמש"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                outline: "none",
                textAlign: "right"
              }}
            />
          </div>

          <div style={{ marginBottom: "22px", textAlign: "right" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#334155",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              סיסמה
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הכנס סיסמה"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                outline: "none",
                textAlign: "right"
              }}
            />
          </div>

          {errorMessage ? (
            <div
              style={{
                marginBottom: "16px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#fef2f2",
                color: "#b91c1c",
                border: "1px solid #fecaca",
                fontSize: "14px",
                textAlign: "center"
              }}
            >
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "10px",
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "מתחבר..." : "התחבר"}
          </button>
        </form>

        <div
          style={{
            marginTop: "18px",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "13px"
          }}
        >
          גישה מורשית בלבד
        </div>
      </div>
    </div>
  );
}
