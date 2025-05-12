import { Link } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-800">Task Manager</span>
          </Link>
          <Link
            to="/tasks/new"
            className="btn btn-primary flex items-center"
          >
            <span>Add Task</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;