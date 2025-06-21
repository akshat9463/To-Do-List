let input = document.getElementById("taskInput");
let btn = document.getElementById("addTaskBtn");
let ul = document.getElementById("taskList");

// load task from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// add  a task
btn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText !== '') {
    tasks.push(taskText);
    input.value = '';
    saveAndRender();
  }
});

// delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// save to localStorage and render
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// rendering tasks
function renderTasks() {
  ul.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>${task}</div>
      <div><button onclick="deleteTask(${index})">Delete</button>
      <button onclick="editTask(${index})">Edit</button></div>
    `;
    ul.appendChild(li);
  });
}

// edit task 
function editTask(index) {
  const li = ul.children[index];
  const taskText = tasks[index];

  // Replace span with input field
  li.innerHTML = `
    <input type="text" id="editInput${index}" value="${taskText}">
    <button onclick="saveTask(${index})">Save</button>
    <button onclick="renderTasks()">Cancel</button>
  `;
}

// save task
function saveTask(index) {
  const editedValue = document.getElementById(`editInput${index}`).value.trim();
  if (editedValue !== '') {
    tasks[index] = editedValue;
    saveAndRender();
  }
}
