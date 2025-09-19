import React from 'react';
import { Server } from '../types/server';
import { Edit, Trash2, Monitor, MapPin, Cpu, HardDrive, Users } from 'lucide-react';

interface ServerCardProps {
  server: Server;
  onEdit: (server: Server) => void;
  onDelete: (id: string) => void;
}

export function ServerCard({ server, onEdit, onDelete }: ServerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'online' ? '●' : status === 'offline' ? '●' : '◐';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Monitor className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{server.name}</h3>
            <p className="text-sm text-gray-600">{server.ipAddress}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(server)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(server.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getStatusColor(server.status)}`}>
        <span className="mr-2">{getStatusIcon(server.status)}</span>
        {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span>{server.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Cpu className="h-4 w-4 mr-2 text-gray-400" />
          <span>{server.cpu}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <HardDrive className="h-4 w-4 mr-2 text-gray-400" />
          <span>{server.ram} RAM • {server.storage}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2 text-gray-400" />
          <span>{server.usernames || 'No users specified'}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Operating System</p>
        <p className="text-sm font-medium text-gray-900">{server.operatingSystem}</p>
      </div>

      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-1">Purpose</p>
        <p className="text-sm font-medium text-gray-900">{server.purpose}</p>
      </div>

      {server.notes && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-1">Notes</p>
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">{server.notes}</p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(server.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}