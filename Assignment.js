const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

taskList.addEventListener('click', (e) => {
    //This is the code for the added list
    const action = e.target.dataset.action;
    const li = e.target.closest('li');

    if (action === 'delete') {
        li.remove();
    } else if (action === 'edit') {
        const taskText = li.querySelector('.task-text').textContent;
        li.innerHTML = `<input type="text" value="${taskText}"><button data-action="save">Save</button>`;
    } else if (action === 'save') {
        const input = li.querySelector('input');
        const newTaskText = input.value.trim();
        if (newTaskText !== '') {
            li.innerHTML = `
                <span class="task-text">${newTaskText}</span>
                <span class="badge">Completed</span>
                <div class="dropdown">
                    <button class="dropdown-button">⋮</button>
                    <div class="dropdown-content">
                        <a href="#" data-action="completed">Completed</a>
                    </div>
                </div>
                <button data-action="edit" class="edit-button">Edit</button>
                <button data-action="delete">Delete</button>
            `;
        }
    } else if (action === 'completed') {
        const badge = li.querySelector('.badge');
        badge.style.display = 'inline-block';
        hideDropdown(li); // Hide the dropdown content
        hideDropdownButton(li); // Hide the dropdown button
    }
});

// Toggle the dropdown content visibility
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-button')) {
        const dropdownContent = e.target.nextElementSibling;
        dropdownContent.classList.toggle('show');
    } else if (!e.target.closest('.dropdown')) {
        // Hide all dropdowns if clicked outside of them
        document.querySelectorAll('.dropdown-content').forEach((dropdown) => {
            dropdown.classList.remove('show');
        });
    }
});

function addTask(taskText) {

    // While clickin addTaskButton this function will call
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span class="badge">Completed</span>
        <div class="dropdown">
            <button class="dropdown-button">⋮</button>
            <div class="dropdown-content">
                <a href="#" data-action="completed">Completed</a>
            </div>
        </div>
        <button data-action="edit" class="edit-button">Edit</button>
        <button data-action="delete">Delete</button>
    `;
    taskList.appendChild(li);
}

function hideDropdown(li) {
    //Hides the dropdown content within a specified list item.

    const dropdownContent = li.querySelector('.dropdown-content');
    if (dropdownContent) {
        dropdownContent.classList.remove('show');
    }
}

function hideDropdownButton(li) {
    
    const dropdownButton = li.querySelector('.dropdown-button');
    if (dropdownButton) {
        dropdownButton.style.display = 'none'; // Hide the dropdown button
    }
}