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
                <button class="btn btn-edit btn-sm btn-primary w-100 deleteButton">Delete</button>
            </div>
        </td>
        <td>
            <div class="button-container">
                <button class="btn btn-delete btn-sm btn-primary w-100 editButton">Edit</button>
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

// 3. delete button
// when click delete button, delete the record from list

// 4. edit button
// when click edit button, allow user to update due date and/or details 
