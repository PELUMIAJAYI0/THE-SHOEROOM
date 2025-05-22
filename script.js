 const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
// Placeholder for interactivity
  document.querySelector('.meet-ceo-btn').addEventListener('click', () => {
    console.log("Redirecting to CEO page...");
  });


const questions = [
  {
    text: "👤 Who are you shopping for?",
    options: ["Male", "Female", "Unisex"]
  },
  {
    text: "👟 What type of shoe are you looking for?",
    options: ["Sneakers", "Heels", "Loafers", "Sandals", "Boots"]
  },
  {
    text: "🎨 Preferred shoe color?",
    options: ["Black", "White", "Red", "Brown", "Neutral", "Colorful"]
  },
  {
    text: "💰 What’s your budget?",
    options: ["Below ₦10,000", "₦10,000–₦20,000", "₦20,000+"]
  },
  {
    text: "👣 What’s your ideal shoe experience?",
    options: ["Comfort", "Luxury", "Trendy", "Durable", "All-rounder"]
  },
];

let currentQuestion = 0;
let answers = {};

document.getElementById("start-assistant").addEventListener("click", () => {
  document.getElementById("question-box").classList.remove("hidden");
  document.getElementById("start-assistant").classList.add("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.text;

  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => {
      btn.classList.toggle("selected");
    });
    optionsBox.appendChild(btn);
  });

  document.getElementById("next-btn").classList.remove("hidden");
}

document.getElementById("next-btn").addEventListener("click", () => {
  const selected = Array.from(document.querySelectorAll("#options button.selected")).map(btn => btn.textContent);
  if (selected.length > 0) {
    answers[questions[currentQuestion].text] = selected;
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  } else {
    alert("Please select at least one option.");
  }
});

function showResult() {
  document.getElementById("question-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");

  let summary = "📝 Based on your choices:\n";
  for (let [q, a] of Object.entries(answers)) {
    summary += `${q} ➤ ${a.join(", ")}\n`;
  }

  document.getElementById("result-text").textContent = summary;

  document.getElementById("download-result").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(summary, 10, 10);
    doc.save("Your_Shoe_Recommendation.pdf");
  });
}