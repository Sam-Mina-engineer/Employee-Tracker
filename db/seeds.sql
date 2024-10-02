-- Clear existing data from tables to avoid duplication
TRUNCATE TABLE employee, roles, department RESTART IDENTITY CASCADE;

-- Insert data into the department table
INSERT INTO department (name)
VALUES 
    ('Development'),
    ('Sales'),
    ('Finance'),
    ('Human Resources');

-- Insert data into the roles table
INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Software Developer', 120000, 1), -- Development
    ('Sales Manager', 100000, 2),      -- Sales
    ('Accountant', 90000, 3),          -- Finance
    ('HR Specialist', 65000, 4);       -- Human Resources

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Sam', 'Mina', 1, NULL),       -- Software Developer, no manager (CEO)
    ('John', 'Smith', 2, 1),        -- Sales Manager, reports to Sam
    ('Grace', 'Razko', 3, 1),       -- Accountant, reports to Sam
    ('Betty', 'Hilbert', 4, 1);     -- HR Specialist, reports to Sam
