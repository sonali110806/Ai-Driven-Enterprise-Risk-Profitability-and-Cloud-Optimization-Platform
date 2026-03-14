import React from 'react';

function Sidebar({ activePage, setActivePage, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'cloud-metrics', label: 'Cloud Metrics', icon: '☁️' },
    { id: 'reports', label: 'Reports', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'login', label: 'Login', icon: '🔑' }
  ];

  const handleMenuClick = (id) => {
    if (id === 'login') {
      // Treat the login item as a logout action for the current session
      onLogout && onLogout();
      return;
    }
    setActivePage(id);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>AI Risk Cloud Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;