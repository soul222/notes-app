import NoteStorage from "../utils/Storage.js";

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector("form");
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");

    titleInput.addEventListener("input", () => this.validateInput(titleInput));
    bodyInput.addEventListener("input", () => this.validateInput(bodyInput));

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this.validateForm()) {
        const note = {
          id: `notes-${Date.now()}`,
          title: titleInput.value.trim(),
          body: bodyInput.value.trim(),
          createdAt: new Date().toISOString(),
          archived: false,
        };

        NoteStorage.addNote(note);

        // Dispatch event to update note list
        document.dispatchEvent(new CustomEvent("notes-updated"));

        // Reset form
        form.reset();
        this.resetValidation();
      }
    });
  }

  validateInput(input) {
    const errorElement = this.shadowRoot.querySelector(`#${input.id}-error`);
    const value = input.value.trim();

    if (value === "") {
      errorElement.textContent = `${input.placeholder} is required`;
      input.classList.add("invalid");
      return false;
    }

    if (input.id === "title" && value.length > 50) {
      errorElement.textContent = "Title cannot be longer than 50 characters";
      input.classList.add("invalid");
      return false;
    }

    if (input.id === "body" && value.length > 500) {
      errorElement.textContent =
        "Note content cannot be longer than 500 characters";
      input.classList.add("invalid");
      return false;
    }

    errorElement.textContent = "";
    input.classList.remove("invalid");
    return true;
  }

  validateForm() {
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");

    const isTitleValid = this.validateInput(titleInput);
    const isBodyValid = this.validateInput(bodyInput);

    return isTitleValid && isBodyValid;
  }

  resetValidation() {
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");
    const titleError = this.shadowRoot.querySelector("#title-error");
    const bodyError = this.shadowRoot.querySelector("#body-error");

    titleInput.classList.remove("invalid");
    bodyInput.classList.remove("invalid");
    titleError.textContent = "";
    bodyError.textContent = "";
  }

  render() {
    const formType = this.getAttribute("data-form-type") || "Add Note";

    this.shadowRoot.innerHTML = `
      <style>
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }
    input,
    textarea {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
      resize: none;
    }
    input:focus,
    textarea:focus {
      border-color: var(--secondary);
      outline: none;
    }
    .error-message {
      color: red;
      font-size: 0.875rem;
      margin-top: -0.5rem;
    }
    input.invalid,
    textarea.invalid {
      border-color: red;
    }
    button {
      padding: 0.75rem;
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      border-color: var(--secondary);
    }
    textarea {
      overflow-y: auto;
      max-height: 8rem; /* maximum height */
      padding: 0.5rem;
      transition: height 0.2s ease-in-out; /* smooth height transition */
    }
  </style>
  <form>
    <input type="text" id="title" placeholder="Title" required />
    <div id="title-error" class="error-message"></div>

    <textarea
      id="body"
      rows="4"
      cols="50"
      placeholder="Note Content"
      required
    ></textarea>
    <div id="body-error" class="error-message"></div>

    <button type="submit">${formType}</button>
  </form>
    `;
    const maxHeight = 200;
    const textarea = this.shadowRoot.querySelector("textarea");
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      const newHeight = textarea.scrollHeight;
      if (newHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
      } else {
        textarea.style.height = `${newHeight}px`;
      }
    });
  }
}

customElements.define("note-form", NoteForm);

export default NoteForm;
