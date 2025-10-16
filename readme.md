This repository is for week 4 challenge "Interactive TODO List". In this challeage, a webpage created using bootsrap, and javascript is used for creating interactions. 

The webpage has two main sections:
1. add task section - this section has two mandatory input areas (task due date and task detail) that allow user to add a new task.
2. task overview section - this section allow users to view all task on the to do list, view and update task status, delete a task, and edit task due date and detail.

When creating a new task, the script will check if input due date is before today or more than one year from today; the script will also check if the input task detail is empty or match any task details that are already in the task list.

When changing a task status, a button will show yes/no with green/red backgound. 

When deleting a task, the whole row will be removed from the task list.

When editing a task, users will be asked to change due date first, then the task detail. All inputs are validated to ensure they are not empty and match the required format. Users are notified if they attempt to save a value that is identical to the original.

Webpage live link: https://zg1203.github.io/p4_interactive_todo_list/