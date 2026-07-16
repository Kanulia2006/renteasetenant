import React from "react";

interface DatabaseConnectorProps {
  isLiveMode: boolean;
  setIsLiveMode: (val: boolean) => void;
  isCleared: boolean;
  setIsCleared: (val: boolean) => void;
  apiBaseUrl: string;
  setApiBaseUrl: (val: string) => void;
  apiStatus: "disconnected" | "connected" | "checking" | "error";
  fetchLiveData: () => void;
}

export function DatabaseConnector({
  isLiveMode,
  setIsLiveMode,
  isCleared,
  setIsCleared,
  apiBaseUrl,
  setApiBaseUrl,
  apiStatus,
  fetchLiveData
}: DatabaseConnectorProps) {
  return (
    <div style={{
      background: "#101e1a",
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      color: "#e6f4f1",
      padding: "14px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      fontSize: "13px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "16px" }}>⚡</span>
          <strong style={{ fontWeight: 600, letterSpacing: "-0.01em" }}>RentEase Database Connector</strong>
          <span style={{
            fontSize: "10px",
            padding: "2px 8px",
            borderRadius: "99px",
            fontWeight: "bold",
            letterSpacing: "0.03em",
            background: isLiveMode ? "#1a6b5a" : "rgba(255, 255, 255, 0.1)",
            color: isLiveMode ? "#e6f4f1" : "#9ca3af"
          }}>
            {isLiveMode ? "LIVE DATABASE MODE" : "DEMO / FALLBACK MODE"}
          </span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
            <input 
              type="checkbox" 
              checked={isLiveMode} 
              onChange={(e) => setIsLiveMode(e.target.checked)}
              style={{ accentColor: "#1a6b5a", width: "14px", height: "14px" }}
            />
            <span>Enable Live Mode</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
            <input 
              type="checkbox" 
              checked={isCleared} 
              onChange={(e) => setIsCleared(e.target.checked)}
              style={{ accentColor: "#dc2626", width: "14px", height: "14px" }}
            />
            <span style={{ color: isCleared ? "#fc8181" : "inherit" }}>Clear Fallback Data (Fresh Start)</span>
          </label>
        </div>
      </div>

      {isLiveMode ? (
        <div style={{ display: "flex", gap: "12px", alignItems: "center", background: "rgba(255, 255, 255, 0.04)", padding: "10px 12px", borderRadius: "8px", flexWrap: "wrap" }}>
          <span style={{ color: "#9ca3af", fontWeight: 500 }}>REST API Base URL:</span>
          <input 
            type="text" 
            value={apiBaseUrl}
            onChange={(e) => setApiBaseUrl(e.target.value)}
            placeholder="http://localhost:3000/api"
            style={{ 
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "6px",
              padding: "5px 10px",
              color: "#fff",
              fontSize: "12px",
              flex: "1 1 200px",
              outline: "none"
            }}
          />
          <button 
            onClick={fetchLiveData} 
            style={{ 
              padding: "5px 12px", 
              fontSize: "12px", 
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.2)", 
              color: "#fff", 
              background: "rgba(255,255,255,0.06)",
              cursor: "pointer",
              fontWeight: 500
            }}
          >
            Sync Tables 🔄
          </button>

          <span style={{ 
            fontSize: "11px", 
            fontWeight: "bold",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            color: apiStatus === "connected" ? "#34d399" : apiStatus === "checking" ? "#f59e0b" : "#f87171"
          }}>
            <span style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: apiStatus === "connected" ? "#34d399" : apiStatus === "checking" ? "#f59e0b" : "#f87171",
              display: "inline-block"
            }}/>
            {apiStatus === "connected" ? "CONNECTED" : apiStatus === "checking" ? "SYNCING..." : "DISCONNECTED / OFFLINE"}
          </span>
        </div>
      ) : (
        <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
          💡 {isCleared 
            ? 'Showing clean, empty dashboards. Uncheck "Clear Fallback Data" to restore placeholder designs.'
            : 'Currently showing safe design placeholders. Check "Enable Live Mode" above to query your live database / REST endpoints.'
          }
        </p>
      )}

      {isLiveMode && (
        <div style={{ fontSize: "11px", color: "#9ca3af", display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "2px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "6px" }}>
          <span>📡 <strong>Queried routes:</strong></span>
          <span>• Users: <code style={{ color: "#6ee7b7" }}>GET {apiBaseUrl}/users</code></span>
          <span>• Properties: <code style={{ color: "#6ee7b7" }}>GET {apiBaseUrl}/properties</code></span>
          <span>• Disputes: <code style={{ color: "#6ee7b7" }}>GET {apiBaseUrl}/disputes</code></span>
          <span>• Transactions: <code style={{ color: "#6ee7b7" }}>GET {apiBaseUrl}/transactions</code></span>
        </div>
      )}
    </div>
  );
}
