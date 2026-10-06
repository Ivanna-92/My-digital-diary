const diaryGrid = document.querySelector(".diary-grid");
const entries =
    JSON.parse(localStorage.getItem("diaryEntries")) || [];
const latestEntries = entries
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
if (latestEntries.length === 0) {
    diaryGrid.innerHTML = `
        <p class="empty-message">
            Your story begins here.
            Create your first diary entry.
        </p>
    `;
} else {
    latestEntries.forEach(function(entry) {
        const newCard = document.createElement("div");
        newCard.classList.add("diary-card");
        newCard.innerHTML = `
            <p class="entry-date">
                ${new Date(entry.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                })}
            </p>
            <h2>${entry.title}</h2>
            <p>${entry.reflection}</p>
        `;
        diaryGrid.appendChild(newCard);
    });
}
/* MASONRY LAYOUT */
function layoutMasonry() {
    const cards = Array.from(
        diaryGrid.querySelectorAll(".diary-card")
    );
    if (window.innerWidth <= 700) {
        diaryGrid.style.height = "auto";
        cards.forEach(function(card) {
            card.style.position = "relative";
            card.style.left = "auto";
            card.style.top = "auto";
            card.style.width = "100%";
        });
        return;
    }
    const gap = 16;
    const columns = 3;
    const gridWidth = diaryGrid.clientWidth;
    const columnWidth = (gridWidth - gap * 2) / columns;
    const columnHeights = [0, 0, 0];
    diaryGrid.style.position = "relative";
    cards.forEach(function(card, index) {
        const pattern = index % 4;
        let startColumn;
        let span;
        if (pattern === 0) {
            startColumn = 0;
            span = 2;
        } else if (pattern === 1) {
            startColumn = 2;
            span = 1;
        } else if (pattern === 2) {
            startColumn = 0;
            span = 1;
        } else {
            startColumn = 1;
            span = 2;
        }
        const left = startColumn * (columnWidth + gap);
        const width =
            columnWidth * span + gap * (span - 1);
        const top = Math.max(
            ...columnHeights.slice(startColumn, startColumn + span)
        );
        card.style.position = "absolute";
        card.style.left = `${left}px`;
        card.style.top = `${top}px`;
        card.style.width = `${width}px`;
        const height = card.getBoundingClientRect().height;
        for (
            let column = startColumn;
            column < startColumn + span;
            column++
        ) {
            columnHeights[column] = top + height + gap;
        }
    });
    diaryGrid.style.height =
        `${Math.max(0, ...columnHeights) - gap}px`;
}
/* INITIAL LAYOUT */
requestAnimationFrame(layoutMasonry);
/* RESIZE LAYOUT */
let resizeFrame;
window.addEventListener("resize", function() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(layoutMasonry);
});
/* REFLOW AFTER FONTS LOAD */
document.fonts.ready.then(function() {
    layoutMasonry();
});