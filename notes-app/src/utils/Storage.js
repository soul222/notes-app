// const STORAGE_KEY = "BOOKSHELF_APPS";

// const StorageUtils = {
//   save(books) {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
//     } catch (error) {
//       console.error("Error saving to localStorage:", error);
//     }
//   },

//   load() {
//     try {
//       const serializedData = localStorage.getItem(STORAGE_KEY);
//       return serializedData ? JSON.parse(serializedData) : [];
//     } catch (error) {
//       console.error("Error loading from localStorage:", error);
//       return [];
//     }
//   },

//   isStorageAvailable() {
//     return typeof Storage !== "undefined";
//   },
// };

// export default StorageUtils;

const notesData = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, User!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2024-03-27T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps: Brown beef, sauté onions and garlic, add tomatoes, simmer, serve over pasta.",
    createdAt: "2024-03-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2024-03-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2024-03-15T11:55:44.678Z",
    archived: false,
  },
];

export default notesData;
