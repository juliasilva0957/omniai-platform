
import {
  Building2,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import "./DashboardLayout.css";

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-brand">
          <Sparkles size={25} />
          <span>OmniAI</span>
        </div>

        <nav
          className="dashboard-navigation"
          aria-label="Menu principal"
        >
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `dashboard-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <div className="dashboard-nav-link disabled">
            <Workflow size={19} />
            Automações
          </div>

          {user?.role === "ADMIN" && (
            <>
              <div className="dashboard-nav-link disabled">
                <Users size={19} />
                Usuários
              </div>

              <div className="dashboard-nav-link disabled">
                <Building2 size={19} />
                Empresa
              </div>
            </>
          )}
        </nav>

        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Sair da plataforma
        </button>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-header-label">
              ÁREA ADMINISTRATIVA
            </span>

            <h2>OmniAI</h2>
          </div>

          <div className="dashboard-user">
            <div className="dashboard-user-info">
              <strong>{user?.name}</strong>

              <span>
                {user?.role === "ADMIN"
                  ? "Administrador"
                  : "Usuário"}
              </span>
            </div>

            <div className="dashboard-avatar">
              {user?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
