/* Prestige Real Estate - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  // ─── NAVBAR SCROLL ───
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ─── MOBILE NAV TOGGLE ───
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = toggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    });
  }

  // ─── SCROLL FADE-IN ANIMATIONS ───
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  // ─── PROPERTY CARD EXPAND (Listings Page) ───
  const propertyCards = document.querySelectorAll('.property-card[data-expandable]');
  propertyCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const detail = card.querySelector('.property-detail');
      if (!detail) return;
      
      // Close others
      document.querySelectorAll('.property-detail.active').forEach(d => {
        if (d !== detail) d.classList.remove('active');
      });
      
      detail.classList.toggle('active');
    });
  });

  // ─── SEARCH BAR INTERACTION ───
  const searchForms = document.querySelectorAll('.search-bar, .filter-bar');
  searchForms.forEach(form => {
    const btn = form.querySelector('.btn-search, .btn-search-filter');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-search"></i> Search';
        }, 1500);
      });
    }
  });

  // ─── SMOOTH SCROLL FOR ANCHORS ───
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter);
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
          }, 16);
          
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  // ─── SORT LISTINGS ───
  const sortSelect = document.querySelector('.sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const grid = document.querySelector('.listings-grid');
      const cards = Array.from(grid.querySelectorAll('.property-card'));
      
      cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price) || 0;
        const priceB = parseInt(b.dataset.price) || 0;
        const sizeA = parseInt(a.dataset.size) || 0;
        const sizeB = parseInt(b.dataset.size) || 0;
        
        switch(sortSelect.value) {
          case 'price-low': return priceA - priceB;
          case 'price-high': return priceB - priceA;
          case 'size': return sizeB - sizeA;
          default: return 0;
        }
      });
      
      cards.forEach(card => grid.appendChild(card));
    });
  }

  // ─── CONTACT FORM ───
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-submit');
      const origText = btn.textContent;
      btn.textContent = 'SENDING...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = 'MESSAGE SENT ✓';
        btn.style.background = '#22c55e';
        setTimeout(() => {
          btn.textContent = origText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 2500);
      }, 1500);
    });
  }
});
