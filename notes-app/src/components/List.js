import NoteStorage from '../utils/Storage.js';

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notesData = [];
  }

  connectedCallback() {
    this.loadNotes();
    document.addEventListener('notes-updated', () => this.loadNotes());
    document.addEventListener('search-note', (event) => this.handleSearch(event));
  }

  loadNotes() {
    this.notesData = NoteStorage.getNotes().filter(note => !note.archived);
    this.render();
  }

  handleSearch(event) {
    const query = event.detail.toLowerCase();
    const allNotes = NoteStorage.getNotes().filter(note => !note.archived);
    
    this.notesData = allNotes.filter(note => 
      note.title.toLowerCase().includes(query) || 
      note.body.toLowerCase().includes(query)
    );
    
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .note-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        .empty-state {
          text-align: center;
          color: #888;
          padding: 2rem;
        }
      </style>
      <div class="note-list">
        ${this.notesData.length > 0 
          ? this.notesData.map(note => `
              <note-item id="${note.id}"></note-item>
            `).join('') 
          : `
            <div class="empty-state" style="grid-column: 1 / -1;">
              <p>No notes found. Create your first note!</p>
            </div>
          `
        }
      </div>
    `;

    // Populate note items
    this.notesData.forEach(note => {
      const noteElement = this.shadowRoot.querySelector(`#${note.id}`);
      if (noteElement) {
        noteElement.note = note;
      }
    });
  }
}

customElements.define("note-list", NoteList);

class NoteArchiveList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notesData = [];
  }

  connectedCallback() {
    this.loadArchivedNotes();
    document.addEventListener('notes-updated', () => this.loadArchivedNotes());
  }

  loadArchivedNotes() {
    this.notesData = NoteStorage.getNotes().filter(note => note.archived);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .archive-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        .empty-state {
          text-align: center;
          color: #888;
          padding: 2rem;
        }
      </style>
      <div class="archive-list">
        ${this.notesData.length > 0 
          ? this.notesData.map(note => `
              <note-item id="${note.id}"></note-item>
            `).join('') 
          : `
            <div class="empty-state" style="grid-column: 1 / -1;">
              <p>No archived notes.</p>
            </div>
          `
        }
      </div>
    `;

    // Populate note items
    this.notesData.forEach(note => {
      const noteElement = this.shadowRoot.querySelector(`#${note.id}`);
      if (noteElement) {
        noteElement.note = note;
      }
    });
  }
}

customElements.define("note-archive-list", NoteArchiveList);

export { NoteList, NoteArchiveList };