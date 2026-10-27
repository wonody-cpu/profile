const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

menuButton?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  mobileMenu?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const sections = document.querySelectorAll('main section[id]');
const desktopLinks = document.querySelectorAll('.desktop-nav a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    desktopLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });
sections.forEach((section) => observer.observe(section));

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const subject = document.querySelector('#subject').value.trim();
  const message = document.querySelector('#message').value.trim();
  const body = `보낸 사람: ${name} (${email})\n\n${message}`;
  window.location.href = `mailto:minseo.dev.design@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
