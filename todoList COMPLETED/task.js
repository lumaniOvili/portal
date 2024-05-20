document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', function() {
        const taskName = document.getElementById('taskName').value;
        const taskTime = document.getElementById('taskTime').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskPlace = document.getElementById('taskPlace').value;

        if (taskName && taskTime && taskDate && taskPlace) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                ${taskName} @ ${taskTime} || ${taskPlace}<br><sub>${taskDate}</sub>
                <button class="editTaskButton">Edit</button>
                <button class="deleteTaskButton">Delete</button>
            `;
            taskList.appendChild(taskItem);

            saveTask({ name: taskName, time: taskTime, date: taskDate, place: taskPlace });

            // Clear form fields
            document.getElementById('taskName').value = '';
            document.getElementById('taskTime').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('taskPlace').value = '';
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('editTaskButton')) {
            const taskItem = e.target.parentElement;
            editTask(taskItem);
        } else if (e.target.classList.contains('deleteTaskButton')) {
            const taskItem = e.target.parentElement;
            deleteTask(taskItem);
        }
    });

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                ${task.name} @ ${task.time} || ${task.place}<br><sub>${task.date}</sub>
                <button class="editTaskButton">Edit</button>
                <button class="deleteTaskButton">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function editTask(taskItem) {
        const taskText = taskItem.innerHTML.split('<button')[0];
        const [taskNameTimePlace, taskDate] = taskText.split('<br><sub>');
        const [taskNameTime, taskPlace] = taskNameTimePlace.split(' || ');
        const [taskName, taskTime] = taskNameTime.split(' @ ');

        // Fill the form with the current task details
        document.getElementById('taskName').value = taskName.trim();
        document.getElementById('taskTime').value = taskTime.trim();
        document.getElementById('taskDate').value = taskDate.replace('</sub>', '').trim();
        document.getElementById('taskPlace').value = taskPlace.trim();

        // Remove the task item to be edited
        deleteTask(taskItem);
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskText = taskItem.innerHTML.split('<button')[0];
        const [taskNameTimePlace, taskDate] = taskText.split('<br><sub>');
        const [taskNameTime, taskPlace] = taskNameTimePlace.split(' || ');
        const [taskName, taskTime] = taskNameTime.split(' @ ');

        tasks = tasks.filter(task => 
            !(task.name === taskName.trim() && task.time === taskTime.trim() &&
            task.date === taskDate.replace('</sub>', '').trim() && task.place === taskPlace.trim())
        );

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
