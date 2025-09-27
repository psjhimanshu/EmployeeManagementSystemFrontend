import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", position: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:8080/api/employees");
    setEmployees(res.data);
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
  if (!confirmDelete) return;

    await axios.delete(`http://localhost:8080/api/employees/${id}`);
    fetchEmployees();
  };

  const handleDeleteAll = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete ALL employees? This action cannot be undone.");
  if (!confirmDelete) return;

  try {
    await axios.delete("http://localhost:8080/api/employees");
    fetchEmployees();
  } catch (err) {
    alert("Failed to delete all employees. Please try again.");
  }
};
  const handleUpdate = async () => {
    await axios.put(`http://localhost:8080/api/employees/${editingEmployee.id}`, editingEmployee);
    setEditingEmployee(null);
    fetchEmployees();
  };

 const validateForm = () => {
  let formErrors = {};

  const alphabetRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    newEmployee.email = newEmployee.email.toLowerCase();


  if (!newEmployee.name.trim()) {
    formErrors.name = "Name is required";
  } else if (newEmployee.name.length < 3) {
    formErrors.name = "Name must be at least 3 characters long";
  } else if (!alphabetRegex.test(newEmployee.name.trim())) {
    formErrors.name = "Name must contain only alphabets and spaces";
  }


 if (!newEmployee.email.trim()) {
    formErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email.trim())) {
    formErrors.email = "Invalid email format";
  } else if (employees.some(emp => emp.email.toLowerCase() === newEmployee.email.trim().toLowerCase())) {
    formErrors.email = "This email is already in use";
  }

  
  if (!newEmployee.position.trim()) {
    formErrors.position = "Position is required";
  } else if (newEmployee.position.length < 2) {
    formErrors.position = "Position must be at least 2 characters";
  } else if (!alphabetRegex.test(newEmployee.position.trim())) {
    formErrors.position = "Position must contain only alphabets and spaces";
  }

  setErrors(formErrors);
  return Object.keys(formErrors).length === 0;
};


  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await axios.post("http://localhost:8080/api/employees", newEmployee);
    setShowAddModal(false);
    setNewEmployee({ name: "", email: "", position: "" });
    fetchEmployees();
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Employee Management System</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Employee List</h4>
      </div>
<div className="d-flex align-items-center mb-3 flex-wrap gap-2">
    <div style={{ flex: 1, marginRight: "10px" }}>
      <input
        type="text"
        placeholder="Search employees by name..."
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      <div className="d-flex align-items-center gap-2">
      <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          Add New Employee
        </button>
        <button
  className="btn btn-danger"
  onClick={handleDeleteAll}
  disabled={employees.length === 0}
>
  Delete All
</button>
</div>
</div>
 <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <table className="table table-striped table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...filteredEmployees].reverse().map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => setEditingEmployee(emp)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleAddSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Add Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}

                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value.toLowerCase() })}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Position"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                />
                {errors.position && <p className="text-danger">{errors.position}</p>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)} type="button">Cancel</button>
                <button className="btn btn-primary" type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                    setEditingEmployee({ ...editingEmployee, email: e.target.value.toLowerCase() })
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
