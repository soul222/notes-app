import NoteStorage from '../utils/Storage.js';

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set note(note) {
    this.noteData = note;
    this.render();
  }

  render() {
    const note = this.noteData;
    const createdAt = new Date(note.createdAt).toLocaleString();

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css');
        .note-card {
          background: white;
          border: 1px solid #e8e6e6;
          padding: 1rem;
          border-radius: 8px;
          position: relative;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .note-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transform: translateY(-5px);
        }
        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
        }
        p {
          font-size: 1rem;
          margin: 0.5rem 0;
          white-space: pre-wrap;
        }
        .created-at {
          font-size: 0.85rem;
          color: #777;
          display: block;
          margin-top: 0.5rem;
        }
        .note-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }
        .note-actions button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          transition: color 0.3s;
        }
        .note-actions .archive-btn {
          color: green;
        }
        .note-actions .delete-btn {
          color: red;
        }
      </style>
      <div class="note-card">
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <span class="created-at">Created on: ${createdAt}</span>
        <div class="note-actions">
          <button class="archive-btn" title="Archive">
            <i class="bi bi-archive"></i>
          </button>
          <button class="delete-btn" title="Delete">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;

    // Archive Event Handler
    this.shadowRoot.querySelector(".archive-btn").addEventListener("click", () => {
      NoteStorage.archiveNote(note.id);
      document.dispatchEvent(new CustomEvent('notes-updated'));
    });

    // Delete Event with SweetAlert confirmation
    this.shadowRoot.querySelector(".delete-btn").addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "This note will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--success)",
        cancelButtonColor: "var(--danger)",
        confirmButtonText: "Yes, delete!"
      }).then((result) => {
        if (result.isConfirmed) {
          NoteStorage.deleteNote(note.id);
          document.dispatchEvent(new CustomEvent('notes-updated'));
        }
      });
    });
  }
}

customElements.define("note-item", NoteItem);

export default NoteItem;