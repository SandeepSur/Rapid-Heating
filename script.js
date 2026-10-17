/**
 * Rapid Heating - Interactive Landing Page Scripts
 * Handles Fade-In Animation, Counter Animations, Modal & Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCounterAnimation();
  initStatsBarObserver();
  initProgressBarsObserver();
  initTrustCardsObserver();
  initServicesCardsObserver();
  initReviewsCardsObserver();
  initVideoModal();
  initMobileMenu();
  initDatePicker();
});

/**
 * Animated number counter for the Hero 1.6K+ and 3K+ stats
 */
function initHeroCounterAnimation() {
  const counters = document.querySelectorAll('.hero-stats .counter');
  
  // Delay slightly to synchronize with the fade-in entrance
  setTimeout(() => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const duration = 1600; // ms
      const startTime = performance.now();
      const isDecimal = target % 1 !== 0;

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quad
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = (target * easeProgress);

        if (isDecimal) {
          counter.textContent = currentVal.toFixed(1);
        } else {
          counter.textContent = Math.floor(currentVal);
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = isDecimal ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }, 600);
}

/**
 * Intersection Observer for Stats Counter Bar Section
 * Counts up: 30 Years of service, 25k+ Projects completed, 10 Service awards, 191 Expert plumbers
 */
function initStatsBarObserver() {
  const statsSection = document.querySelector('.stats-counter-bar');
  if (!statsSection) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateStatsBarNumbers();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsSection);
}

function animateStatsBarNumbers() {
  const counters = document.querySelectorAll('.counter-num');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(target * ease);

      counter.textContent = val;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(step);
  });
}

/**
 * Intersection Observer for Skills Progress Bars:
 * Fills up: Boiler Repairs: 95%, Emergency Call-Outs: 90%, Customer Satisfaction: 98%
 */
function initProgressBarsObserver() {
  const aboutSection = document.querySelector('.about-help-section');
  if (!aboutSection) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateProgressBars();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(aboutSection);
}

function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  progressBars.forEach((bar, index) => {
    const percent = bar.getAttribute('data-percent') || '0';
    setTimeout(() => {
      bar.style.width = percent + '%';
    }, index * 150);
  });
}

/**
 * Video Modal Dialog logic
 */
function initVideoModal() {
  const watchIntroBtn = document.getElementById('watchIntroBtn');
  const modal = document.getElementById('videoModal');

  if (watchIntroBtn && modal) {
    watchIntroBtn.addEventListener('click', () => {
      openVideoModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}

function openVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoPlayer');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoPlayer');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Stop video playback by resetting src
    if (iframe) {
      const currentSrc = iframe.src;
      iframe.src = currentSrc;
    }
  }
}

/**
 * Form Submission & Toast Notification
 */
function handleBookingSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const phoneInput = document.getElementById('userPhone');
  const serviceInput = document.getElementById('serviceType');
  const submitBtn = document.getElementById('submitBtn');

  // Provide tactile feedback
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `<span>Booking Appointment...</span>`;

  setTimeout(() => {
    // Show toast
    showToast(`Thank you, ${nameInput.value}! Your appointment request has been received.`);
    
    // Reset form
    document.getElementById('bookingForm').reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }, 750);
}

/**
 * Handle Book Your Engineer (Main Quote Form) submission
 */
function handleMainQuoteSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('quoteName');
  const submitBtn = document.getElementById('mainQuoteSubmitBtn');

  // Provide tactile feedback
  submitBtn.disabled = true;
  const originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = `<span>Sending Request...</span>`;

  setTimeout(() => {
    // Show toast
    const customerName = nameInput ? nameInput.value : 'Customer';
    showToast(`Thank you, ${customerName}! Your free quote request has been sent. We'll be in touch shortly.`);

    // Reset form
    document.getElementById('mainQuoteForm').reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;
  }, 750);
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  if (message) {
    const textElem = toast.querySelector('.toast-body p');
    if (textElem) textElem.textContent = message;
  }

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/**
 * Mobile navigation toggle
 */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isVisible = menu.style.display === 'flex';
      menu.style.display = isVisible ? 'none' : 'flex';
    });

    // Close menu when clicking link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.style.display = 'none';
      });
    });
  }
}

/**
 * Intersection Observer for Trust Feature Cards
 * Staggered fade in & slide up when scrolled into view
 */
function initTrustCardsObserver() {
  const cards = document.querySelectorAll('.trust-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}

/**
 * Intersection Observer for Services 3x2 Grid Cards
 * Staggered fade in & slide up when scrolled into view
 */
function initServicesCardsObserver() {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find index of card among siblings for staggered cascade
        const parent = entry.target.parentElement;
        const index = Array.from(parent.children).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, (index % 3) * 120 + Math.floor(index / 3) * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => observer.observe(card));
}

/**
 * Intersection Observer for Google Reviews 3x2 Grid Cards
 * Staggered cascade fade in & slide up when scrolled into view
 */
function initReviewsCardsObserver() {
  const cards = document.querySelectorAll('.review-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const index = Array.from(parent.children).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, (index % 3) * 100 + Math.floor(index / 3) * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

/**
 * Initialize date picker min value to today
 */
function initDatePicker() {
  const dateInput = document.getElementById('quoteDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
}

/**
 * Quick Service selector when clicking 'Book Service' in cards
 * Synchronizes both Hero appointment form and the Main Quote Form
 */
function selectServiceInForm(serviceKey) {
  const heroSelect = document.getElementById('serviceType');
  const quoteSelect = document.getElementById('quoteService');

  if (heroSelect && serviceKey) {
    heroSelect.value = serviceKey;
    heroSelect.style.borderColor = 'var(--color-red)';
    setTimeout(() => {
      heroSelect.style.borderColor = '';
    }, 2000);
  }

  if (quoteSelect && serviceKey) {
    quoteSelect.value = serviceKey;
    quoteSelect.style.borderColor = 'var(--color-red)';
    setTimeout(() => {
      quoteSelect.style.borderColor = '';
    }, 2000);
  }
}

/**
 * Replay Entrance Animations on demand
 */
function replayAnimations() {
  const wrapper = document.querySelector('.page-wrapper');
  if (!wrapper) return;

  // Reset progress bars
  document.querySelectorAll('.progress-bar-fill').forEach(bar => {
    bar.style.width = '0%';
  });

  // Reset trust cards
  document.querySelectorAll('.trust-card').forEach(card => {
    card.classList.remove('revealed');
  });

  // Reset service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.classList.remove('revealed');
  });

  // Reset review cards
  document.querySelectorAll('.review-card').forEach(card => {
    card.classList.remove('revealed');
  });

  // Add temporary reanimating class to flush CSS animations
  wrapper.classList.add('reanimating');
  
  // Force DOM reflow
  void wrapper.offsetWidth;

  setTimeout(() => {
    wrapper.classList.remove('reanimating');
    initHeroCounterAnimation();
    animateStatsBarNumbers();
    animateProgressBars();
    initTrustCardsObserver();
    initServicesCardsObserver();
    initReviewsCardsObserver();
  }, 100);
}

/**
 * Service Details Data for 'Know More' modal
 */
const serviceDetailsData = {
  'general-plumbing': {
    title: 'General Plumbing Repairs',
    tag: 'Domestic & Commercial Plumbing',
    desc: 'From persistent leaks to emergency burst pipes and faulty fixtures, our qualified local plumbers provide prompt, dependable repairs that solve the root cause.',
    features: [
      'Fast burst pipe & emergency leak repair',
      'Tap repairs, replacements, and dripping tap fixes',
      'Toilet flush systems, siphons, and cistern repairs',
      'Blocked sinks, waste traps, and slow-running drains',
      'Radiator valve fixes and isolation shut-off installs'
    ]
  },
  'boiler-installation': {
    title: 'Boiler Installation & Repair',
    tag: 'Gas Safe Heating Specialists',
    desc: 'Keep your home warm all winter. We troubleshoot boiler breakdown codes fast and install A-rated, energy-efficient modern boilers with manufacturer warranties.',
    features: [
      'Rapid breakdown response with diagnostic fault-finding',
      'High-efficiency combi, system & regular boiler swaps',
      'Accredited installers for Worcester Bosch, Vaillant & Ideal',
      'Full system chemical power flush and magnetic filter',
      'Up to 10-12 year manufacturer warranties included'
    ]
  },
  'commercial-catering': {
    title: 'Commercial Catering Gas Safety Certificate',
    tag: 'Commercial Kitchen Compliance',
    desc: 'Ensure your restaurant, pub, hotel, or food business stays fully compliant with HSE regulations and local council safety guidelines through our thorough commercial inspections.',
    features: [
      'Comprehensive inspection of commercial ranges, fryers & ovens',
      'Gas Interlock System (GIS) testing and safety verification',
      'Air extraction canopy & flue ventilation proving',
      'Emergency gas shut-off valve pressure testing',
      'Digital commercial certificate issued on the same day'
    ]
  },
  'landlord-cp12': {
    title: 'Landlord Gas Safety Certificate (CP12)',
    tag: 'Legal Property Compliance',
    desc: 'UK law requires landlords to hold an annual Gas Safety Certificate (CP12). We carry out certified checks and provide instant digital copies for you and your letting agents.',
    features: [
      'Complete gas pipework soundness & tightness testing',
      'Boiler, gas fire, and cooker operation & safety device checks',
      'Flue combustion analysis & carbon monoxide risk audit',
      'Meter inspection and emergency control valve test',
      'Automated annual reminder service so you never miss a renewal'
    ]
  },
  'epc-certificate': {
    title: 'EPC (Energy Performance Certificate)',
    tag: 'Energy Efficiency Assessment',
    desc: 'Legally required when selling or letting residential or commercial property. Our accredited assessors deliver precise assessments with practical advice to boost your rating.',
    features: [
      'Accredited domestic and commercial energy assessments',
      'Detailed survey of insulation, glazing, and heating efficiency',
      'Official government registry upload (valid for 10 years)',
      'Actionable recommendations to lower energy bills and carbon footprint',
      'Quick turnaround with electronic certificates provided promptly'
    ]
  },
  'gas-hob-cooker': {
    title: 'Gas Hob & Cooker Installation',
    tag: 'Safe Appliance Fitting',
    desc: 'Installing a gas cooking appliance requires certified Gas Safe expertise. We ensure your new hob or cooker is plumbed, leak-tested, and commissioned to the highest safety standard.',
    features: [
      'Safe disconnection of existing gas appliances',
      'New approved micromesh bayonet hose & stability chain fitting',
      'Burner pressure testing and flame failure device (FFD) check',
      'Full gas tightness test of household pipework before & after',
      'Official Gas Safe installation documentation provided'
    ]
  }
};

let currentModalServiceKey = 'general-plumbing';

/**
 * Open Service Detail Modal
 */
function openServiceDetailModal(serviceKey) {
  const modal = document.getElementById('serviceDetailModal');
  const data = serviceDetailsData[serviceKey];
  if (!modal || !data) return;

  currentModalServiceKey = serviceKey;

  // Populate data
  document.getElementById('modalServiceTitle').textContent = data.title;
  document.getElementById('modalServiceTag').textContent = data.tag;
  document.getElementById('modalServiceDesc').textContent = data.desc;

  // Copy icon from card
  const card = document.querySelector(`.service-card[data-service-key="${serviceKey}"]`);
  const modalIcon = document.getElementById('modalServiceIcon');
  if (card && modalIcon) {
    const iconSvg = card.querySelector('.service-icon-wrap svg');
    if (iconSvg) {
      modalIcon.innerHTML = iconSvg.outerHTML;
    }
  }

  // Populate features list
  const listElem = document.getElementById('modalServiceList');
  if (listElem) {
    listElem.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close Service Detail Modal
 */
function closeServiceDetailModal() {
  const modal = document.getElementById('serviceDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Book directly from inside the Service Details Modal
 */
function bookFromModal() {
  closeServiceDetailModal();
  selectServiceInForm(currentModalServiceKey);
  const formSection = document.getElementById('appointment-form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Close detail modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeServiceDetailModal();
  }
});

/**
 * Toggle FAQ Accordion Cards
 */
function toggleFaq(btn) {
  const card = btn.closest('.faq-card');
  if (!card) return;

  const isActive = card.classList.contains('active');

  // Close all other accordion cards (accordion mode)
  document.querySelectorAll('.faq-card').forEach(c => {
    if (c !== card) {
      c.classList.remove('active');
      const b = c.querySelector('.faq-question-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  });

  // Toggle clicked card
  if (isActive) {
    card.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  } else {
    card.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
  }
}





