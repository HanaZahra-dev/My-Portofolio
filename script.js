// Cursor glow
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

// Sliders
document.querySelectorAll('.slider-wrap').forEach(wrap => {
  const slider = wrap.querySelector('.slider');
  const total = parseInt(slider.dataset.total);
  const dotsContainer = wrap.querySelector('.slide-dots');
  let current = 0;

  // Build dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(index) {
    current = (index + total) % total;
    slider.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.slide-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  wrap.querySelector('.s-prev').addEventListener('click', () => goTo(current - 1));
  wrap.querySelector('.s-next').addEventListener('click', () => goTo(current + 1));
});
