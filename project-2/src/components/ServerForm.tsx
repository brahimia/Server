import React, { useState, useEffect } from 'react';
import { Server, ServerFormData } from '../types/server';
import { X } from 'lucide-react';

interface ServerFormProps {
  server?: Server;
  onSubmit: (data: ServerFormData) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function ServerForm({ server, onSubmit, onCancel, isOpen }: ServerFormProps) {
  const [formData, setFormData] = useState<ServerFormData>({
    name: '',
    location: '',
    ipAddress: '',
    operatingSystem: '',
    cpu: '',
    ram: '',
    storage: '',
    status: 'offline',
    purpose: '',
    usernames: '',
    notes: ''
  });

  useEffect(() => {
    if (server) {
      setFormData({
        name: server.name,
        location: server.location,
        ipAddress: server.ipAddress,
        operatingSystem: server.operatingSystem,
        cpu: server.cpu,
        ram: server.ram,
        storage: server.storage,
        status: server.status,
        purpose: server.purpose,
        usernames: server.usernames,
        notes: server.notes || ''
      });
    } else {
      setFormData({
        name: '',
        location: '',
        ipAddress: '',
        operatingSystem: '',
        cpu: '',
        ram: '',
        storage: '',
        status: 'offline',
        purpose: '',
        usernames: '',
        notes: ''
      });
    }
  }, [server, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {server ? 'Edit Server' : 'Add New Server'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Server Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Enter server name"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="e.g., Data Center A, Rack 12"
              />
            </div>

            <div>
              <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 mb-2">
                IP Address *
              </label>
              <input
                type="text"
                id="ipAddress"
                name="ipAddress"
                required
                value={formData.ipAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="192.168.1.100"
              />
            </div>

            <div>
              <label htmlFor="operatingSystem" className="block text-sm font-medium text-gray-700 mb-2">
                Operating System *
              </label>
              <input
                type="text"
                id="operatingSystem"
                name="operatingSystem"
                required
                value={formData.operatingSystem}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Ubuntu 22.04 LTS"
              />
            </div>

            <div>
              <label htmlFor="cpu" className="block text-sm font-medium text-gray-700 mb-2">
                CPU *
              </label>
              <input
                type="text"
                id="cpu"
                name="cpu"
                required
                value={formData.cpu}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="Intel Xeon E5-2690 v4"
              />
            </div>

            <div>
              <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-2">
                RAM *
              </label>
              <input
                type="text"
                id="ram"
                name="ram"
                required
                value={formData.ram}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="64GB DDR4"
              />
            </div>

            <div>
              <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-2">
                Storage *
              </label>
              <input
                type="text"
                id="storage"
                name="storage"
                required
                value={formData.storage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                placeholder="2TB NVMe SSD"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
              Purpose *
            </label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              required
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Web Server, Database Server, etc."
            />
          </div>

          <div>
            <label htmlFor="usernames" className="block text-sm font-medium text-gray-700 mb-2">
              Usernames
            </label>
            <input
              type="text"
              id="usernames"
              name="usernames"
              value={formData.usernames}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="admin, user1, user2 (comma-separated)"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Additional notes or comments..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {server ? 'Update Server' : 'Add Server'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}