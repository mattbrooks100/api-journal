const entryContainer = document.querySelector(".entry-container");

// Read all the journal entries and display them
fetch("/api/entries")
  .then((res) => res.json())
  .then((entryArray) => {
    console.log(entryArray);
    for (let entry of entryArray) {
      const { id, entry_date, wake_feel, accomplish, main_entry, tomorrow } = entry;
      const newEntryDiv = document.createElement("div");
      newEntryDiv.className = "entry relative mb-4 p-4 bg-amber-100 shadow-lg rounded-xl";
      newEntryDiv.setAttribute("id", `${id}`);
      newEntryDiv.innerHTML = `<b>Date:</b> ${entry_date}<br>
        <b>How did you feel when you woke up?</b> <p>${wake_feel}</p>
        <b>What did you accomplish?</b> <p>${accomplish}</p>
        <b>What happened today?</b> <p>${main_entry}</p>
        <b>What will you accomplish tomorrow?</b> <p>${tomorrow}</p>`;
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete entry";
      deleteButton.className = "delete-button absolute top-0 right-0 mt-4 mr-4 text-purple-800 hover:text-black";
      deleteButton.onclick = () => {
        const id = deleteButton.parentElement.getAttribute("id");
        fetch(`/api/entries/${id}`, {
          method: "DELETE",
        });
        location.reload();
      };
      newEntryDiv.append(deleteButton);
      entryContainer.append(newEntryDiv);
    }
  });

//  Display new entry modal when "New Entry" button clicked
const newEntryButton = document.querySelector(".entry-button");
const entryModal = document.querySelector("#entry-modal");
const closeButton = document.querySelector("#close-button");
newEntryButton.onclick = () => (entryModal.style.display = "block");
closeButton.onclick = () => (entryModal.style.display = "none");

// Submit a new entry and POST request
const entryForm = document.querySelector("#entry-form");
const submitButton = document.querySelector("#submit-button");
const verification = document.querySelector("#verification");
entryForm.addEventListener("submit", (e) => {
  if (verification.checked) {
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
  } else {
    e.preventDefault();
    const message = document.querySelector(".verification-message");
    message.innerText = "You forgot that you like cats...";
  }
});
