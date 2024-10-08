const inquirer = require('inquirer');  // For prompting the user
const db = require('./db/server');     // For querying the database
const cTable = require('console.table'); // For displaying results in a table format

// Main menu prompt

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View All Departments':
            await viewDepartments();
            break;
        case 'View All Roles':
            await viewRoles();
            break;
        case 'View All Employees':
            await viewEmployees();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            process.exit();  // Exit the application
    }

    mainMenu();  // Show the main menu again after performing an action
};

// Function to view all departments

const viewDepartments = async () => {
    try {
        const result = await db.query('SELECT * FROM department');
        console.table(result.rows);
    } catch (err) {
        console.error('Error viewing departments:', err);
    }
};

// Function to view all roles

const viewRoles = async () => {
    try {
        const result = await db.query(`
            SELECT roles.id, roles.title, roles.salary, department.name AS department
            FROM roles
            JOIN department ON roles.department_id = department.id
        `);
        console.table(result.rows);
    } catch (err) {
        console.error('Error viewing roles:', err);
    }
};

// Function to view all employees

const viewEmployees = async () => {
    try {
        const result = await db.query(`
            SELECT 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                roles.title AS role, 
                department.name AS department, 
                roles.salary, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
            FROM employee 
            JOIN roles ON employee.role_id = roles.id 
            JOIN department ON roles.department_id = department.id 
            JOIN employee manager ON employee.manager_id = manager.id
        `);
        console.table(result.rows);
    } catch (err) {
        console.error('Error viewing employees:', err);
    }
};

// Function to add a new department

const addDepartment = async () => {
    try {
        const { name } = await inquirer.prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the name of the department:'
        });
        await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
    } catch (err) {
        console.error('Error adding department:', err);
    }
};

// Function to add a new role

const addRole = async () => {
    try {
        const { title, salary, department_id } = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the name of the role:'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary for the role:'
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'Enter the department ID for this role:'
            }
        ]);
        await db.query(
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', 
            [title, salary, department_id]
        );
        console.log(`Added role: ${title}`);
    } catch (err) {
        console.error('Error adding role:', err);
    }
};

// Function to add a new employee

const addEmployee = async () => {
    try {
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the first name of the employee:'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the last name of the employee:'
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'Enter the role ID for the employee:'
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'Enter the manager ID for this employee (leave blank if none):',
                default: null
            }
        ]);
        await db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
            [first_name, last_name, role_id, manager_id]
        );
        console.log(`Added employee: ${first_name} ${last_name}`);
    } catch (err) {
        console.error('Error adding employee:', err);
    }
};

// Function to update an employee's role

const updateEmployeeRole = async () => {
    try {
        const { employee_id, role_id } = await inquirer.prompt([
            {
                name: 'employee_id',
                type: 'input',
                message: 'Enter the employee ID to update:'
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'Enter the new role ID for the employee:'
            }
        ]);
        await db.query(
            'UPDATE employee SET role_id = $1 WHERE id = $2',
            [role_id, employee_id]
        );
        console.log(`Updated employee ID ${employee_id} to role ID ${role_id}`);
    } catch (err) {
        console.error('Error updating employee role:', err);
    }
};

// Start the application by displaying the main menu

mainMenu();
