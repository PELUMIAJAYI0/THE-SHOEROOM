const toggleBtn = document.getElementById('toggle-button');
    const navLinks = document.getElementById('navbar-links');

    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });