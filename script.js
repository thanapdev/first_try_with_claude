const greetBtn = document.getElementById("greet-btn");
const greetMsg = document.getElementById("greet-msg");
const masterText = document.getElementById("master-text");

const greetings = [
  "Hey there! 😄",
  "Hello, human!",
  "Ready when you are.",
  "Let's build something!",
];

greetBtn.addEventListener("click", () => {
  const pick = greetings[Math.floor(Math.random() * greetings.length)];
  greetMsg.textContent = pick;
});

setTimeout(() => {
  masterText.textContent = "You. Obviously. 👑";
}, 600);
