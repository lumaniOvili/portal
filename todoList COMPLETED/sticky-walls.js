document.addEventListener('DOMContentLoaded', function() {
    const addNoteButton = document.getElementById('addNoteButton');
    const stickyNotes = document.getElementById('stickyNotes');

    loadNotes();

    addNoteButton.addEventListener('click', function() {
        const noteInput = document.getElementById('noteInput').value;

        if (noteInput) {
            const timestamp = new Date();
            const formattedTimestamp = formatTimestamp(timestamp);

            const stickyNote = createStickyNoteElement(noteInput, formattedTimestamp);
            stickyNotes.appendChild(stickyNote);

            saveNote({
                note: noteInput,
                timestamp: timestamp
            });

            // Clear note input field
            document.getElementById('noteInput').value = '';
        }
    });

    function createStickyNoteElement(note, timestamp) {
        const stickyNote = document.createElement('div');
        stickyNote.classList.add('sticky-note');
        stickyNote.innerHTML = `
            ${note}
            <div class="timestamp">${timestamp}</div>
        `;
        stickyNote.addEventListener('dblclick', function() {
            stickyNote.classList.add('burst');
            setTimeout(() => {
                stickyNotes.removeChild(stickyNote);
                deleteNote(note, timestamp);
            }, 500); // Match this with the CSS transition duration
        });
        return stickyNote;
    }

    function saveNote(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            const formattedTimestamp = formatTimestamp(new Date(note.timestamp));
            const stickyNote = createStickyNoteElement(note.note, formattedTimestamp);
            stickyNotes.appendChild(stickyNote);
        });
    }

    function deleteNote(noteText, timestamp) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note.note !== noteText || formatTimestamp(new Date(note.timestamp)) !== timestamp);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function formatTimestamp(timestamp) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return timestamp.toLocaleDateString('en-US', options);
    }
});
