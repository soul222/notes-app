import "./components/Items.js";
import "./components/List.js";
import "./components/Form.js";
import "./components/Navbar.js";
import "./components/Search.js";
import notesData from "./utils/Storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const noteList = document.querySelector("note-list");
  const noteSearch = document.querySelector("note-search");

  const savedNotes = JSON.parse(localStorage.getItem("notesData")) || notesData;
  noteList.notes = savedNotes;

  const noteForm = document.querySelector("note-form");
  noteForm.addEventListener("add-note", (e) => {
    noteList.handleAdd(e);
  });

  noteSearch.addEventListener("search-note", (e) => {
    noteList.handleSearch(e);
  });
});
