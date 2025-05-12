import { Check, Clock, AlertCircle } from 'lucide-react';

interface TaskStatusBadgeProps {
  status: string;
}

const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
  const getStatusClass = () => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Completed':
        return <Check className="h-4 w-4" />;
      case 'In Progress':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <span 
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass()}`}
    >
      {getStatusIcon()}
      {status}
    </span>
  );
};

export default TaskStatusBadge;