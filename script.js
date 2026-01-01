// Simple interactivity: theme toggle and year
(() => {
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');
  const emailLink = document.getElementById('emailLink');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light');
      if (themeToggle) themeToggle.textContent = '☀️';
    } else {
      document.body.classList.remove('light');
      if (themeToggle) themeToggle.textContent = '🌙';
    }
  }

  // initialize
  const stored = localStorage.getItem('theme') || 'dark';
  applyTheme(stored);

  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const isLight = document.body.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      applyTheme(isLight ? 'light' : 'dark');
    });
  }

  if(yearEl) yearEl.textContent = new Date().getFullYear();

  if(emailLink){
    emailLink.addEventListener('click', (e)=>{
      const email = emailLink.textContent.trim();
      if(navigator.clipboard){
        navigator.clipboard.writeText(email).then(() => {
          const originalText = emailLink.textContent;
          emailLink.textContent = '✓ Copied!';
          emailLink.style.color = '#00ff00';
          setTimeout(() => {
            emailLink.textContent = originalText;
            emailLink.style.color = '';
          }, 2000);
        }).catch(()=>{});
      }
    });
  }

  /* Tab Navigation */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const activeTab = document.getElementById(tabName);
      if (activeTab) activeTab.classList.add('active');
    });
  });

  /* Scroll animations */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.card, .skill-category, .achievement').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();

// Typing animation for hero title and menu toggle behavior
(function(){
  // Typing animation
  const typingEl = document.querySelector('.typing-animation');
  if (typingEl) {
    const text = typingEl.getAttribute('data-text') || typingEl.textContent || '';
    typingEl.textContent = '';
    const speed = 80; // ms per character
    let idx = 0;
    function typeNext() {
      if (idx <= text.length) {
        typingEl.textContent = text.slice(0, idx);
        idx++;
        setTimeout(typeNext, speed);
      }
    }
    // start slightly delayed for effect
    setTimeout(typeNext, 300);
  }

  // Menu toggle (retractable nav)
  const menuToggle = document.getElementById('menuToggle');
  const navHub = document.querySelector('.nav-hub');
  const navLinks = document.querySelector('.nav-hub .nav-links');
  if (menuToggle && navHub && navLinks) {
    const setMenuState = (collapsed) => {
      if (collapsed) {
        navHub.classList.add('collapsed');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      } else {
        navHub.classList.remove('collapsed');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.textContent = '✕';
      }
    };

    // initialize collapsed on small screens
    const shouldCollapse = window.innerWidth < 820;
    setMenuState(shouldCollapse);

    menuToggle.addEventListener('click', () => {
      const isCollapsed = navHub.classList.toggle('collapsed');
      setMenuState(isCollapsed);
    });
    // keep responsive behavior on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth < 820 && !navHub.classList.contains('collapsed')) {
        setMenuState(true);
      } else if (window.innerWidth >= 820 && navHub.classList.contains('collapsed')) {
        setMenuState(false);
      }
    });
  }
})();
