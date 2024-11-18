import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabaseClient';
import {
  LogOut,
  Settings,
  Database,
  HardDrive,
  FunctionSquare,
  BarChart,
  Layout,
} from 'lucide-react';

const navigation = [
  { name: 'Environments', href: '/dashboard', icon: Layout },
  { name: 'Database', href: '/dashboard/database', icon: Database },
  { name: 'Storage', href: '/dashboard/storage', icon: HardDrive },
  { name: 'Functions', href: '/dashboard/functions', icon: FunctionSquare },
  { name: 'Monitoring', href: '/dashboard/monitoring', icon: BarChart },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuthStore();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">Supabase Manager</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <Icon
                      className={`${
                        isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-gray-700 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${user?.email}`}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user?.email}</p>
                  <button
                    onClick={handleSignOut}
                    className="text-xs font-medium text-gray-300 group-hover:text-gray-200 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}