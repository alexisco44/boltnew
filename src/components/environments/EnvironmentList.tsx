import React from 'react';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { Environment } from '../../types/supabase';

const mockEnvironments: Environment[] = [
  {
    id: '1',
    name: 'Development',
    type: 'development',
    projectRef: 'dev-ref',
    apiKey: '****',
    status: 'active',
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z',
  },
  {
    id: '2',
    name: 'Staging',
    type: 'staging',
    projectRef: 'staging-ref',
    apiKey: '****',
    status: 'active',
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z',
  },
];

export default function EnvironmentList() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Environments</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <PlusCircle className="h-5 w-5 mr-2" />
          New Environment
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {mockEnvironments.map((env) => (
            <li key={env.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      env.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                    <p className="text-sm font-medium text-indigo-600 truncate">{env.name}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Type: {env.type}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Project Ref: {env.projectRef}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Updated {new Date(env.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}