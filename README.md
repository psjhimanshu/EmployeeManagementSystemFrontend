<h1>Employee Management System</h1>

## Demo Video - https://youtu.be/SvB5ms25fK4

## FrontEnd Url- https://github.com/psjhimanshu/EmployeeManagementSystemFrontend

## Backend Url- https://github.com/psjhimanshu/EmployeManagementSystemBackend

<h3>Description</h3>

The Employee Management System (EMS) is a full-stack web application designed to manage employee records efficiently. It allows users to perform various operations such as:

CRUD Operations: Create, Read, Update, and Delete employee records.

Search Functionality: Find employees based on criteria like name, department, and designation.

Validation: Ensures proper data entry through frontend validation and backend checks.

This system uses Spring Boot for the backend and React for the frontend, offering a seamless user experience for managing employee data.

<h3>Features</h3>

Create: Add new employee details like name, designation, department, salary, etc.

Read: View all employee records in a list.

Update: Edit employee details as needed.

Delete: Remove an employee record.

Search: Find employees quickly using search filters.

Validation: Ensures all required fields are valid before submission (e.g., name, email, salary).

<h3>Tech Stack</h3>

Frontend: React.js

Backend: Spring Boot (Java)

Database: MySQL (sqlLite)

<h3>Libraries/Tools:</h3>

React Router (for routing)

Axios (for making API requests)

Spring Data JPA / Hibernate (for ORM)

Bootstrap or Material UI (for frontend styling)
# FrontPage
<img width="1908" height="907" alt="image" src="https://github.com/user-attachments/assets/2707799a-8629-4f4c-9120-afd74cfa5567" />

# Add Employee
<img width="1898" height="510" alt="image" src="https://github.com/user-attachments/assets/07417ecb-9137-4cf3-9d49-1c52ceb7bc1b" />

# Edit Employee
<img width="1910" height="796" alt="image" src="https://github.com/user-attachments/assets/575f9920-3c9b-4098-8b8f-9e0a69c11f39" />

# Delete Employee
<img width="1902" height="471" alt="image" src="https://github.com/user-attachments/assets/653164fe-a67d-48c3-80af-7bbc0972e2e2" />

# Search Employee
<img width="1901" height="460" alt="image" src="https://github.com/user-attachments/assets/71da138e-302d-4692-9d10-96a23666bd68" />




<h3>Installation</h3>

Follow these steps to set up the project locally.

<h4>Prerequisites</h4>

Ensure the following are installed:

Java (JDK 11 or later)

Maven (for building the Spring Boot backend)

Node.js and npm (for managing frontend dependencies)

MySQL or any other database system you prefer.

<h3>Backend Setup (Spring Boot)</h3>

1 .Clone the repository:

git clone https://github.com/psjhimanshu/EmployeManagementSystemBackend


2 .Navigate to the backend directory:

cd EmployeManagementSystemBackend


3 .Install dependencies:

mvn install


4 .Configure the database connection in src/main/resources/application.properties or application.yml file:

spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=sqlpassword
spring.jpa.hibernate.ddl-auto=update


5 .Run the Spring Boot application:

mvn spring-boot:run


6 .Your backend will be running on http://localhost:8080.

<h3>Frontend Setup (React)</h3>

1 .Navigate to the frontend directory:

cd EmployeManagementSystemFrontend


2 .Install necessary dependencies:

npm install


3 .Modify API endpoints in the frontend to point to your backend (if necessary). By default, the React app will communicate with the backend running at http://localhost:8080.

4 .Run the React application:

npm start


5 .Your frontend will be running on http://localhost:3000.

<h3>Usage</h3>

Adding a New Employee: Go to the "Add Employee" section in the frontend, enter the employee details, and submit the form to add a new employee.

Viewing Employees: Employees will be listed on the dashboard, where you can see all their details.

Updating Employee Info: Click the "Edit" button next to any employee's record to update their details.

Deleting an Employee: Click the "Delete" button next to any employee to remove them from the system.

Search Employees: Use the search bar to filter employees by name, department, or other criteria.

<h3>Validation</h3>

Frontend Validation: Ensures the data entered is valid (e.g., fields like name, salary, email are required, email follows a valid pattern).

Backend Validation: Ensures that no invalid data can be submitted through the API.

<h3>Contributing</h3>

If you'd like to contribute to the project:

Fork the repository.

Create a new branch:

git checkout -b feature-branch


Make your changes and commit them:

git commit -m 'Add new feature'


Push the changes to your forked repository:

git push origin feature-branch


Create a pull request to merge your changes.

<h3>License</h3>

This project is licensed under the MIT License - see the LICENSE
 file for details.

<h3>Acknowledgements</h3>

Spring Boot
 for building the backend.

React
 for the frontend framework.

MySQL
 or other database used for storing employee data.
