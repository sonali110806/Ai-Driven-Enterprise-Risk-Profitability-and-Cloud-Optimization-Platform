import React from 'react';

function Header({ userName = 'Admin' }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>AI Risk Cloud Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span className="user-avatar">👤</span>
          <span className="user-name">{userName}</span>
        </div>
        <div className="header-notifications">
          <span className="notification-icon">🔔</span>
        </div>
      </div>
    </header>
  );
}

export default Header;