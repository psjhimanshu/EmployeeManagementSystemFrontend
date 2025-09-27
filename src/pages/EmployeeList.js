import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const filteredEmployees = employees.filter(emp =>
  emp.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:8080/api/employees");
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:8080/api/employees/${id}`);
    fetchEmployees();
  };

   const startEdit = (emp) => {
    setEditingEmployee(emp); // modal kholne ke liye employee set karo
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:8080/api/employees/${editingEmployee.id}`, editingEmployee);
    setEditingEmployee(null);
    fetchEmployees();
  };

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
       <input
      type="text"
      placeholder="Search employees by name..."
      className="form-control mb-3"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>
<button
                  className="btn btn-warning btn-sm"
                  onClick={() => startEdit(emp)}
                >
                  Edit
                </button>                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => deleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* EDIT MODAL */}
      {editingEmployee && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee</h5>
                <button type="button" className="btn-close" onClick={() => setEditingEmployee(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editingEmployee.name}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  value={editingEmployee.email}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editingEmployee.position}
                  onChange={(e) =>
                    setEditingEmployee({ ...editingEmployee, position: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingEmployee(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
