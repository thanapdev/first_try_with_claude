const canvas = document.getElementById("avatar");
const ctx = canvas.getContext("2d");
const size = canvas.width;

const hue = Math.floor(Math.random() * 360);
const grad = ctx.createLinearGradient(0, 0, size, size);
grad.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
grad.addColorStop(1, `hsl(${(hue + 60) % 360}, 70%, 45%)`);

ctx.save();
ctx.beginPath();
ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
ctx.clip();
ctx.fillStyle = grad;
ctx.fillRect(0, 0, size, size);

ctx.fillStyle = "rgba(255,255,255,0.95)";
ctx.font = "700 48px Inter, sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("T", size / 2, size / 2 + 2);
ctx.restore();

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
