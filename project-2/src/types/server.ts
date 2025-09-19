export interface Server {
  id: string;
  name: string;
  location: string;
  ipAddress: string;
  operatingSystem: string;
  cpu: string;
  ram: string;
  storage: string;
  status: 'online' | 'offline' | 'maintenance';
  purpose: string;
  usernames: string;
  lastUpdated: string;
  notes?: string;
}

export interface ServerFormData {
  name: string;
  location: string;
  ipAddress: string;
  operatingSystem: string;
  cpu: string;
  ram: string;
  storage: string;
  status: 'online' | 'offline' | 'maintenance';
  purpose: string;
  usernames: string;
  notes?: string;
}