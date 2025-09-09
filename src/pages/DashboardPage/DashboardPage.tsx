import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { WaterTank } from "../../components/WaterTank/WaterTank";
import {
  Home,
  Settings,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  Droplets,
  Thermometer,
  Gauge,
} from "lucide-react";
import "./DashboardPage.css";

export const DashboardPage = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [waterLevel, setWaterLevel] = useState(65); // Mock data - 65% full
  const [temperature] = useState(24); // Mock data - 24°C
  const [pressure] = useState(2.3); // Mock data - 2.3 bar

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Relatórios", active: false },
    { icon: Users, label: "Usuários", active: false },
    { icon: Settings, label: "Configurações", active: false },
  ];

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">SensorLog</h2>
          <button className="sidebar-close" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${item.active ? "nav-item-active" : ""}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h1 className="dashboard-title">Dashboard de Gerenciamento</h1>
          <div className="header-actions">
            <span className="user-info">Admin</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Droplets size={24} />
              </div>
              <div className="stat-content">
                <h3>Nível da Água</h3>
                <p className="stat-value">{waterLevel}%</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Thermometer size={24} />
              </div>
              <div className="stat-content">
                <h3>Temperatura</h3>
                <p className="stat-value">{temperature}°C</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Gauge size={24} />
              </div>
              <div className="stat-content">
                <h3>Pressão</h3>
                <p className="stat-value">{pressure} bar</p>
              </div>
            </div>
          </div>

          {/* Water Tank Section */}
          <div className="water-tank-section">
            <h2 className="section-title">Monitoramento da Caixa d'Água</h2>
            <div className="water-tank-container">
              <WaterTank level={waterLevel} />
              <div className="tank-controls">
                <button
                  className="control-button"
                  onClick={() => setWaterLevel(Math.min(100, waterLevel + 10))}
                >
                  +10%
                </button>
                <button
                  className="control-button"
                  onClick={() => setWaterLevel(Math.max(0, waterLevel - 10))}
                >
                  -10%
                </button>
                <button
                  className="control-button primary"
                  onClick={() => setWaterLevel(Math.floor(Math.random() * 100))}
                >
                  Aleatório
                </button>
              </div>
            </div>
          </div>

          {/* Additional Dashboard Content */}
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Status do Sistema</h3>
              <div className="status-list">
                <div className="status-item">
                  <span className="status-indicator online"></span>
                  <span>Sensor de Nível: Online</span>
                </div>
                <div className="status-item">
                  <span className="status-indicator online"></span>
                  <span>Sensor de Temperatura: Online</span>
                </div>
                <div className="status-item">
                  <span className="status-indicator warning"></span>
                  <span>Bomba: Manutenção Necessária</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Alertas Recentes</h3>
              <div className="alerts-list">
                <div className="alert-item warning">
                  <span>Nível baixo detectado às 14:30</span>
                </div>
                <div className="alert-item info">
                  <span>Manutenção programada para amanhã</span>
                </div>
                <div className="alert-item success">
                  <span>Sistema funcionando normalmente</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
