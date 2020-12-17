document.addEventListener('DOMContentLoaded', () => {
// const listNames = ['My workday', 'Work', 'Buy food'];
const listNames = {
    'My workday': ['Answer e-mails', 'Meeting', 'Code', 'Study content', 'Report'],
    'My morning': ['Get up', 'Clean teeth', 'Have a breakfast', 'Take a laptop'],
    'Buy food': ['Apples', 'Oranges', 'Potatoes', 'Milk', 'Chicken fillet', 'Coffee', 'Cheese']
};
const listContent = document.querySelector('.dropdown-content');
const listDisplayBtn = document.getElementById('dropbtn');

//render toDoLists
function renderLists() {
    listContent.innerHTML = '';
    
    for (let i = 0; i < Object.keys(listNames).length; i++) {
        let newListItem = document.createElement('span');
        newListItem.classList.add('dropdown-content', 'lists');
        newListItem.innerText = Object.keys(listNames)[i];
        listDisplayBtn.append(newListItem);
    }
}
renderLists();

//add new ToDo list
const addListForm = document.getElementById('list-add-form');
const addListInput = document.getElementById('list-add-input');
addListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    listNames[addListInput.value] = [];
    renderLists();
    displayLists();
    addListForm.reset();
});

//display list properities
function displayLists() {
    const toDoLists = document.querySelectorAll('.lists');
    const listName = document.getElementById('list-name');
    toDoLists.forEach(item => {
        item.addEventListener('click', (e) => {
            listName.innerText = item.innerText;
            renderTasks(listNames, e.target.innerText);
        });
    });
}
displayLists();

});

function renderTasks(object, value) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''
    for (let i = 0; i < object[value].length; i++) {
        let div = document.createElement('div');
        div.innerHTML = `
        <input class ='task-select' type='radio'>
            <span>${object[value][i]}</span>
        <input class ='task-delete' type="submit" value='-'>
        `
        taskList.appendChild(div);
        markTasks();
    }
}

// add task
const taskAddForm = document.getElementById('task-add-form');
const taskAddInput = document.getElementById('task-add-input');
const taskList = document.getElementById('task-list');
taskAddForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newItem = document.createElement('div');
    newItem.innerText = taskAddInput.value;

    taskList.appendChild(`
    <input class ='task-select' type='radio'>
        ${newItem}
    <input class ='task-delete' type="submit" value='-'>
    `);
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
