import React, { useState } from "react";
import Sidebar from './Sidebar';
import Header from './Header';
import Cards from './Cards';

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch(activePage) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div className="welcome-section">
              <h2>AI Risk Cloud Analytics</h2>
              <p>Track key project health metrics and cloud usage in a single view.</p>
            </div>

            <Cards />
          </div>
        );
      case 'projects':
        return <div className="page-content"><h2>Projects Page</h2><p>Project management features coming soon...</p></div>;
      case 'cloud-metrics':
        return <div className="page-content"><h2>Cloud Metrics</h2><p>Detailed cloud analytics coming soon...</p></div>;
      case 'reports':
        return <div className="page-content"><h2>Reports</h2><p>Generate and view reports here...</p></div>;
      case 'settings':
        return <div className="page-content"><h2>Settings</h2><p>Configure your preferences...</p></div>;
      default:
        return <div className="page-content"><h2>Dashboard</h2></div>;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
      <div className="main-area">
        <Header />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;