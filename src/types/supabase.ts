export interface Environment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production';
  projectRef: string;
  apiKey: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'contributor';
  avatarUrl?: string;
}

export interface DatabaseStats {
  size: number;
  tableCount: number;
  rowCount: number;
  lastBackup?: string;
}

export interface StorageStats {
  size: number;
  bucketCount: number;
  fileCount: number;
}

export interface Quota {
  type: string;
  limit: number;
  used: number;
  percentage: number;
}