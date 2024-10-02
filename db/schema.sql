-- Drop the employee table first because it references other tables
DROP TABLE IF EXISTS employee;

-- Drop the roles and department tables
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

-- Create the department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,         -- Unique ID for each department
    name VARCHAR(100) UNIQUE NOT NULL  -- Name of the department, must be unique and not empty
);

-- Create the roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,              -- Unique ID for each role
    title VARCHAR(50) UNIQUE NOT NULL,  -- Role title (example: "Developer"), must be unique and not empty
    salary DECIMAL NOT NULL,            -- Salary for the role
    department_id INTEGER NOT NULL,     -- Foreign key that references the department
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- Create the employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,              -- Unique ID for each employee
    first_name VARCHAR(20) NOT NULL,    -- Employee's first name
    last_name VARCHAR(20) NOT NULL,     -- Employee's last name
    role_id INTEGER NOT NULL,           -- Foreign key that references the employee's role in the roles table
    manager_id INTEGER,                 -- Foreign key that references the employee's manager (nullable). Executive staff won't have managers.
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL  -- Self referencing foreign key for the employee's manager
);
