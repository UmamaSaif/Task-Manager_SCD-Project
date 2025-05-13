import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Task } from '../types';
import { UserCircle as LoaderCircle } from 'lucide-react';

const initialTaskState: Omit<Task, '_id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  status: 'To Do'
};

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Task, '_id' | 'createdAt' | 'updatedAt'>>(initialTaskState);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const isEditMode = !!id;
  
  useEffect(() => {
    const fetchTask = async () => {
      if (!isEditMode) return;
      
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        const { title, description, status } = res.data;
        setFormData({ title, description, status });
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to load task. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTask();
  }, [id, isEditMode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError('');
      
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/tasks', formData);
      }
      
      navigate('/');
    } catch (err) {
      console.error('Error saving task:', err);
      setError('Failed to save task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoaderCircle className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Task' : 'Create New Task'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? (
                <span className="flex items-center">
                  <LoaderCircle className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                <span>{isEditMode ? 'Update Task' : 'Create Task'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;