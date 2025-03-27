import './components/Navbar.js';
import './components/Search.js';
import './components/Form.js';
import './components/Items.js';
import { NoteList, NoteArchiveList } from './components/List.js';
import notesData from './utils/notesData.js';
import NoteStorage from './utils/Storage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize notes if localStorage is empty
  if (NoteStorage.getNotes().length === 0) {
    notesData.forEach(note => NoteStorage.addNote(note));
  }
});