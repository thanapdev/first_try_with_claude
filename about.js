const toggle = document.getElementById("friendly-toggle");
const toggleMsg = document.getElementById("toggle-msg");
const reactions = ["Nice. 😊", "Again?", "Okay okay.", "You like this one."];

toggle.addEventListener("click", () => {
  const on = toggle.getAttribute("aria-checked") === "true";
  toggle.setAttribute("aria-checked", String(!on));
  toggle.classList.toggle("on", !on);
  toggleMsg.textContent = !on
    ? reactions[Math.floor(Math.random() * reactions.length)]
    : "Tap me — I'll react.";
});

fetch("https://api.github.com/users/thanapdev")
  .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  .then((user) => {
    if (user.name) document.getElementById("gh-name").textContent = user.name;
    document.getElementById("gh-bio").textContent = (user.bio || "").trim();
    document.getElementById("gh-repos").textContent = user.public_repos;
    document.getElementById("gh-followers").textContent = user.followers;
    document.getElementById("gh-following").textContent = user.following;
    document.getElementById("gh-stats").hidden = false;
  })
  .catch(() => {
    // offline or rate-limited: static name + link still show
  });

const contribGrid = document.getElementById("contrib-grid");
const contribTotal = document.getElementById("contrib-total");

// GitHub has no tokenless contributions API; this public mirror serves the same data
fetch("https://github-contributions-api.jogruber.de/v4/thanapdev?y=last")
  .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
  .then((data) => {
    const days = data.contributions;
    const total = data.total.lastYear;
    contribTotal.textContent = `${total} contributions in the last year`;
    contribGrid.setAttribute("aria-label", `${total} GitHub contributions in the last year`);

    // pad so the first column starts on Sunday, like GitHub
    const offset = new Date(days[0].date + "T00:00:00").getDay();
    for (let i = 0; i < offset; i++) {
      contribGrid.appendChild(document.createElement("span"));
    }
    for (const day of days) {
      const cell = document.createElement("span");
      cell.className = `contrib-cell level-${day.level}`;
      cell.title = `${day.count} on ${day.date}`;
      contribGrid.appendChild(cell);
    }
    // on narrow screens, start scrolled to the most recent weeks
    contribGrid.parentElement.scrollLeft = contribGrid.scrollWidth;
  })
  .catch(() => {
    contribTotal.textContent = "Couldn't load contributions right now.";
  });
