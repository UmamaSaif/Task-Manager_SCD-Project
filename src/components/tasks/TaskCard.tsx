import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Check, AlertCircle, Clock } from 'lucide-react';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task._id);
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'Completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusClass = () => {
    switch (task.status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {task.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusClass()}`}>
            {getStatusIcon()}
            {task.status}
          </span>
        </div>
        
        <p className="text-gray-600 line-clamp-2 mb-4">
          {task.description || 'No description provided.'}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex space-x-2">
            <Link 
              to={`/tasks/${task._id}/edit`}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Edit task"
            >
              <Edit className="h-5 w-5 text-gray-600" />
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50"
              aria-label="Delete task"
            >
              <Trash2 className="h-5 w-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;