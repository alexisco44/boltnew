import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Settings, Database, HardDrive, FunctionSquare, BarChart } from 'lucide-react';
import Sidebar from './layout/Sidebar';
import EnvironmentList from './environments/EnvironmentList';
import DatabaseManager from './database/DatabaseManager';
import StorageManager from './storage/StorageManager';
import FunctionManager from './functions/FunctionManager';
import MonitoringDashboard from './monitoring/MonitoringDashboard';

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <Routes>
              <Route path="/" element={<EnvironmentList />} />
              <Route path="/database" element={<DatabaseManager />} />
              <Route path="/storage" element={<StorageManager />} />
              <Route path="/functions" element={<FunctionManager />} />
              <Route path="/monitoring" element={<MonitoringDashboard />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}