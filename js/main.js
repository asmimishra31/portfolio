/**
 * ASMI MISHRA - PERSONAL PORTFOLIO
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initScrollReveal();
  initSkillsFilter();
  initModals();
  initClipboard();
  initContactForm();
  initCounters();
});

/* ---------------------------------------------------------
 * 1. Scroll Progress Indicator
 * --------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* ---------------------------------------------------------
 * 2. Sticky Navbar & Active Section Highlighting
 * --------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll background toggle
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      });
    });
  }

  // Active link detection on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* ---------------------------------------------------------
 * 3. Intersection Observer Scroll Reveal
 * --------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ---------------------------------------------------------
 * 4. Interactive Skills Filtering
 * --------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ---------------------------------------------------------
 * 5. Projects & Resume Modals
 * --------------------------------------------------------- */
const projectDetails = {
  studymind: {
    title: 'StudyMind AI — Intelligent Lecture Companion',
    tagline: 'AI-powered note synthesis & active recall generator for university students',
    description: 'StudyMind AI is an educational technology application tailored for college students handling dense engineering lectures. It ingests markdown or PDF lecture transcripts and automatically generates executive summaries, key formula cheat-sheets, and interactive spaced-repetition flashcards using large language model APIs.',
    architecture: 'Python backend with prompt chaining, text chunking, and lightweight Streamlit/FastAPI client interface.',
    highlights: [
      'Automatic semantic note chunking preserving mathematical notations and code blocks.',
      'Active recall question-answer generator with conceptual difficulty grading.',
      'One-click export to Anki flashcard format and clean Markdown notes.',
      'Engineered specifically to support first-year CS & AI university coursework.'
    ],
    tech: ['Python', 'Google Gemini API', 'Streamlit', 'NLP', 'Git'],
    github: 'https://github.com/asmimishra/studymind-ai'
  },
  algocanvas: {
    title: 'AlgoCanvas — Sorting & Pathfinding Visualizer',
    tagline: 'Interactive step-by-step visualizer for core computer science algorithms',
    description: 'AlgoCanvas was developed to bridge theoretical understanding with intuitive visual feedback. It animates foundational data structures and algorithms in real time with configurable speed, randomized test arrays, and live pointer tracking.',
    architecture: 'Pure JavaScript (ES6+) with custom state stepping, canvas render loops, and asynchronous animation queues.',
    highlights: [
      'Visualizes QuickSort, MergeSort, HeapSort, and BubbleSort with comparison counters.',
      'Dijkstra and BFS/DFS grid traversal for shortest path exploration.',
      'Execution metrics display: exact comparisons, array accesses, and asymptotic complexity.',
      'Responsive touch-friendly controls with interactive speed slider and step-by-step pause.'
    ],
    tech: ['JavaScript (ES6+)', 'HTML5 Canvas', 'CSS3', 'Algorithms', 'Data Structures'],
    github: 'https://github.com/asmimishra/algocanvas-visualizer'
  },
  campusnest: {
    title: 'CampusNest — NST Resource & Community Portal',
    tagline: 'Centralized resource directory for Newton School of Technology peers',
    description: 'Designed to solve the fragmentation of class notes, lab assignments, and hackathon alerts among first-year students at Newton School of Technology (Rishihood University). CampusNest offers a clean, searchable repository organized by trimester subjects.',
    architecture: 'Modular front-end architecture with client-side indexing, local persistence, and responsive editorial layout.',
    highlights: [
      'Instant fuzzy search across lecture slides, reference books, and lab assignments.',
      'Community Hackathon & Event board highlighting events like Hacktoberfest Sonipat.',
      'Curated reading list for Machine Learning and CS fundamentals.',
      'Mobile-first responsive design adapted for student phones and laptops.'
    ],
    tech: ['HTML5', 'Modern CSS', 'JavaScript', 'LocalStorage', 'UI/UX Design'],
    github: 'https://github.com/asmimishra/campusnest-nst'
  },
  ecosense: {
    title: 'EcoSense — Personal Carbon Footprint Tracker',
    tagline: 'Data-driven carbon accounting web app with actionable sustainability metrics',
    description: 'EcoSense helps students and individuals understand the carbon impact of their daily routines, from campus commutes to dietary choices. By aggregating daily inputs, the app provides visual breakdowns and personalized micro-actions to reduce emissions.',
    architecture: 'Python Flask web service paired with interactive Chart.js visualizations and formula models based on EPA emission factors.',
    highlights: [
      'Dynamic charts breaking down emissions across transportation, food, and energy.',
      'Gamified weekly sustainability milestones tailored to campus living.',
      'Clean data export and simulated forecast based on habit changes.',
      'Minimalist, calming aesthetic reinforcing mindful environmental impact.'
    ],
    tech: ['Python', 'Flask', 'Chart.js', 'CSS Grid', 'Data Visualization'],
    github: 'https://github.com/asmimishra/ecosense-tracker'
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalContainer = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const resumeBackdrop = document.getElementById('resumeModal');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const openResumeBtn = document.getElementById('openResumeBtn');

  // Open Project Modal
  document.querySelectorAll('[data-open-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-open-project');
      const project = projectDetails[projKey];
      if (!project) return;

      modalContainer.innerHTML = `
        <div style="margin-bottom: 20px;">
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-coffee); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">Featured Project</span>
          <h2 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--color-espresso); margin-top: 4px; line-height: 1.25;">${project.title}</h2>
          <p style="color: var(--color-coffee); font-weight: 600; font-size: 0.95rem; margin-top: 6px;">${project.tagline}</p>
        </div>
        
        <p style="color: var(--text-muted); line-height: 1.7; font-size: 0.98rem; margin-bottom: 22px;">${project.description}</p>
        
        <div style="background: var(--bg-cream); border-left: 3px solid var(--color-coffee); padding: 14px 18px; border-radius: 0 12px 12px 0; margin-bottom: 22px;">
          <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 4px;">Architecture & Design:</h4>
          <p style="font-size: 0.86rem; color: var(--text-muted); line-height: 1.5;">${project.architecture}</p>
        </div>

        <h4 style="font-size: 0.92rem; font-weight: 700; color: var(--color-espresso); margin-bottom: 12px;">Key Engineering Highlights:</h4>
        <ul style="list-style: none; margin-bottom: 26px; display: flex; flex-direction: column; gap: 10px;">
          ${project.highlights.map(h => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem; color: var(--text-main);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-coffee)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>

        <div style="margin-bottom: 26px;">
          <h4 style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--text-light); text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.05em;">Technologies Used:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${project.tech.map(t => `<span class="tech-tag" style="background: var(--bg-cream-pure); border: 1px solid var(--border-medium); font-weight: 600;">${t}</span>`).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 14px; border-top: 1px solid var(--border-subtle); padding-top: 20px;">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            Explore GitHub Repository
          </a>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('projectModal').classList.remove('active')">Close</button>
        </div>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Resume Modal
  if (openResumeBtn && resumeBackdrop) {
    openResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (resumeCloseBtn) {
      resumeCloseBtn.addEventListener('click', () => {
        resumeBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    resumeBackdrop.addEventListener('click', (e) => {
      if (e.target === resumeBackdrop) {
        resumeBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ESC key to close any modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalBackdrop && modalBackdrop.classList.contains('active')) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (resumeBackdrop && resumeBackdrop.classList.contains('active')) {
        resumeBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

/* ---------------------------------------------------------
 * 6. Copy Email to Clipboard with Toast
 * --------------------------------------------------------- */
function initClipboard() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailBox = document.getElementById('emailBoxTrigger');
  const toast = document.getElementById('toastNotice');
  const emailToCopy = 'asmi.m26078@nst.rishihood.edu.in';

  function triggerCopy() {
    navigator.clipboard.writeText(emailToCopy).then(() => {
      showToast('Copied email to clipboard! ✨');
    }).catch(() => {
      // Fallback
      const tempInput = document.createElement('input');
      tempInput.value = emailToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast('Copied email to clipboard! ✨');
    });
  }

  if (copyBtn) copyBtn.addEventListener('click', triggerCopy);
  if (emailBox) emailBox.addEventListener('click', triggerCopy);
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-toffee)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ---------------------------------------------------------
 * 7. Contact Form Simulation & Feedback
 * --------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
      Sending message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      contactForm.reset();
      showToast(`Thank you, ${name}! Your note has been sent successfully.`);
    }, 1100);
  });
}

/* ---------------------------------------------------------
 * 8. Animated Stat Counters
 * --------------------------------------------------------- */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  if (!statNumbers.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 1200;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            el.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${prefix}${Math.floor(count)}${suffix}`;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));
}

