import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', position: '', salary: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('https://crud-2-backend.onrender.com/api/employees', authHeader);
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingId) {
        await axios.put(`https://crud-2-backend.onrender.com/api/employees/${editingId}`, form, authHeader);
        setSuccess('Employee updated successfully');
      } else {
        await axios.post('https://crud-2-backend.onrender.com/api/employees', form, authHeader);
        setSuccess('Employee added successfully');
      }
      setForm({ name: '', email: '', position: '', salary: '' });
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = emp => {
    setForm({ name: emp.name, email: emp.email, position: emp.position, salary: emp.salary });
    setEditingId(emp._id);
  };

  const handleDelete = async id => {
    setError('');
    setSuccess('');
    try {
      await axios.delete(`https://crud-2-backend.onrender.com/api/employees/${id}`, authHeader);
      setSuccess('Employee deleted successfully');
      fetchEmployees();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: '', email: '', position: '', salary: '' });
  };

  return (
    <div className="employee-manager">
      <h3>{editingId ? 'Edit Employee' : 'Add Employee'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
        <input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required type="number" min="0" />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
      <h3>Employees</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeManager;
