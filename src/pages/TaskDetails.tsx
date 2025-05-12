import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Task } from '../types';
import TaskStatusBadge from '../components/tasks/TaskStatusBadge';
import { UserCircle as LoaderCircle, ArrowLeft, Edit, Trash2 } from 'lucide-react';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to load task. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTask();
  }, [id]);
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      setDeleting(true);
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
      setDeleting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoaderCircle className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }
  
  if (!task) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        Task not found.
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Tasks
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
            <TaskStatusBadge status={task.status} />
          </div>
          
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {task.description || 'No description provided.'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Created
              </h2>
              <p className="text-gray-700">
                {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Last Updated
              </h2>
              <p className="text-gray-700">
                {new Date(task.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Link
              to={`/tasks/${task._id}/edit`}
              className="btn btn-secondary flex items-center"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="btn btn-danger flex items-center"
            >
              {deleting ? (
                <LoaderCircle className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-1" />
              )}
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;