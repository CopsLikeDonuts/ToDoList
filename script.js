const listNames = ['My workday', 'Work', 'Buy food'];
const listContent = document.querySelector('.dropdown-content');
const listDisplayBtn = document.getElementById('dropbtn');


function renderLists() {
    while (listContent[0]) {
        listContent.lastElementChild.remove()
    };
// removeChild(select.lastChild)
    
    for (let i = 0; i < listNames.length; i++) {
    
        let newListItem = document.createElement('span');
        newListItem.classList.add('dropdown-content');
        newListItem.innerText = listNames[i];
        listDisplayBtn.append(newListItem);
    }
}
renderLists();


const addListForm = document.getElementById('list-add-form');
const addListInput = document.getElementById('list-add-input');
addListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    listNames.push(addListInput.value);
    renderLists();

})

