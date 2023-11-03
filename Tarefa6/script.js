
const tasks = [];

function addTask() {
    const taskName = document.getElementById('task').value;
    const task = {
        name: taskName,
        creationDate: new Date().toLocaleDateString(),
        complete: false // false representa que a tarefa não foi concluída
    };

    tasks.push(task);
    document.getElementById('task').value = '';
    console.log("Add tasks", tasks)
    displayTasks();
}

function toggleTaskStatus(index) {
    tasks[index].complete = !tasks[index].complete;
    console.log("Toggle tasks", tasks)
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const concludedTasks = document.getElementById('ConcludedTasks');
    concludedTasks.innerHTML = '';
    console.log('Display')
    tasks.forEach((task, index) => {
        if (task.complete) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.creationDate}</td>
                <td><input type="checkbox" onchange="toggleTaskStatus(${index})" ${task.complete ? 'checked' : ''}></td>
            `;
            concludedTasks.appendChild(row);
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.creationDate}</td>
                <td><input type="checkbox" onchange="toggleTaskStatus(${index})" ${task.complete ? 'checked' : ''}></td>
            `;
            taskList.appendChild(row);
        }
    });
}
