// Grab elements
const projectForm = document.getElementById('projectForm');
const projectTableBody = document.getElementById('projectTableBody');
const inputTextTitle = document.getElementById('projectName');
const inputTextTask = document.getElementById('taskAdd');
const inputTextMember = document.getElementById('memberName');
const inputTextDeadline = document.getElementById('deadline');
const uniqueId = generateUniqueId(); 

let editingRow = null; // Variable to track the row being edited

// Function to generate a unique ID based on the current date and time
function generateUniqueId() {
    const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
    return `${timestamp}`; 
}

// Function to add a new project task to the table
function addRowToTable(projectName, task, assignedMembers, deadline) {

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${uniqueId}</td>
        <td>${projectName}</td>
        <td>${task}</td>
        <td>${assignedMembers}</td>
        <td>${deadline}</td>
        <td>
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
    projectTableBody.appendChild(newRow);
}

// Function to handle form submission and add data to table
projectForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    
    const projectName = inputTextTitle.value;
    const task = inputTextTask.value;
    const assignedMembers = inputTextMember.value;
    const deadline = inputTextDeadline.value;

    // Add row to the table
    addRowToTable(projectName, task, assignedMembers, deadline);

    // Reset the form after adding
    projectForm.reset();
});

// Function to edit a row (called when Edit button is clicked)
function editRow(button) {
    // Get the row containing the button
    const row = button.closest('tr');

    // Fill the form inputs with the current data from the row
    inputTextTitle.value = row.cells[1].textContent;
    inputTextTask.value = row.cells[2].textContent;
    inputTextMember.value = row.cells[3].textContent;
    inputTextDeadline.value = row.cells[4].textContent;

    // Set the row to be edited
    editingRow = row;

    // Change the action buttons for the row to "Update" and "Cancel"
    row.cells[5].innerHTML = `
        <button onclick="updateRow(this)">Update</button>
        <button onclick="cancelEdit()">Cancel</button>
    `;
}

// Function to update a row (called when Update button is clicked)
function updateRow(button) {
    if (!editingRow) return;

    // Update the row data with the new values from the form
    editingRow.cells[1].textContent = inputTextTitle.value;
    editingRow.cells[2].textContent = inputTextTask.value;
    editingRow.cells[3].textContent = inputTextMember.value;
    editingRow.cells[4].textContent = inputTextDeadline.value;

    // Reset the action buttons back to "Edit" and "Delete"
    editingRow.cells[5].innerHTML = `
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
    `;

    // Clear the form and reset editingRow
    projectForm.reset();
    editingRow = null;
}

// Function to cancel editing (called when Cancel button is clicked)
function cancelEdit() {
    // Reset the action buttons for the row back to "Edit" and "Delete"
    if (editingRow) {
        editingRow.cells[5].innerHTML = `
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        `;
    }

    // Clear the form
    projectForm.reset();
    editingRow = null;
}

// Function to delete a row (called when Delete button is clicked)
function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
}
