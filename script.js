 const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    
// Placeholder for interactivity
  document.querySelector('.meet-ceo-btn').addEventListener('click', () => {
    console.log("Redirecting to CEO page...");
  });
