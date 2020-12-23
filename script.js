document.addEventListener('DOMContentLoaded', () => {
let getLists = JSON.parse(localStorage.getItem('lists'));
if (!getLists) {
    getLists = {}
}

function updateLocalStorage() {
    let serializedLists = JSON.stringify(getLists);
    localStorage.setItem('lists', serializedLists);
}

//render toDoLists
const listContent = document.querySelector('.dropdown-content');
const listDisplayBtn = document.getElementById('dropbtn');

function renderLists() {
    listContent.innerHTML = '';
    if (getLists) {
        for (let i = 0; i < Object.keys(getLists).length; i++) {
            let newListItem = document.createElement('span');
            newListItem.classList.add('dropdown-content', 'lists');
            newListItem.innerText = Object.keys(getLists)[i];
            listDisplayBtn.append(newListItem);
            updateLocalStorage();
        }
    }
    
}
renderLists();

//add new ToDo list
const addListForm = document.getElementById('list-add-form');
const addListInput = document.getElementById('list-add-input');
addListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getLists[addListInput.value] = [];
    updateLocalStorage();
    renderLists();
    addListForm.reset();
    displayLists();
});

//display list properities
function displayLists() {
    const toDoLists = document.querySelectorAll('.lists');
    const listName = document.getElementById('list-name');
    toDoLists.forEach(item => {
        item.addEventListener('click', (e) => {
            listName.innerText = item.innerText;
            renderTasks(getLists, e.target.innerText);
        });
    });
}
displayLists();

function renderTasks(object, value) {
    const taskList = document.getElementById('task-list');
    const listName = document.getElementById('list-name');
    if (listName.classList.contains('text-red')) {
        listName.classList.remove('text-red');
    }
    
    if (taskAddInput.classList.contains('wrong-input')) {
        taskAddInput.classList.remove('wrong-input');
    }
    taskList.innerHTML = ''
    for (let i = 0; i < object[value].length; i++) {
        let div = document.createElement('div');
        div.innerHTML = `
        <input class ='task-select' type='radio'>
            <span>${object[value][i]}</span>
        <input class ='task-delete' type="submit" value='-'>
        `
        taskList.appendChild(div);
    }
    markTasks();
    taskDelete();
}

// add task
const taskAddForm = document.getElementById('task-add-form');
const taskAddInput = document.getElementById('task-add-input');
taskAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentList = document.getElementById('list-name').innerText;
    if (currentList == 'Select ToDo list to manage tasks') {
        const listName = document.getElementById('list-name');
        listName.innerText = 'Select ToDo list before adding tasks';
        listName.classList.add('text-red');
        taskAddInput.classList.add('wrong-input');
        taskAddForm.reset();
    } else {
        getLists[currentList].push(taskAddInput.value);
        updateLocalStorage();
        taskAddForm.reset();
        renderTasks(getLists, currentList);
    }
    

});

// mark tasks as completed
function markTasks() {
    const tasksSelector = document.querySelectorAll('.task-select');

    tasksSelector.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.target.disabled = true;
            e.target.nextElementSibling.style.cssText = 'text-decoration: line-through';
        });
    });
}

//delete tasks
function taskDelete() {
    const taskDeletors = document.querySelectorAll('.task-delete');
    const currentList = document.getElementById('list-name').innerText;
    taskDeletors.forEach((item, i) => {
        item.addEventListener('click', () => {
            item.parentElement.remove();
            getLists[currentList].splice(i, 1);
            updateLocalStorage();
        });
    });
}
});