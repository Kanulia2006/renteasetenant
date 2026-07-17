import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import Contract from "./pages/Contract";
import Notifications from "./pages/Notifications";
import Complaints from "./pages/Complaints";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import { initialNotifications } from "./data/mockData";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [currentRole, setCurrentRole] = useState("Tenant");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadCount = initialNotifications.filter((n) => !n.isRead).length;

  function navigate(page) {
    setActivePage(page);
  }

  return (
    <div className="shell">
      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        unreadCount={unreadCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="shell-main">
        <Topbar
          activePage={activePage}
          unreadCount={unreadCount}
          onMenuClick={() => setSidebarOpen(true)}
          onNavigate={navigate}
        />
        <div className="shell-content">
          {activePage === "dashboard" && <Dashboard onNavigate={navigate} />}
          {activePage === "payments" && <Payments />}
          {activePage === "contract" && <Contract />}
          {activePage === "notifications" && <Notifications />}
          {activePage === "complaints" && <Complaints />}
          {activePage === "reviews" && <Reviews />}
          {activePage === "settings" && (
            <Settings currentRole={currentRole} onRoleChange={setCurrentRole} onNavigate={navigate} />
          )}
          {activePage === "edit-profile" && <EditProfile onNavigate={navigate} />}
          {activePage === "change-password" && <ChangePassword onNavigate={navigate} />}
        </div>
      </div>
    </div>
  );
}
