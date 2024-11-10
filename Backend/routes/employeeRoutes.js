import express from 'express';
import { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import upload from '../middleware/upload.js';

const router = express.Router();


router.get('/', getEmployees);
router.post('/', upload.single('image'), createEmployee);
router.get('/:id', getEmployeeById);
router.put('/:id', upload.single('image'), updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
