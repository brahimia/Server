import React, { useState, useEffect } from 'react';
import { Server, ServerFormData } from '../types/server';
import { ServerCard } from './ServerCard';
import { ServerForm } from './ServerForm';
import { Search, Plus, Filter, Server as ServerIcon } from 'lucide-react';

export function Dashboard() {
  const [servers, setServers] = useState<Server[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline' | 'maintenance'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<Server | undefined>();

  useEffect(() => {
    const storedServers = localStorage.getItem('servers');
    if (storedServers) {
      setServers(JSON.parse(storedServers));
    } else {
      // Sample data for demonstration
      const sampleServers: Server[] = [
        {
          id: '1',
          name: 'Web Server 01',
          location: 'Data Center A - Rack 12',
          ipAddress: '192.168.1.100',
          operatingSystem: 'Ubuntu 22.04 LTS',
          cpu: 'Intel Xeon E5-2690 v4 (14 cores)',
          ram: '64GB DDR4',
          storage: '2TB NVMe SSD',
          status: 'online',
          purpose: 'Primary web server for production applications',
          usernames: 'admin, webmaster, deploy',
          lastUpdated: new Date().toISOString(),
          notes: 'Recently upgraded with additional memory modules'
        },
        {
          id: '2',
          name: 'Database Server 01',
          location: 'Data Center A - Rack 15',
          ipAddress: '192.168.1.101',
          operatingSystem: 'CentOS 8',
          cpu: 'AMD EPYC 7742 (64 cores)',
          ram: '128GB DDR4',
          storage: '4TB NVMe SSD RAID 10',
          status: 'online',
          purpose: 'Primary database server (PostgreSQL cluster)',
          usernames: 'admin, dbadmin, backup',
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          notes: 'Configured with automated backups every 6 hours'
        },
        {
          id: '3',
          name: 'Dev Server 01',
          location: 'Data Center B - Rack 5',
          ipAddress: '192.168.2.50',
          operatingSystem: 'Ubuntu 20.04 LTS',
          cpu: 'Intel Core i7-10700K (8 cores)',
          ram: '32GB DDR4',
          storage: '1TB SATA SSD',
          status: 'maintenance',
          purpose: 'Development and testing environment',
          usernames: 'admin, developer, tester',
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          notes: 'Scheduled for OS upgrade to Ubuntu 22.04'
        }
      ];
      setServers(sampleServers);
      localStorage.setItem('servers', JSON.stringify(sampleServers));
    }
  }, []);

  const saveServers = (updatedServers: Server[]) => {
    setServers(updatedServers);
    localStorage.setItem('servers', JSON.stringify(updatedServers));
  };

  const handleAddServer = (data: ServerFormData) => {
    const newServer: Server = {
      id: Date.now().toString(),
      ...data,
      lastUpdated: new Date().toISOString()
    };
    const updatedServers = [...servers, newServer];
    saveServers(updatedServers);
    setIsFormOpen(false);
  };

  const handleEditServer = (data: ServerFormData) => {
    if (!editingServer) return;
    
    const updatedServer: Server = {
      ...editingServer,
      ...data,
      lastUpdated: new Date().toISOString()
    };
    const updatedServers = servers.map(server => 
      server.id === editingServer.id ? updatedServer : server
    );
    saveServers(updatedServers);
    setEditingServer(undefined);
    setIsFormOpen(false);
  };

  const handleDeleteServer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this server?')) {
      const updatedServers = servers.filter(server => server.id !== id);
      saveServers(updatedServers);
    }
  };

  const openEditForm = (server: Server) => {
    setEditingServer(server);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingServer(undefined);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingServer(undefined);
  };

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.ipAddress.includes(searchTerm) ||
                         server.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.usernames.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || server.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      total: servers.length,
      online: servers.filter(s => s.status === 'online').length,
      offline: servers.filter(s => s.status === 'offline').length,
      maintenance: servers.filter(s => s.status === 'maintenance').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <ServerIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Server Dashboard</h1>
                <p className="text-gray-600">Manage and monitor your server infrastructure</p>
              </div>
            </div>
            <button
              onClick={openAddForm}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>Add Server</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Servers</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <ServerIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Online</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.online}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-xl text-green-600">●</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.offline}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-xl text-red-600">●</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-amber-600">{statusCounts.maintenance}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <span className="text-xl text-amber-600">◐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search servers by name, location, IP, purpose, or usernames..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Server Grid */}
        {filteredServers.length === 0 ? (
          <div className="text-center py-12">
            <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No servers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Get started by adding your first server.'
              }
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <div className="mt-6">
                <button
                  onClick={openAddForm}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Server</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredServers.map(server => (
              <ServerCard
                key={server.id}
                server={server}
                onEdit={openEditForm}
                onDelete={handleDeleteServer}
              />
            ))}
          </div>
        )}
      </div>

      {/* Server Form Modal */}
      <ServerForm
        server={editingServer}
        onSubmit={editingServer ? handleEditServer : handleAddServer}
        onCancel={closeForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}