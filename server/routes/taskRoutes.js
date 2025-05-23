import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// GET all tasks
router.get('/', getTasks);

// GET a single task
router.get('/:id', getTask);

// POST a new task
router.post('/', createTask);

// UPDATE a task
router.put('/:id', updateTask);

// DELETE a task
router.delete('/:id', deleteTask);

export default router;