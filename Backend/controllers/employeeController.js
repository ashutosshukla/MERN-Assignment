import Employee from '../models/employeeModel.js'

// Create new employee
export const createEmployee = async (req, res) => {
    console.log(("create employee is called"));
    
  try {
    const { name, email, mobile, designation, gender, course, createdDate } = req.body;
    const image = req.file.path;
    console.log("data from body",req.body);
    console.log("data from file",req.file);
    
    
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image,
      createdDate,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee: ' + error.message });
  }
};

// Get all employees

export const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find();
  
      // Normalize the image paths to use forward slashes
      const employeesWithNormalizedPaths = employees.map(employee => {
        employee.image = employee.image.replace(/\\/g, '/'); // Replace backslashes with forward slashes
        return employee;
      });
  
      res.status(200).json(employeesWithNormalizedPaths); // Return employees with normalized paths
    } catch (error) {
      console.error('Error fetching employees:', error.message);
      res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
  };
  

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee: ' + error.message });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file ? req.file.path : req.body.image;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;
    employee.image = image || employee.image;

    await employee.save();
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee: ' + error.message });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
    console.log("delete is called", req.params);

    const { id } = req.params;
    try {
        // Attempt to delete the employee by ID
        const result = await Employee.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting employee: ' + error.message });
    }
};

