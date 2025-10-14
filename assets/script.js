// 1. add task - when click add button, check input value, add record to to do list.
// check date input, if due date is more than one year from today or before today, give a warning message
function checkDueDate() {
    const dueDate = document.getElementById("dueDate");
    const dueDateValue = new Date (dueDate.value);
    const todayDate = new Date();
    const oneYearToday = new Date ();
    oneYearToday.setFullYear(todayDate.getFullYear() + 1);
    if (dueDateValue > oneYearToday) {
        alert ('Warning:Due date is more than one year from today, please check');
        return false;
    }
    if (dueDateValue < todayDate) {
        alert ('Warning:Due date is before today, please check');
        return false;
    }
    return true;
}

// check task detail input, if task detail is less than 6 charaters or already exist in task list, give a warning message
function checkTaskDetail () {
    const taskDetails = document.getElementById("inputTaskDetail");
    const taskDetailsValue = taskDetails.value.trim();
    if (taskDetailsValue.length <= 5) {
        alert ('Warning: Task details must be more than 5 characters, please check');
        return false;
    } else {
        const taskDetailsList = document.querySelectorAll(".task-detail");
        for (let i=0; i < taskDetailsList.length; i++) {
            if(taskDetailsValue.toLowerCase() == taskDetailsList[i].textContent.toLowerCase()) {
            alert ('Warning: Task detail already exists');
            return false;
            }
        }    
        return true;
    }
}

// add a row to the task table, get the last task ID and use next sequential number as task ID
function nextTaskId () {
    const taskIdList = document.querySelectorAll(".task-ID");
    const taskIdValues = []
    for (let i=0; i < taskIdList.length; i++) {
        taskIdValues.push(parseInt(taskIdList[i].textContent))
    };
    let newTaskID = 0
    if (taskIdList.length === 0) {
        newTaskID = 1
    } else { 
        const maxTaskID = Math.max(...taskIdValues);
        newTaskID = maxTaskID+1;
    }
    return newTaskID
}

function addRecord () {
    if(!checkDueDate() || !checkTaskDetail ()) {
        return false;
    };
    const taskID = nextTaskId ();
    const newRecord = document.createElement('tr');
    const dueDate = document.getElementById("dueDate");
    const dueDateValue = new Date(dueDate.value);
    const formattedDueDate = dueDateValue.toLocaleDateString('en-UK');
    const taskDetails = document.getElementById("inputTaskDetail");
    const taskDetailsValue = taskDetails.value.trim();
    newRecord.innerHTML +=`
        <th scope="row" class="task-ID">${taskID}</th>
        <td>${formattedDueDate}</td>
        <td class="task-detail">${taskDetailsValue}</td>
        <td>
            <button class="btn  btn-status btn-sm btn-danger rounded-circle w-75" onclick="changeStatus(this)">No</button>
        </td>
        <td>
            <div class="button-container">
                <button class="btn btn-edit btn-sm btn-primary w-100 deleteButton" onclick="deleteRecord(this)">Delete</button>
            </div>
        </td>
        <td>
            <div class="button-container">
                <button class="btn btn-delete btn-sm btn-primary w-100 editButton" onclick="editRecord(this)">Edit</button>
            </div>
        </td>
    `;
    const taskList = document.getElementById("to-do-list");
    taskList.appendChild(newRecord);
    dueDate.value = '';
    taskDetails.value = '';
}

// add button click trigger, and stop page reload
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", function(e) {
    e.preventDefault();
    addRecord(); 
    }
);

//2. complete toggle(status button) - when click on the button, switch between yes and no, with different background color
function changeStatus(button) {
    if (button.textContent == "Yes") { 
        button.classList.remove("btn-success");
        button.classList.add("btn-danger");
        button.textContent = "No";
    } else { 
        button.classList.remove("btn-danger");
        button.classList.add("btn-success");
        button.textContent = "Yes";
    }
}

// 3. delete button - when click delete button, delete the record from list
function deleteRecord(button) {
    const buttonElement = button.parentElement; 
    const tableElement = buttonElement.parentElement;
    const recordRow = tableElement.parentElement;
    recordRow.remove();
}
// 4. edit button - when click edit button, allow user to update due date and details 
function editRecord(button) {
    const buttonElement = button.parentElement; 
    const tableElement = buttonElement.parentElement;
    const recordRow = tableElement.parentElement;
    editDueDate(recordRow);
    editTaskDetail(recordRow);
}

 // edit due date, check if new date is valid or same as original value.
function editDueDate(recordRow) {
    const dueDate = recordRow.cells[1];
    const newDueDate = prompt ( 'Edit due date: format DD/MM/YYYY:', dueDate.textContent);
    if (newDueDate !== null && newDueDate.trim() !=='') {
        if (newDueDate == dueDate.textContent) {
            alert ('Due date is not changed')
        } else if (validateNewDate(newDueDate.trim())) {
            dueDate.textContent = newDueDate.trim();
            alert('Due date is updated');
        } else {
            alert ('Please enter a valid date in DD/MM/YYYY format');
            editDueDate(recordRow);
        }
    } else {
        alert ('No new due date is filled; due date is not changed');
    }
}

// check if new date is in valid format
function validateNewDate(dateString) {
    const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;
    
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// edit task detail, check if new task detail is same as original value. 
function editTaskDetail(recordRow) {
    const taskDetail = recordRow.cells[2];
    const newTaskDetail = prompt ( 'Edit task detail:', taskDetail.textContent);
    if (newTaskDetail !== null && newTaskDetail.trim() !=='' ) {
        if (newTaskDetail == taskDetail.textContent) {
            alert('Task detail is not changed')
        } else {
            taskDetail.textContent = newTaskDetail.trim();
            alert('Task detail is updated')
        }
    } else {
        alert ('No new task detail is filled; task detail is not changed')
    }
}