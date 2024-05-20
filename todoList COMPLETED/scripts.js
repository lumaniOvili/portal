document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const upcomingTaskList = document.getElementById('upcomingTaskList');
    const addNoteButton = document.getElementById('addNoteButton');
    const stickyNotes = document.getElementById('stickyNotes');

    // Load tasks and notes from localStorage on page load
    loadTasks();
    loadNotes();

    addTaskButton.addEventListener('click', function() {
        const taskName = document.getElementById('taskName').value;
        const taskTime = document.getElementById('taskTime').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskPlace = document.getElementById('taskPlace').value;

        console.log('Add Task button clicked');
        console.log('Task details:', taskName, taskTime, taskDate, taskPlace);

        if (taskName && taskTime && taskDate && taskPlace) {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `${taskName} @ ${taskTime} || ${taskPlace}<br><sub>${taskDate}</sub>`;
            taskList.appendChild(taskItem);
            
            // Save task to local storage
            saveTask({ name: taskName, time: taskTime, date: taskDate, place: taskPlace });

            const today = new Date().toISOString().split('T')[0];
            if (taskDate === today) {
                const upcomingTaskItem = document.createElement('li');
                upcomingTaskItem.innerHTML = taskItem.innerHTML;
                upcomingTaskList.appendChild(upcomingTaskItem);
            }

            // Clear form fields
            document.getElementById('taskName').value = '';
            document.getElementById('taskTime').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('taskPlace').value = '';
        } else {
            console.error('Please fill out all fields');
        }
    });

    addNoteButton.addEventListener('click', function() {
        const noteInput = document.getElementById('noteInput').value;
        console.log('Add Note button clicked');
        console.log('Note content:', noteInput);

        if (noteInput) {
            const stickyNote = document.createElement('div');
            stickyNote.classList.add('sticky-note');
            stickyNote.innerText = noteInput;
            stickyNotes.appendChild(stickyNote);

            // Save note to local storage
            saveNote(noteInput);

            // Clear note input field
            document.getElementById('noteInput').value = '';
        } else {
            console.error('Note input is empty');
        }
    });

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Task saved:', task);
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('Loaded tasks from localStorage:', tasks);
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `${task.name} @ ${task.time} || ${task.place}<br><sub>${task.date}</sub>`;
            taskList.appendChild(taskItem);

            const today = new Date().toISOString().split('T')[0];
            if (task.date === today) {
                const upcomingTaskItem = document.createElement('li');
                upcomingTaskItem.innerHTML = taskItem.innerHTML;
                upcomingTaskList.appendChild(upcomingTaskItem);
            }
        });
    }

    function saveNote(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        console.log('Note saved:', note);
    }

    function loadNotes() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        console.log('Loaded notes from localStorage:', notes);
        notes.forEach(note => {
            const stickyNote = document.createElement('div');
            stickyNote.classList.add('sticky-note');
            stickyNote.innerText = note;
            stickyNotes.appendChild(stickyNote);
        });
    }
});
