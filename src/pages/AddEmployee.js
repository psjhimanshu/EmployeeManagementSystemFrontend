import React, { useState } from "react";
import axios from "axios";

const AddEmployee = ({ onAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState({});


const validateForm = () => {
  let formErrors = {};
  if (!name) formErrors.name = "Name is required";
  if (!email) formErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Invalid email format";
  if (!position) formErrors.position = "Position is required";
  setErrors(formErrors);
  return Object.keys(formErrors).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm){
        return;
    }
    await axios.post("http://localhost:8080/api/employees", {
      name,
      email,
      position,
    });
    onAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
      </div>
      <div className="mb-2">
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Position"
          className="form-control"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
      </div>
      <button className="btn btn-primary">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
