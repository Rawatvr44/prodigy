// Add 'scrolled' class to navbar on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});

// Smooth scroll to sections when menu items are clicked
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
          top: targetSection.offsetTop - 60,
          behavior: 'smooth'
      });
  });
});

// Highlight active menu item on scroll
const sections = document.querySelectorAll('section');
const menuLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
      const sectionTop = section.offsetTop - 70;
      if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute('id');
      }
  });

  menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSection) {
          link.classList.add('active');
      }
  });
});

// Add 'active' styles to menu items
menuLinks.forEach(link => {
  link.classList.add('active');
});
