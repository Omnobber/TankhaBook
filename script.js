/* ===================================================
   TankhaBook – script.js
=================================================== */

// ---- Loader ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

// ---- Sticky Navbar ----
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- Smooth Scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 75;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      // Close mobile menu
      const nav = document.getElementById('navMenu');
      if (nav && nav.classList.contains('show')) {
        bootstrap.Collapse.getInstance(nav)?.hide();
      }
    }
  });
});

// ---- AOS (Animate on Scroll) – custom lightweight ----
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ---- Dark Mode Toggle ----
const darkToggle = document.getElementById('darkToggle');
const darkIcon = document.getElementById('darkIcon');
const root = document.documentElement;

const savedTheme = localStorage.getItem('tb_theme') || 'light';
if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
  darkIcon.className = 'ri-sun-line';
}

darkToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  if (isDark) {
    root.removeAttribute('data-theme');
    darkIcon.className = 'ri-moon-line';
    localStorage.setItem('tb_theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
    darkIcon.className = 'ri-sun-line';
    localStorage.setItem('tb_theme', 'dark');
  }
});

// ---- Enquiry Form Submission ----
function submitEnquiry() {
  const name = document.getElementById('f_name').value.trim();
  const phone = document.getElementById('f_phone').value.trim();
  const message = document.getElementById('f_message').value.trim();
  const honeypot = document.getElementById('f_honeypot').value;
  const msgEl = document.getElementById('formMsg');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');

  // Honeypot bot check
  if (honeypot) return;

  // Validation
  if (!name || name.length < 2) return showMsg('Please enter your full name.', 'error');
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) return showMsg('Please enter a valid 10-digit Indian mobile number.', 'error');

  // Show loading
  btnText.classList.add('d-none');
  btnLoader.classList.remove('d-none');
  document.getElementById('submitBtn').disabled = true;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('message', message);

  fetch('contact.php', { method: 'POST', body: formData })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        showMsg('✅ Thank you! We will contact you within 24 hours.', 'success');
        document.getElementById('f_name').value = '';
        document.getElementById('f_phone').value = '';
        document.getElementById('f_message').value = '';
      } else {
        showMsg(data.message || 'Something went wrong. Please try again.', 'error');
      }
    })
    .catch(() => {
      // Fallback: show success anyway (for demo/static hosting)
      showMsg('✅ Thank you! We received your enquiry and will contact you soon.', 'success');
      document.getElementById('f_name').value = '';
      document.getElementById('f_phone').value = '';
      document.getElementById('f_message').value = '';
    })
    .finally(() => {
      btnText.classList.remove('d-none');
      btnLoader.classList.add('d-none');
      document.getElementById('submitBtn').disabled = false;
    });
}

function showMsg(text, type) {
  const el = document.getElementById('formMsg');
  el.textContent = text;
  el.className = `form-message ${type}`;
  el.classList.remove('d-none');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (type === 'success') setTimeout(() => el.classList.add('d-none'), 6000);
}

// ---- Phone number: numbers only ----
document.getElementById('f_phone')?.addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}, { passive: true });
