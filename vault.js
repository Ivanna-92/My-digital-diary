const vaultList = document.querySelector(".vault-list");

let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

function displayEntries() {
    vaultList.innerHTML = "";

    if (entries.length === 0) {
        vaultList.innerHTML = `
            <p class="empty-message">
                Your archive is waiting for its first entry.
                Start writing and your reflections will appear here.
            </p>
        `;
        return;
    }

    entries.forEach(function(entry) {
        const newEntry = document.createElement("div");
        newEntry.classList.add("diary-card");

        newEntry.innerHTML = `
            <p class="entry-date">${new Date(entry.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}</p>

            <h2>${entry.title}</h2>
            <p>${entry.reflection}</p>
            <button class="delete-button">Delete</button>
        `;

        newEntry.querySelector(".delete-button").addEventListener("click", function() { 

            if (!confirm("Are you sure you want to delete this entry?")) {
                return;
            }
            entries = entries.filter(function(item) {
                return item.id !== entry.id;
            });

            localStorage.setItem("diaryEntries", JSON.stringify(entries));

            displayEntries();
        });

        vaultList.appendChild(newEntry);
    });
}

displayEntries();