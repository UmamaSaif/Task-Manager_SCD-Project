export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  createdAt: string;
  updatedAt: string;
}