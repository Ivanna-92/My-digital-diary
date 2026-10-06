const form = document.querySelector(".entry-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.querySelector("#titleInput").value;
    const date = document.querySelector("#dateInput").value;
    const reflection = document.querySelector("#reflectionInput").value;

     if (title === "" || reflection === "") {
        document.querySelector("#successMessage").textContent = "Please enter a title and reflection."
        return;
    }

    const entry = {
        id: Date.now(),
        title: title,
        date: date,
        reflection: reflection

    };
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    entries.push(entry);

    localStorage.setItem("diaryEntries", JSON.stringify(entries));

    document.querySelector("#successMessage").textContent = "Entry saved successfully!"
    
    form.reset();
})