 const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
// Placeholder for interactivity
  document.querySelector('.meet-ceo-btn').addEventListener('click', () => {
    console.log("Redirecting to CEO page...");
  });


// AI Assistant Enhancements
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
    text: "💰 What's your budget?",
    options: ["Below ₦10,000", "₦10,000–₦20,000", "₦20,000+"]
  },
  {
    text: "👣 What's your ideal shoe experience?",
    options: ["Comfort", "Luxury", "Trendy", "Durable", "All-rounder"]
  },
];

let currentQuestion = 0;
let answers = {};
let resultShown = false;

document.getElementById("start-assistant").addEventListener("click", startAssistant);

function startAssistant() {
  document.getElementById("question-box").classList.remove("hidden");
  document.getElementById("start-assistant").classList.add("hidden");
  showQuestion();
  // Auto-scroll to the assistant section
  document.getElementById("ai-assistant").scrollIntoView({ behavior: 'smooth' });
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").textContent = q.text;

  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => {
      // Clear previous selections for this question
      document.querySelectorAll("#options button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    optionsBox.appendChild(btn);
  });

  document.getElementById("next-btn").classList.remove("hidden");
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);

function nextQuestion() {
  const selected = document.querySelector("#options button.selected");
  if (selected) {
    answers[questions[currentQuestion].text] = selected.textContent;
    currentQuestion++;
    
    // Add transition effect
    document.getElementById("question-box").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("question-box").classList.remove("fade-out");
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showLoadingSpinner();
        setTimeout(showResult, 1500); // Simulate processing delay
      }
    }, 300);
  } else {
    alert("Please select an option.");
  }
}

function showLoadingSpinner() {
  document.getElementById("question-box").classList.add("hidden");
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  spinner.innerHTML = `<div class="spinner-icon"></div><p>Finding your perfect shoes...</p>`;
  document.getElementById("question-box").parentNode.insertBefore(spinner, document.getElementById("question-box"));
  
  // Remove spinner after result is shown
  setTimeout(() => {
    if (spinner.parentNode) spinner.parentNode.removeChild(spinner);
  }, 1500);
}

function showResult() {
  document.getElementById("question-box").classList.add("hidden");
  const resultBox = document.getElementById("result-box");
  resultBox.classList.remove("hidden");
  
  let summary = `<h3>Your Perfect Shoe Match</h3><div class="result-summary">`;
  for (let [q, a] of Object.entries(answers)) {
    summary += `<p><strong>${q}</strong><br>${a}</p>`;
  }
  summary += `</div>`;
  
  // Add product suggestions based on answers
  const suggestions = generateProductSuggestions(answers);
  summary += `<div class="product-suggestions"><h4>Recommended For You</h4>${suggestions}</div>`;
  
  document.getElementById("result-text").innerHTML = summary;
  
  // Show confetti effect
  showConfetti();
  
  // Show download and share options after a delay
  setTimeout(() => {
    document.getElementById("download-result").classList.remove("hidden");
    document.getElementById("share-options").classList.remove("hidden");
  }, 500);
  
  // Auto-scroll to result
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function generateProductSuggestions(answers) {
  // This would be replaced with real product data in a real app
  let suggestions = '';
  const products = [
    {
      name: "Urban Sneaker Pro",
      price: "₦15,000",
      image: "https://example.com/sneaker.jpg",
      match: "90% match"
    },
    {
      name: "Classic Leather Loafers",
      price: "₦18,500",
      image: "https://example.com/loafers.jpg",
      match: "85% match"
    },
    {
      name: "Comfort Walk Sandals",
      price: "₦12,000",
      image: "https://example.com/sandals.jpg",
      match: "80% match"
    }
  ];
  
  products.forEach(product => {
    suggestions += `
      <div class="suggested-product">
        <img src="${product.image}" alt="${product.name}">
        <h5>${product.name}</h5>
        <p>${product.price}</p>
        <span class="match-badge">${product.match}</span>
        <button class="view-product">View Product</button>
      </div>
    `;
  });
  
  return `<div class="suggested-products-grid">${suggestions}</div>`;
}

function showConfetti() {
  // Simple confetti effect
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement("div");
    dot.className = "confetti-dot";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.animationDelay = `${Math.random() * 0.5}s`;
    dot.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.appendChild(dot);
  }
  document.getElementById("result-box").appendChild(confetti);
  
  // Remove confetti after animation
  setTimeout(() => {
    confetti.remove();
  }, 3000);
}

// Fallback if jsPDF doesn't load
function checkPDFLibrary() {
  if (typeof window.jspdf === 'undefined') {
    console.warn("jsPDF not loaded, attempting to load it now");
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => console.log("jsPDF loaded successfully");
    script.onerror = () => console.error("Failed to load jsPDF");
    document.head.appendChild(script);
  }
}

// Check on page load
window.addEventListener('DOMContentLoaded', checkPDFLibrary);

// PDF Download functionality
document.getElementById("download-result").addEventListener("click", async function() {
  const button = this;
  const originalHTML = button.innerHTML;
  
  // Show loading state
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
  
  try {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
      throw new Error("PDF library not loaded");
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add logo or title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(139, 0, 0); // Dark red
    doc.text("THE SHOEROOM", 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Your Personalized Shoe Recommendation", 105, 30, { align: 'center' });
    
    // Add divider line
    doc.setDrawColor(139, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Add user's answers
    doc.setFontSize(14);
    doc.text("Your Preferences:", 20, 45);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let yPosition = 55;
    
    // Format answers nicely
    for (const [question, answer] of Object.entries(answers)) {
      const formattedQuestion = question.replace(/[👤👟🎨💰👣]/g, '').trim();
      doc.text(`${formattedQuestion}:`, 20, yPosition);
      doc.text(answer, 70, yPosition);
      yPosition += 10;
    }
    
    // Add recommended products section
    yPosition += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Recommended Products:", 20, yPosition);
    
    // Sample product data - replace with your actual products
    const products = [
      { name: "Urban Sneaker Pro", price: "₦15,000", match: "90% match" },
      { name: "Classic Leather Loafers", price: "₦18,500", match: "85% match" },
      { name: "Comfort Walk Sandals", price: "₦12,000", match: "80% match" }
    ];
    
    // Create a table for products
    doc.autoTable({
      startY: yPosition + 10,
      head: [['Product', 'Price', 'Match']],
      body: products.map(p => [p.name, p.price, p.match]),
      styles: { 
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineColor: [139, 0, 0],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [139, 0, 0],
        textColor: [255, 255, 255]
      },
      margin: { left: 20 }
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Generated by THE SHOEROOM AI Assistant", 105, 285, { align: 'center' });
    doc.text(new Date().toLocaleDateString(), 105, 290, { align: 'center' });
    
    // Save the PDF
    doc.save("SHOEROOM_Recommendation.pdf");
    
  } catch (error) {
    console.error("PDF generation error:", error);
    alert("PDF generation failed. Please try again or contact support.");
  } finally {
    // Restore button state
    button.disabled = false;
    button.innerHTML = originalHTML;
  }
});

// Helper function to load scripts dynamically
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Share options
document.getElementById("send-email").addEventListener("click", () => {
  document.getElementById("email-form").classList.remove("hidden");
});

document.getElementById("submit-email").addEventListener("click", () => {
  const email = document.getElementById("email-input").value;
  if (email && email.includes("@")) {
    alert(`Your shoe recommendations have been sent to ${email}`);
    document.getElementById("email-form").classList.add("hidden");
  } else {
    alert("Please enter a valid email address");
  }
});


// Testimonial Slider
  const swiper = new Swiper(".testimonial-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    alert("Message sent successfully!");
    event.target.reset();
  }





