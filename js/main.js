// ============================================
// CPE - CuidaPraEstudar | Main JavaScript
// Integrantes: [Nome 1 - Matrícula] [Nome 2 - Matrícula]
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal Animation ----
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // ---- Smooth Navbar Active State ----
  const navLinks = document.querySelectorAll('.navbar-links a, .app-nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // ---- Emoji Check-in Selector (Landing Page) ----
  const emojiButtons = document.querySelectorAll('.emoji-btn');
  emojiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      emojiButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      btn.style.transform = 'scale(1.25)';
      setTimeout(() => {
        btn.style.transform = 'scale(1.1)';
      }, 200);
    });
  });

  // ---- Login: Profile Selector ----
  const profileBtns = document.querySelectorAll('.profile-btn');
  profileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      profileBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ---- Login: Toggle Password Visibility ----
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('senha');
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const isHidden = passwordInput.type === 'password';
      passwordInput.type = isHidden ? 'text' : 'password';
      togglePassword.textContent = isHidden ? '🙈' : '👁️';
    });
  }

  // ---- Login: Form Submit (demo) ----
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('.btn-login');
      btn.textContent = 'Entrando...';
      btn.disabled = true;
      setTimeout(() => {
        window.location.href = 'gamificacao.html';
      }, 900);
    });
  }

  // ---- Progress Bars: animate on scroll ----
  const progressBars = document.querySelectorAll('.progress-fill, .rank-bar, .streak-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.dataset.width || bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => {
            bar.style.transition = 'width 0.9s ease';
            bar.style.width = targetWidth;
          }, 100);
        });
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => {
    bar.dataset.width = bar.style.width || getComputedStyle(bar).width;
    barObserver.observe(bar);
  });

  // ---- Counter Animation (Stats) ----
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, 16);
  }

  // ---- Achievement card hover pulse ----
  document.querySelectorAll('.achievement-card:not(.locked)').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 8px 28px rgba(45,74,62,0.18)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });

});
