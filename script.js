// Local Storage Keys
const EMPLOYEE_STORAGE_KEY = 'employeeData';
const PROJECT_STORAGE_KEY = 'projectData';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadEmployeeData();
    loadProjectData();
    
    // Set up form event listeners
    document.getElementById('employeeForm').addEventListener('submit', handleEmployeeSubmit);
    document.getElementById('projectForm').addEventListener('submit', handleProjectSubmit);
});

// Employee Form Handler
function handleEmployeeSubmit(event) {
    event.preventDefault();
    
    const empId = document.getElementById('empId').value.trim();
    const empName = document.getElementById('empName').value.trim();
    const empAddress = document.getElementById('empAddress').value.trim();
    
    // Validation
    if (!empId || !empName || !empAddress) {
        alert('Please fill in all employee fields!');
        return;
    }
    
    // Create employee object
    const employee = {
        id: empId,
        name: empName,
        address: empAddress,
        timestamp: new Date().toISOString()
    };
    
    // Get existing data
    let employees = getEmployeesFromStorage();
    
    // Add new employee
    employees.push(employee);
    
    // Save to localStorage
    localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employees));
    
    // Clear form
    document.getElementById('employeeForm').reset();
    
    // Reload display
    loadEmployeeData();
    
    // Show success message (optional)
    showSuccessMessage('Employee added successfully!');
}

// Project Form Handler
function handleProjectSubmit(event) {
    event.preventDefault();
    
    const projectId = document.getElementById('projectId').value.trim();
    const projectName = document.getElementById('projectName').value.trim();
    
    // Validation
    if (!projectId || !projectName) {
        alert('Please fill in all project fields!');
        return;
    }
    
    // Create project object
    const project = {
        id: projectId,
        name: projectName,
        timestamp: new Date().toISOString()
    };
    
    // Get existing data
    let projects = getProjectsFromStorage();
    
    // Add new project
    projects.push(project);
    
    // Save to localStorage
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
    
    // Clear form
    document.getElementById('projectForm').reset();
    
    // Reload display
    loadProjectData();
    
    // Show success message (optional)
    showSuccessMessage('Project added successfully!');
}

// Load Employee Data from localStorage
function loadEmployeeData() {
    const employees = getEmployeesFromStorage();
    const tableBody = document.getElementById('employeeTableBody');
    const table = document.getElementById('employeeTable');
    const emptyMessage = document.getElementById('employeeEmptyMessage');
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    if (employees.length === 0) {
        table.classList.add('hide');
        emptyMessage.classList.add('show');
        return;
    }
    
    table.classList.remove('hide');
    emptyMessage.classList.remove('show');
    
    // Populate table
    employees.forEach((employee, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(employee.id)}</td>
            <td>${escapeHtml(employee.name)}</td>
            <td>${escapeHtml(employee.address)}</td>
            <td><button class="btn-delete" onclick="deleteEmployee(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Load Project Data from localStorage
function loadProjectData() {
    const projects = getProjectsFromStorage();
    const tableBody = document.getElementById('projectTableBody');
    const table = document.getElementById('projectTable');
    const emptyMessage = document.getElementById('projectEmptyMessage');
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    if (projects.length === 0) {
        table.classList.add('hide');
        emptyMessage.classList.add('show');
        return;
    }
    
    table.classList.remove('hide');
    emptyMessage.classList.remove('show');
    
    // Populate table
    projects.forEach((project, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(project.id)}</td>
            <td>${escapeHtml(project.name)}</td>
            <td><button class="btn-delete" onclick="deleteProject(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Delete Employee
function deleteEmployee(index) {
    if (confirm('Are you sure you want to delete this employee record?')) {
        let employees = getEmployeesFromStorage();
        employees.splice(index, 1);
        localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employees));
        loadEmployeeData();
        showSuccessMessage('Employee deleted successfully!');
    }
}

// Delete Project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project record?')) {
        let projects = getProjectsFromStorage();
        projects.splice(index, 1);
        localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects));
        loadProjectData();
        showSuccessMessage('Project deleted successfully!');
    }
}

// Helper Functions
function getEmployeesFromStorage() {
    const data = localStorage.getItem(EMPLOYEE_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function getProjectsFromStorage() {
    const data = localStorage.getItem(PROJECT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showSuccessMessage(message) {
    // Create a temporary success message element
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (successDiv.parentNode) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

// Add CSS animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
