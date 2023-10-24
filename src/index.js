document.addEventListener("DOMcontentLoaded", () => {
  const form = document.querySelector('#create-task-form');
  const taskList = document.querySelector('#task-list');
  const prioritySelect = document.querySelector('#priority');
  
  let tasks = [];
  
  function render() {
    taskList.innerHTML = '';
  
    for (let task of tasks) {
      const li = document.createElement('li');
      li.textContent = `${task.description} - ${task.user} - ${task.duration} - ${task.dueDate}`;
      li.style.color = task.priority;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        tasks = tasks.filter(t => t !== task);
        render();
      });
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function() {
        const newDescription = prompt('Enter new task description:', task.description);
        if (newDescription !== null) {
          task.description = newDescription;
          render();
        }
      });
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      taskList.appendChild(li);
    }
  }
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const description = document.querySelector('#new-task-description').value;
    const priority = prioritySelect.value;
    const user = document.querySelector('#user').value;
    const duration = document.querySelector('#duration').value;
    const dueDate = document.querySelector('#due-date').value;
  
    tasks.push({ description, priority, user, duration, dueDate });
    render();
    form.reset();
  });
  
  document.querySelector('#sort-asc').addEventListener('click', function() {
    tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    render();
  });
  
  document.querySelector('#sort-desc').addEventListener('click', function() {
    tasks.sort((a, b) => b.priority.localeCompare(a.priority));
    render();
  });
  
  render();
})
