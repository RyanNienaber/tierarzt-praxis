/**
 * Tierarztpraxis Aurelia - Interaktivitäts-Skript
 * Steuert:
 * 1. Sticky Header & Mobil-Menü
 * 2. Testimonial-Slider (Karussell)
 * 3. Impressum- & Datenschutz-Modals
 * 4. Kontaktformular-Validierung & Simulation
 * 5. Mehrstufiger Terminbuchungs-Assistent (Wizard)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. STICKY HEADER & MOBILE-MENÜ
  // ==========================================
  const header = document.getElementById('mainHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-item');

  // Sticky Header beim Scrollen aktivieren
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobil-Menü ein- und ausblenden
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
  });

  // Menü schließen, wenn ein Link geklickt wird
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    });
  });


  // ==========================================
  // 2. TESTIMONIAL-SLIDER (KARUSSELL)
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;
  let autoplayTimer;

  function showSlide(index) {
    // Index-Grenzen prüfen
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Alle Slides deaktivieren, die aktive aktivieren
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Event Listener für Controls
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Event Listener für Dots
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      showSlide(index);
      resetAutoplay();
    });
  });

  // Autoplay starten
  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 6000); // Alle 6 Sekunden
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();


  // ==========================================
  // 3. IMPRESSUM- & DATENSCHUTZ-MODALS
  // ==========================================
  const impressumLink = document.getElementById('impressumLink');
  const datenschutzLink = document.getElementById('datenschutzLink');
  const impressumModal = document.getElementById('impressumModal');
  const datenschutzModal = document.getElementById('datenschutzModal');
  const impressumClose = document.getElementById('impressumClose');
  const datenschutzClose = document.getElementById('datenschutzClose');

  function openLegalModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Scrollen der Hauptseite verhindern
  }

  function closeLegalModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (impressumLink && impressumModal) {
    impressumLink.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal(impressumModal);
    });
    impressumClose.addEventListener('click', () => closeLegalModal(impressumModal));
    impressumModal.addEventListener('click', (e) => {
      if (e.target === impressumModal) closeLegalModal(impressumModal);
    });
  }

  if (datenschutzLink && datenschutzModal) {
    datenschutzLink.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal(datenschutzModal);
    });
    datenschutzClose.addEventListener('click', () => closeLegalModal(datenschutzModal));
    datenschutzModal.addEventListener('click', (e) => {
      if (e.target === datenschutzModal) closeLegalModal(datenschutzModal);
    });
  }


  // ==========================================
  // 4. KONTAKTFORMULAR-VALIDIERUNG & SIMULATION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const contactSuccessAlert = document.getElementById('contactSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Felder abrufen
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');
      const privacyInput = document.getElementById('contactPrivacy');

      // Fehlerelemente
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const subjectError = document.getElementById('subjectError');
      const messageError = document.getElementById('messageError');
      const privacyError = document.getElementById('privacyError');

      let isValid = true;

      // Name validieren
      if (!nameInput.value.trim()) {
        showError(nameInput, nameError);
        isValid = false;
      } else {
        hideError(nameInput, nameError);
      }

      // E-Mail validieren
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        showError(emailInput, emailError);
        isValid = false;
      } else {
        hideError(emailInput, emailError);
      }

      // Betreff validieren
      if (!subjectInput.value.trim()) {
        showError(subjectInput, subjectError);
        isValid = false;
      } else {
        hideError(subjectInput, subjectError);
      }

      // Nachricht validieren
      if (!messageInput.value.trim()) {
        showError(messageInput, messageError);
        isValid = false;
      } else {
        hideError(messageInput, messageError);
      }

      // Datenschutz validieren
      if (!privacyInput.checked) {
        privacyError.style.display = 'block';
        isValid = false;
      } else {
        privacyError.style.display = 'none';
      }

      // Wenn alles gültig ist, Senden simulieren
      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet...';

        setTimeout(() => {
          contactForm.style.opacity = '0';
          setTimeout(() => {
            contactForm.style.display = 'none';
            contactSuccessAlert.classList.add('active');
          }, 300);
        }, 1200); // Künstliche Verzögerung für Premium-Gefühl
      }
    });

    // Validierungshelfer
    function showError(input, errorElement) {
      input.parentElement.classList.add('invalid');
      errorElement.style.display = 'block';
    }

    function hideError(input, errorElement) {
      input.parentElement.classList.remove('invalid');
      errorElement.style.display = 'none';
    }
  }


  // ==========================================
  // 5. TERMINBUCHUNGS-ASSISTENT (WIZARD)
  // ==========================================
  const headerCtaBtn = document.getElementById('headerCtaBtn');
  const heroBookBtn = document.getElementById('heroBookBtn');
  const bookingModal = document.getElementById('bookingModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const wizardForm = document.getElementById('bookingWizardForm');

  // Modal öffnen
  function openBookingModal() {
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      initWizard();
    }
  }

  // Modal schließen
  function closeBookingModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
      // Wizard nach kurzer Pause zurücksetzen, damit der Übergang sauber bleibt
      setTimeout(resetWizard, 400);
    }
  }

  if (headerCtaBtn) headerCtaBtn.addEventListener('click', openBookingModal);
  if (heroBookBtn) heroBookBtn.addEventListener('click', openBookingModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeBookingModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  // WIZARD-STEUERUNG
  let currentStep = 1;
  const totalSteps = 4; // Der 5. Schritt ist die reine Erfolgsseite

  const panes = document.querySelectorAll('.wizard-pane');
  const progressSteps = document.querySelectorAll('.progress-step');
  const progressFill = document.getElementById('wizardProgressFill');
  const backBtn = document.getElementById('wizardBackBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const modalFooter = document.getElementById('modalFooter');

  function initWizard() {
    currentStep = 1;
    updateWizardUI();
    // Heutiges Datum als Mindestdatum festlegen
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
      generateTimeSlots(today);
    }
  }

  function updateWizardUI() {
    // Blenden-Wechsel
    panes.forEach(pane => {
      pane.classList.remove('active');
      if (parseInt(pane.getAttribute('data-step')) === currentStep) {
        pane.classList.add('active');
      }
    });

    // Fortschritts-Anzeige aktualisieren
    progressSteps.forEach(step => {
      const stepNum = parseInt(step.getAttribute('data-step'));
      step.classList.remove('active', 'completed');
      
      if (stepNum === currentStep) {
        step.classList.add('active');
      } else if (stepNum < currentStep) {
        step.classList.add('completed');
      }
    });

    // Balkenfüllung berechnen
    const fillPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    if (progressFill) progressFill.style.width = `${fillPercent}%`;

    // Footer-Buttons anpassen
    if (currentStep === 1) {
      backBtn.style.display = 'none';
      nextBtn.textContent = 'Weiter \u2192';
    } else if (currentStep === totalSteps) {
      backBtn.style.display = 'inline-block';
      nextBtn.textContent = 'Termin anfragen';
    } else if (currentStep > totalSteps) {
      // Erfolgsseite: Footer komplett ausblenden
      modalFooter.style.display = 'none';
    } else {
      backBtn.style.display = 'inline-block';
      nextBtn.textContent = 'Weiter \u2192';
    }
  }

  function validateStep(step) {
    const errorEl = document.getElementById(`step${step}Error`);
    if (errorEl) errorEl.style.display = 'none';

    if (step === 1) {
      const animalSelected = wizardForm.querySelector('input[name="animalType"]:checked');
      if (!animalSelected) {
        if (errorEl) errorEl.style.display = 'block';
        return false;
      }
    } 
    else if (step === 2) {
      const reasonSelected = wizardForm.querySelector('input[name="bookingReason"]:checked');
      if (!reasonSelected) {
        if (errorEl) errorEl.style.display = 'block';
        return false;
      }
    } 
    else if (step === 3) {
      const dateVal = document.getElementById('bookingDate').value;
      const slotVal = document.getElementById('selectedTimeSlot').value;
      const doctorSelected = wizardForm.querySelector('input[name="preferredDoctor"]:checked');

      if (!dateVal || !slotVal || !doctorSelected) {
        if (errorEl) errorEl.style.display = 'block';
        return false;
      }
    } 
    else if (step === 4) {
      const ownerName = document.getElementById('ownerName').value.trim();
      const patientName = document.getElementById('patientName').value.trim();
      const ownerEmail = document.getElementById('ownerEmail').value.trim();
      const ownerPhone = document.getElementById('ownerPhone').value.trim();
      const privacyChecked = document.getElementById('bookingPrivacy').checked;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!ownerName || !patientName || !ownerPhone || !emailRegex.test(ownerEmail) || !privacyChecked) {
        if (errorEl) errorEl.style.display = 'block';
        return false;
      }
    }

    return true;
  }

  // Button-Klicks weiterleiten
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          currentStep++;
          updateWizardUI();
        } else {
          // Abgeschickt! Zeige Erfolgs-Pane
          submitBooking();
        }
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  }

  // DYNAMISCHE ZEITSLOTS GENERIEREN
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    dateInput.addEventListener('change', (e) => {
      // Slot-Auswahl zurücksetzen bei Datumsänderung
      document.getElementById('selectedTimeSlot').value = '';
      generateTimeSlots(e.target.value);
    });
  }

  function generateTimeSlots(dateString) {
    const slotsGrid = document.getElementById('timeSlotsGrid');
    if (!slotsGrid) return;

    slotsGrid.innerHTML = ''; // Leeren

    // Mögliche Zeitslots
    const availableSlots = [
      '08:30', '09:15', '10:00', '10:45', '11:30',
      '14:00', '14:45', '15:30', '16:15', '17:00'
    ];

    const todayString = new Date().toISOString().split('T')[0];
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    // Wir simulieren willkürliche belegte Slots, um das System lebendig wirken zu lassen
    // Verwende den Wochentag oder das Datum als Seed für Konsistenz an diesem Tag
    const dateSeed = new Date(dateString).getDate() || 1;

    availableSlots.forEach((time, index) => {
      const [hour, minute] = time.split(':').map(Number);
      let isDisabled = false;

      // 1. In der Vergangenheit liegende Slots am heutigen Tag sperren
      if (dateString === todayString) {
        if (hour < currentHour || (hour === currentHour && minute <= currentMinute)) {
          isDisabled = true;
        }
      }

      // 2. Künstlich belegte Slots simulieren (z.B. basierend auf deterministischem Seed)
      if ((index + dateSeed) % 3 === 0) {
        isDisabled = true;
      }

      const slotBtn = document.createElement('button');
      slotBtn.type = 'button';
      slotBtn.className = 'time-slot-btn';
      slotBtn.textContent = time;

      if (isDisabled) {
        slotBtn.classList.add('disabled');
        slotBtn.disabled = true;
        slotBtn.title = 'Belegt';
      } else {
        slotBtn.addEventListener('click', () => {
          // Alle anderen deselektieren
          document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
          // Diesen selektieren
          slotBtn.classList.add('selected');
          // In Hidden-Input speichern
          document.getElementById('selectedTimeSlot').value = time;
        });
      }

      slotsGrid.appendChild(slotBtn);
    });

    if (slotsGrid.children.length === 0 || Array.from(slotsGrid.querySelectorAll('.disabled')).length === availableSlots.length) {
      slotsGrid.innerHTML = '<div class="text-muted text-center padding-sm full-width">An diesem Tag sind leider keine Termine mehr frei.</div>';
    }
  }

  // WIZARD ZUSAMMENFASSUNG & ABSCHLUSS
  function submitBooking() {
    // Werte auslesen für Zusammenfassung
    const animalType = wizardForm.querySelector('input[name="animalType"]:checked').value;
    const petName = document.getElementById('patientName').value;
    const bookingReason = wizardForm.querySelector('input[name="bookingReason"]:checked').value;
    const bookingDate = document.getElementById('bookingDate').value;
    const bookingTime = document.getElementById('selectedTimeSlot').value;
    const preferredDoctor = wizardForm.querySelector('input[name="preferredDoctor"]:checked').value;
    const ownerEmail = document.getElementById('ownerEmail').value;

    // Übersetzungen für schönes UI
    const animalsMap = { hund: 'Hund', katze: 'Katze', kleintier: 'Kleintier', vogel_exot: 'Vogel / Exot' };
    const reasonsMap = {
      vorsorge: 'Vorsorge & Impfung',
      zahnsanierung: 'Zahnmedizinische Beratung',
      behandlung: 'Allgemeine Behandlung',
      op_beratung: 'OP-Beratung'
    };
    const docsMap = { beliebig: 'Beliebiger Tierarzt', sommer: 'Dr. Aurelia Sommer', winter: 'Dr. Lukas Winter' };

    // Formatierung des Datums
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(bookingDate).toLocaleDateString('de-DE', dateOptions);

    // Werte ins Erfolgs-Pane eintragen
    document.getElementById('sumPetInfo').textContent = `${animalsMap[animalType]} (${petName})`;
    document.getElementById('sumReasonInfo').textContent = reasonsMap[bookingReason];
    document.getElementById('sumTimeInfo').textContent = `${formattedDate} um ${bookingTime} Uhr`;
    document.getElementById('sumDocInfo').textContent = docsMap[preferredDoctor];
    document.getElementById('sumEmailInfo').textContent = ownerEmail;

    // Zum 5. Schritt (Erfolg) wechseln
    currentStep = 5;
    updateWizardUI();
  }

  function resetWizard() {
    wizardForm.reset();
    document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('selectedTimeSlot').value = '';
    
    // Fehler verstecken
    for (let i = 1; i <= 4; i++) {
      const err = document.getElementById(`step${i}Error`);
      if (err) err.style.display = 'none';
    }

    currentStep = 1;
    modalFooter.style.display = 'flex';
    updateWizardUI();
  }

});
