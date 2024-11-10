import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      console.log("fetched data", data);
      
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
    if (!showForm) resetForm();
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        course: checked
          ? [...formData.course, value]
          : formData.course.filter((course) => course !== value)
      });
    } else if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const createdDate = new Date().toLocaleDateString();
  
    const employeeData = { ...formData, createdDate };
  
    const formDataObj = new FormData();
  
    Object.keys(employeeData).forEach((key) => {
      if (key === 'course') {
        employeeData[key].forEach((course) => formDataObj.append(key, course));
      } else if (key === 'image') {
        if (employeeData[key]) {
          formDataObj.append(key, employeeData[key]);
        }
      } else if (employeeData[key]) {
        formDataObj.append(key, employeeData[key]);
      }
    });
  
    try {
        console.log("form data before sending",formDataObj);
        
      const url = isEditMode
        ? `http://localhost:5000/api/employees/${editId}`
        : 'http://localhost:5000/api/employees';
  
      const method = isEditMode ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method: method,
        body: formDataObj,
      });
  
      if (response.ok) {
        fetchEmployees();
        handleToggleForm();
      } else {
        console.error('Error submitting form:', await response.json());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    setEditId(id);
    setFormData(employee);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, { method: 'DELETE' });
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      designation: '',
      gender: '',
      course: [],
      image: null
    });
    setIsEditMode(false);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Employee List</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleToggleForm}>
              {showForm ? 'Close Form' : 'Add Employee'}
            </button>
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            className="mb-4 p-2 border rounded w-full"
            onChange={handleSearch}
            value={searchQuery}
          />

          {showForm && (
            <div className="bg-white shadow rounded-lg p-6 mb-4">
              <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label>Mobile No.:</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                  <div>
                    <label>Designation:</label>
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="p-2 border rounded w-full"
                      required
                    >
                      <option value="">Select</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                  <div>
                    <label>Gender:</label>
                    <div className="flex items-center">
                      <label className="mr-2">
                        <input
                          type="radio"
                          name="gender"
                          value="M"
                          checked={formData.gender === 'M'}
                          onChange={handleChange}
                          required
                        />{' '}
                        Male
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="F"
                          checked={formData.gender === 'F'}
                          onChange={handleChange}
                          required
                        />{' '}
                        Female
                      </label>
                    </div>
                  </div>
                  <div>
                    <label>Course:</label>
                    <div className="flex items-center">
                      <label className="mr-2">
                        <input
                          type="checkbox"
                          name="course"
                          value="MCA"
                          checked={formData.course.includes('MCA')}
                          onChange={handleChange}
                        />{' '}
                        MCA
                      </label>
                      <label className="mr-2">
                        <input
                          type="checkbox"
                          name="course"
                          value="BCA"
                          checked={formData.course.includes('BCA')}
                          onChange={handleChange}
                        />{' '}
                        BCA
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="course"
                          value="BSC"
                          checked={formData.course.includes('BSC')}
                          onChange={handleChange}
                        />{' '}
                        BSC
                      </label>
                    </div>
                  </div>
                  <div>
                    <label>Image:</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/jpeg, image/png"
                      onChange={handleChange}
                      className="p-2 border rounded w-full"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded mr-2" onClick={handleToggleForm}>
                    Cancel
                  </button>
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    {isEditMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg p-6">
            <table className="w-full">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      {employee.image && (
                        <img
                          src={`http://localhost:5000/${employee.image}`}   
                          alt={employee.name}
                          className="w-12 h-12 rounded-full"
                        />
                      )}
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                    <td>{employee.course.join(', ')}</td>
                    <td>{employee.createdDate}</td>
                    <td>
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(employee._id)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(employee._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
