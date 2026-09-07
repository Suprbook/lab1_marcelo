// --- Sticky nav shadow on scroll ---
const siteNav = document.getElementById('site-nav');

window.addEventListener('scroll', () => {
  siteNav.classList.toggle('is-scrolled', window.scrollY > 8);
});

// --- Theme toggle (persisted) ---
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
}

applyTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// --- Rotating tagline ("Web Developer | Student | Designer") ---
const tagline = document.getElementById('tagline');
const roles = tagline.textContent.split('|').map((role) => role.trim());
let roleIndex = 0;

if (roles.length > 1) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    tagline.style.opacity = 0;
    setTimeout(() => {
      tagline.textContent = roles[roleIndex];
      tagline.style.transition = 'opacity 0.4s ease';
      tagline.style.opacity = 1;
    }, 200);
  }, 2600);
}

// --- Active nav link on scroll ---
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach((section) => navObserver.observe(section));

// --- Reveal project cards as they enter view ---
const cards = document.querySelectorAll('.project-card');

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => cardObserver.observe(card));

// --- Copy email to clipboard ---
const copyBtn = document.getElementById('copy-email');
const emailText = document.getElementById('email-text');

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(emailText.textContent.trim());
    const original = copyBtn.textContent;
    copyBtn.textContent = 'Copied';
    setTimeout(() => {
      copyBtn.textContent = original;
    }, 1500);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
  }
});

// --- Footer year ---
document.getElementById('year').textContent = new Date().getFullYear();