class NoteStorage {
  static getNotes() {
    return JSON.parse(localStorage.getItem('notesData')) || [];
  }
  
  static saveNotes(notes) {
    localStorage.setItem('notesData', JSON.stringify(notes));
  }
  
  static addNote(note) {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  }
  
  static updateNote(updatedNote) {
    const notes = this.getNotes().map(note => 
      note.id === updatedNote.id ? updatedNote : note
    );
    this.saveNotes(notes);
  }
  
  static deleteNote(noteId) {
    const notes = this.getNotes().filter(note => note.id !== noteId);
    this.saveNotes(notes);
  }
  
  static archiveNote(noteId) {
    const notes = this.getNotes().map(note => 
      note.id === noteId ? {...note, archived: !note.archived} : note
    );
    this.saveNotes(notes);
  }
}

export default NoteStorage;