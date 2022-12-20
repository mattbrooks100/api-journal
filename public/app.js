const entryContainer = document.querySelector(".entry-container");

// Read all the journal entries and display them
fetch("/api/entries")
  .then((res) => res.json())
  .then((entryArray) => {
    for (let entry of entryArray) {
      let { id, entry_date, wake_feel, accomplish, main_entry, tomorrow } = entry;
      // Convert the date to a human friendly format
      entry_date = new Date(entry_date).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      // Create a new DOM element for each journal entry
      const newEntryDiv = document.createElement("div");
      newEntryDiv.className = "entry relative mb-4 p-4 bg-amber-100 shadow-lg rounded-xl";
      newEntryDiv.setAttribute("id", `${id}`);
      newEntryDiv.innerHTML = `<b>Date:</b> ${entry_date}<br>
        <b>How did you feel when you woke up?</b> <p>${wake_feel}</p>
        <b>What did you accomplish?</b> <p>${accomplish}</p>
        <b>What happened today?</b> <p>${main_entry}</p>
        <b>What will you accomplish tomorrow?</b> <p>${tomorrow}</p>`;
      // Delete button sends DELETE request and reloads the page
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete entry";
      deleteButton.className =
        "delete-button absolute top-0 right-0 mt-4 mr-4 text-purple-800 hover:text-black";
      deleteButton.onclick = () => {
        const id = deleteButton.parentElement.getAttribute("id");
        fetch(`/api/entries/${id}`, {
          method: "DELETE",
        });
        location.reload();
      };
      newEntryDiv.append(deleteButton);
      // Append the journal entry to the journal entry container
      entryContainer.append(newEntryDiv);
    }
  });

//  Display new entry modal when "New Entry" button is clicked
const newEntryButton = document.querySelector(".entry-button");
const entryModal = document.querySelector("#entry-modal");
const closeButton = document.querySelector("#close-button");
newEntryButton.onclick = () => {
  catModal.style.display = "none";
  entryModal.style.display = "block";
};
closeButton.onclick = () => (entryModal.style.display = "none");

//  Display cat modal when "Cats" button is clicked
const catsButton = document.querySelector(".cats-button");
const catModal = document.querySelector("#cats-modal");
const catCloseButton = document.querySelector("#cat-close-button");
const catPic = document.querySelector("#cat-pic");
const catModalBody = document.querySelector(".cat-modal-body");
catsButton.onclick = () => {
  entryModal.style.display = "none";
  catModal.style.display = "block";
};
catCloseButton.onclick = () => (catModal.style.display = "none");
const catRefresh = document.querySelector("#cat-refresh-button");
catRefresh.onclick = () => {
  getRandomCat();
};

// Get a random cat pic
const getRandomCat = () => {
  fetch("https://cataas.com/cat").then((response) => {
    catPic.src = response.url;
  });
};

// Submit a new entry and POST request
const entryForm = document.querySelector("#entry-form");
// const submitButton = document.querySelector("#submit-button");
const verification = document.querySelector("#verification");
entryForm.addEventListener("submit", (e) => {
  if (verification.checked) {
    const data = new FormData(e.target);
    const newEntry = {
      entry_date: data.get("entry_date"),
      wake_feel: data.get("wake_feel"),
      accomplish: data.get("accomplish"),
      main_entry: data.get("main_entry"),
      tomorrow: data.get("tomorrow"),
    };
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
