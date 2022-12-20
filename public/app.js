const entryContainer = document.querySelector(".entry-container");

// Read all the journal entries and display them
fetch("/api/entries")
  .then((res) => res.json())
  .then((entryArray) => {
    console.log(entryArray);
    for (let entry of entryArray) {
      const { entry_date, wake_feel, accomplish, main_entry, tomorrow } = entry;
      const newEntryDiv = document.createElement("div");
      newEntryDiv.className = "entry mb-4 p-4 bg-amber-100 shadow-lg rounded-xl";
      newEntryDiv.innerHTML = `<b>Date:</b> ${entry_date}<br>
        <b>How did you feel when you woke up?</b> ${wake_feel}<br>
        <b>What did you accomplish?</b> ${accomplish}<br>
        <b>What happened today?</b> ${main_entry}<br>
        <b>What will you accomplish tomorrow?</b> ${tomorrow}`;
      entryContainer.append(newEntryDiv);
    }
  });

//  Display new entry modal when "New Entry" button clicked
const newEntryButton = document.querySelector(".entry-button");
const entryModal = document.querySelector("#entry-modal");
const closeButton = document.querySelector("#close-button");
newEntryButton.onclick = () => (entryModal.style.display = "block");
closeButton.onclick = () => (entryModal.style.display = "none");

// Submit a new entry
const entryForm = document.querySelector("#entry-form");
const submitButton = document.querySelector("#submit-button");
const verification = document.querySelector("#verification");
entryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  console.log(verification.checked);
  const newEntry = {
    entry_date: data.get("entry_date"),
    wake_feel: data.get("wake_feel"),
    accomplish: data.get("accomplish"),
    main_entry: data.get("main_entry"),
    tomorrow: data.get("tomorrow"),
  };
  console.log(newEntry);
  fetch("/api/entries", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newEntry),
  });
});
