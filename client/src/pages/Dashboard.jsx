import React from 'react';
import EmployeeManager from '../components/EmployeeManager';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <EmployeeManager />
    </div>
  );
}

export default Dashboard;
