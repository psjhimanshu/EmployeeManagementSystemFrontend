import React, { useState } from "react";
import './App.css';
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container">
      {/* <h1 className="mt-3">Employee Management</h1> */}
      {/* <AddEmployee onAdded={handleAdded} /> */}
      <EmployeeList key={refresh} />
    </div>
  );
}

export default App;
