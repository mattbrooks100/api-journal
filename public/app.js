const entryContainer = document.querySelector(".entry-container");

fetch("/api/entries")
  .then((res) => res.json())
  .then((entryArray) => {
    console.log(entryArray);
    for (let entry of entryArray) {
      const { entry_date, wake_feel, todo, main_entry, sleep_feel } = entry;
      const newEntry = document.createElement("div");
      newEntry.className = "entry mb-4 p-4 bg-amber-100 shadow-lg rounded-xl";
      newEntry.innerHTML = `<b>Date:</b> ${entry_date}<br>
        <b>How did you feel when you woke up?</b> ${wake_feel}<br>
        <b>What do you need to do today?</b> ${todo}<br>
        <b>What happened today?</b> ${main_entry}<br>
        <b>How do you feel going to sleep?</b> ${sleep_feel}`;
      entryContainer.append(newEntry);
    }
  });

const newEntryButton = document.querySelector(".entry-button");
const entryModal = document.querySelector("#entry-modal");
const closeButton = document.querySelector("#close-button");
newEntryButton.onclick = () => (entryModal.style.display = "block");
closeButton.onclick = () => (entryModal.style.display = "none");
