/**
 * Pulsenmore AFV-Dynamic Study Training Web Application
 * Comprehensive Interactive Controller & Clinical Simulator
 */

// ==========================================
// 1. Audio Synthesizer (Web Audio API)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.heartbeatInterval = null;
    this.soundEnabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.innerHTML = this.soundEnabled 
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08"></path></svg> Sound: ON'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> Sound: OFF';
      soundBtn.classList.toggle('active', this.soundEnabled);
    }
    if (!this.soundEnabled && this.heartbeatInterval) {
      this.stopHeartbeat();
    }
  }

  playClick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  }

  playWhoosh() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch(e) {}
  }

  playBeep(freq = 440, dur = 0.1) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch(e) {}
  }

  startHeartbeat() {
    if (!this.soundEnabled || this.heartbeatInterval) return;
    this.init();
    if (!this.ctx) return;
    const beat = () => {
      if (!this.soundEnabled) return;
      try {
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(95, this.ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.08);
        gain1.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.start();
        osc1.stop(this.ctx.currentTime + 0.08);

        setTimeout(() => {
          if (!this.soundEnabled || !this.ctx) return;
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(80, this.ctx.currentTime);
          osc2.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.09);
          gain2.gain.setValueAtTime(0.16, this.ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.09);
          osc2.connect(gain2);
          gain2.connect(this.ctx.destination);
          osc2.start();
          osc2.stop(this.ctx.currentTime + 0.09);
        }, 130);
      } catch(e) {}
    };

    beat();
    this.heartbeatInterval = setInterval(beat, 430); // ~140 bpm
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}

const audioFX = new SoundFX();

// ==========================================
// 2. 13-Slide Definition & Interactive Data
// ==========================================
const SLIDES_DATA = [
  {
    id: 1,
    title: "Welcome & Mode Selection",
    subtitle: "Select your training track to initialize the study protocol",
    screenClass: "screen-welcome",
    lightTheme: true,
    callout: {
      text: "Welcome to Pulsenmore Training! Select your study mode (App-Guided vs Clinician-Guided) to start.",
      caret: "caret-top",
      style: "top: 15px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Clinical Protocol Context",
      body: "The AFV-Dynamic Study evaluates at-home amniotic fluid quantification using automated guidance versus clinician tele-guidance."
    }
  },
  {
    id: 2,
    title: "Dashboard & Scan Preparation",
    subtitle: "Review gestational parameters and probe battery status",
    screenClass: "screen-dashboard",
    lightTheme: true,
    callout: {
      text: "Check your active scan window (Week 22). When ready, tap the coral 'Proceed to Scan' button!",
      caret: "caret-bottom",
      style: "bottom: 120px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Preparation Checklist",
      body: "Ensure your phone battery is >50%, probe is paired via BLE, and water-soluble ultrasound gel is within reach."
    }
  },
  {
    id: 3,
    title: "Part 1: Fetal Well-Being Check",
    subtitle: "General fetal cardiac & movement baseline assessment",
    screenClass: "screen-prep-intro",
    lightTheme: true,
    callout: {
      text: "Part 1 records a 25-second baseline check to detect fetal cardiac motion before AFV measurements.",
      caret: "caret-top",
      style: "top: 60px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Audio Feedback Script",
      body: "The app delivers spoken auditory prompts guiding probe placement and reassuring the mother when fetal movement is noted."
    }
  },
  {
    id: 4,
    title: "Part 1: Live In-Scan Ultrasound",
    subtitle: "Real-time acoustic coupling, dual-view & pressure feedback",
    screenClass: "screen-scan-dualview",
    lightTheme: false,
    callout: {
      text: "Dual-View display: Belly map guides position while live B-mode ultrasound renders fetal structures below.",
      caret: "caret-top",
      style: "top: 210px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Acoustic Coupling Rule",
      body: "Maintain gentle, continuous contact. The pressure banner turns green when acoustic contact is optimal."
    }
  },
  {
    id: 5,
    title: "Part 1: Post-Scan Feedback",
    subtitle: "Immediate telemetry review and signal quality metrics",
    screenClass: "screen-prep-intro",
    lightTheme: true,
    callout: {
      text: "Progress indicator confirms scan completion. Tap 'Continue' to advance to the specialized AFV scan.",
      caret: "caret-bottom",
      style: "bottom: 110px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Signal Quality Check",
      body: "Automated algorithms verify >90% clear B-mode frames before permitting progression to AFV sweeps."
    }
  },
  {
    id: 6,
    title: "Part 2: AFV Physiological Rationale",
    subtitle: "The 'Displaced Water' effect and maternal posture",
    screenClass: "screen-prep-intro",
    lightTheme: true,
    callout: {
      text: "In advanced pregnancy, the fetus displaces fluid to the flanks. Recline lower so gravity pools fluid laterally!",
      caret: "caret-top",
      style: "top: 60px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Physiological Principle",
      body: "A horizontal abdomen allows fluid to pool at the lateral flanks, exposing clear echo-free vertical pockets (DVP)."
    }
  },
  {
    id: 7,
    title: "The Golden Rule: Transducer Orientation",
    subtitle: "Interactive Tilt Simulator: 90° Perpendicular vs Curved Angle",
    screenClass: "screen-scan-dualview",
    lightTheme: false,
    callout: {
      text: "GOLDEN RULE: Do NOT curve the probe with your belly! Keep it strictly perpendicular (90°) to the ground.",
      caret: "caret-bottom",
      style: "bottom: 120px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Preventing False Oligohydramnios",
      body: "Tilting the probe foreshortens pocket dimensions. True vertical measurement requires 90° probe alignment."
    }
  },
  {
    id: 8,
    title: "4-Quadrant Systematic Sweep Protocol",
    subtitle: "Guided pacing from lateral flank to midline across RUQ, LUQ, RLQ, LLQ",
    screenClass: "screen-prep-intro",
    lightTheme: true,
    callout: {
      text: "Divide abdomen into 4 quadrants. Sweep slowly from outer flank to midline over 5-10 seconds per quadrant.",
      caret: "caret-top",
      style: "top: 20px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Quadrant Demarcation",
      body: "The umbilicus and linea nigra divide the 4 anatomical quadrants from fundus down to symphysis pubis."
    }
  },
  {
    id: 9,
    title: "AFV Post-Practice Quality Validation",
    subtitle: "Verifying quadrant coverage & flank gel application",
    screenClass: "screen-prep-intro",
    lightTheme: true,
    callout: {
      text: "Technique review confirms all 4 sweeps completed with accurate perpendicular probe angle.",
      caret: "caret-bottom",
      style: "bottom: 100px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Flank Gel Reminder",
      body: "Ensure generous gel along the lateral abdomen where probe initiates each quadrant sweep."
    }
  },
  {
    id: 10,
    title: "Encrypted Cloud Data Transmission",
    subtitle: "Real-time DICOM video upload to clinician overread portal",
    screenClass: "screen-uploading",
    lightTheme: false,
    callout: {
      text: "Do NOT close or minimize the app during upload! Secure sync ensures clinician receives full scan clips.",
      caret: "caret-bottom",
      style: "bottom: 80px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Security & Compliance",
      body: "Ultrasound streams are encrypted with TLS 1.3 / AES-256 in full compliance with HIPAA and GDPR standards."
    }
  },
  {
    id: 11,
    title: "Cloud Sync Complete & Notification",
    subtitle: "Remote clinical triage and asynchronous overread workflow",
    screenClass: "screen-upload-complete",
    lightTheme: false,
    callout: {
      text: "Upload successful! Your clinician has been alerted and will review the deep vertical pockets within 2 hours.",
      caret: "caret-bottom",
      style: "bottom: 100px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Clinical Overread Protocol",
      body: "Clinicians measure the Deepest Vertical Pocket (DVP) or Amniotic Fluid Index (AFI) remotely within the portal."
    }
  },
  {
    id: 12,
    title: "Clinical Protocol Knowledge Check",
    subtitle: "Interactive quiz to validate training proficiency",
    screenClass: "screen-quiz",
    lightTheme: true,
    callout: {
      text: "Answer all 3 questions correctly to demonstrate mastery of the AFV protocol and unlock your certificate!",
      caret: "caret-top",
      style: "top: 10px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Interactive Assessment",
      body: "Clinical studies require confirmed participant competency before dispensing at-home ultrasound kits."
    }
  },
  {
    id: 13,
    title: "Training Completed & Certified",
    subtitle: "You are certified to conduct at-home AFV-Dynamic scans",
    screenClass: "screen-completion",
    lightTheme: true,
    callout: {
      text: "Congratulations! You have completed the Pulsenmore AFV Training. Review or download the protocol guide below.",
      caret: "caret-bottom",
      style: "bottom: 90px; left: 50%; transform: translateX(-50%);"
    },
    sideTip: {
      title: "Ready for Protocol Scans",
      body: "Access the Quick Clinical Guide anytime by clicking the button in the header or completion screen."
    }
  }
];

// ==========================================
// 3. Main Application Controller Class
// ==========================================
class TrainingApp {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 13;
    this.quizPassed = false;
    this.activeMode = 'ag'; // 'ag' = App-Guided, 'cg' = Clinician-Guided
    this.tiltAngle = 0; // 0 = 90 deg perpendicular (optimal)
    this.scanInterval = null;
    this.scanTime = 0;
    this.maxScanTime = 25;
    this.isScanning = false;
    this.activeQuadrant = 1;
    this.quadrantTimer = null;
    this.quadrantTimeLeft = 8;
    this.canvasAnimId = null;

    this.initElements();
    this.bindEvents();
    this.buildStepper();
    this.renderSlide(1);
    this.initCanvasSimulation();
  }

  initElements() {
    this.phoneScreen = document.getElementById('phone-screen');
    this.appViewport = document.getElementById('phone-app-viewport');
    this.stepperTrack = document.getElementById('stepper-track');
    this.stepperFill = document.getElementById('stepper-fill');
    this.stepCounter = document.getElementById('step-counter');
    this.btnPrev = document.getElementById('btn-nav-prev');
    this.btnNext = document.getElementById('btn-nav-next');
    this.slideTitle = document.getElementById('slide-title-text');
    this.slideSubtitle = document.getElementById('slide-subtitle-text');
    
    // Callouts
    this.floatingCallout = document.getElementById('floating-callout');
    this.calloutText = document.getElementById('callout-text');
    this.calloutCaret = document.getElementById('callout-caret');

    // Side Tips
    this.sideTipTitle = document.getElementById('side-tip-title');
    this.sideTipBody = document.getElementById('side-tip-body');

    // Clinical Modal
    this.modalOverlay = document.getElementById('clinical-modal-overlay');
  }

  buildStepper() {
    if (!this.stepperTrack) return;
    this.stepperTrack.querySelectorAll('.stepper-node').forEach(n => n.remove());
    
    for (let i = 1; i <= this.totalSteps; i++) {
      const node = document.createElement('div');
      node.className = `stepper-node ${i === 1 ? 'active' : ''}`;
      node.innerText = i;
      node.title = `Step ${i}: ${SLIDES_DATA[i - 1].title}`;
      node.addEventListener('click', () => {
        if (i <= this.currentStep || this.quizPassed || i === this.currentStep + 1) {
          audioFX.playClick();
          this.goToSlide(i);
        }
      });
      this.stepperTrack.appendChild(node);
    }
  }

  updateStepper() {
    const nodes = this.stepperTrack.querySelectorAll('.stepper-node');
    nodes.forEach((node, index) => {
      const stepNum = index + 1;
      node.classList.remove('active', 'completed');
      if (stepNum === this.currentStep) {
        node.classList.add('active');
      } else if (stepNum < this.currentStep) {
        node.classList.add('completed');
        node.innerHTML = '&#10003;';
      } else {
        node.innerText = stepNum;
      }
    });

    const progressPct = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
    if (this.stepperFill) {
      this.stepperFill.style.width = `${progressPct}%`;
    }
  }

  bindEvents() {
    // Navigation
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        audioFX.playClick();
        this.prevSlide();
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        audioFX.playClick();
        this.nextSlide();
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (this.currentStep < this.totalSteps && (this.currentStep !== 12 || this.quizPassed)) {
          this.nextSlide();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (this.currentStep > 1) {
          this.prevSlide();
        }
      } else if (e.key === 'Escape') {
        this.closeClinicalModal();
      }
    });

    // Sound toggle
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => audioFX.toggleSound());
    }

    // Clinical Guide Modal Open/Close
    const openGuideBtns = document.querySelectorAll('.btn-open-guide');
    openGuideBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audioFX.playClick();
        this.openClinicalModal();
      });
    });

    const closeGuideBtn = document.getElementById('modal-close-btn');
    if (closeGuideBtn) {
      closeGuideBtn.addEventListener('click', () => {
        audioFX.playClick();
        this.closeClinicalModal();
      });
    }

    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeClinicalModal();
        }
      });
    }

    // Modal Tabs
    const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
    modalTabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        audioFX.playClick();
        modalTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabKey = btn.getAttribute('data-tab');
        document.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
        const pane = document.getElementById(`tab-pane-${tabKey}`);
        if (pane) pane.classList.add('active');
      });
    });

    // Mode Selection on Slide 1
    const modeCards = document.querySelectorAll('.mode-card-btn');
    modeCards.forEach(card => {
      card.addEventListener('click', () => {
        audioFX.playClick();
        modeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.activeMode = card.getAttribute('data-mode');
        this.updateModeUI();
      });
    });

    // Proceed to Scan on Slide 2
    const btnProceed = document.getElementById('btn-proceed-scan');
    if (btnProceed) {
      btnProceed.addEventListener('click', () => {
        audioFX.playClick();
        this.goToSlide(3);
      });
    }

    // Slide 3 Ready button
    const btnPrepStart = document.getElementById('btn-prep-start');
    if (btnPrepStart) {
      btnPrepStart.addEventListener('click', () => {
        audioFX.playClick();
        this.goToSlide(4);
      });
    }

    // Slide 5 Continue button
    const btnPart1Continue = document.getElementById('btn-part1-continue');
    if (btnPart1Continue) {
      btnPart1Continue.addEventListener('click', () => {
        audioFX.playClick();
        this.goToSlide(6);
      });
    }

    // Slide 6 Start AFV button
    const btnStartAfv = document.getElementById('btn-start-afv');
    if (btnStartAfv) {
      btnStartAfv.addEventListener('click', () => {
        audioFX.playClick();
        this.goToSlide(7);
      });
    }

    // Slide 9 Upload button
    const btnProceedUpload = document.getElementById('btn-proceed-upload');
    if (btnProceedUpload) {
      btnProceedUpload.addEventListener('click', () => {
        audioFX.playClick();
        this.goToSlide(10);
      });
    }

    // Tilt Slider & Presets on Slide 7
    const tiltSlider = document.getElementById('tilt-slider');
    if (tiltSlider) {
      tiltSlider.addEventListener('input', (e) => {
        this.setTiltAngle(parseFloat(e.target.value));
      });
    }

    const presetChips = document.querySelectorAll('.preset-chip');
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        audioFX.playClick();
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const angle = parseFloat(chip.getAttribute('data-angle'));
        if (tiltSlider) tiltSlider.value = angle;
        this.setTiltAngle(angle);
      });
    });

    // 4 Quadrant Selector on Slide 8
    const quadBtns = document.querySelectorAll('.quad-btn-select');
    quadBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audioFX.playClick();
        const quadNum = parseInt(btn.getAttribute('data-quad'));
        this.selectQuadrant(quadNum);
      });
    });

    const btnStartSweep = document.getElementById('btn-start-sweep');
    if (btnStartSweep) {
      btnStartSweep.addEventListener('click', () => {
        audioFX.playWhoosh();
        this.startQuadrantSweep();
      });
    }

    // Quiz Submission on Slide 12
    const btnSubmitQuiz = document.getElementById('btn-quiz-submit');
    if (btnSubmitQuiz) {
      btnSubmitQuiz.addEventListener('click', () => {
        this.evaluateQuiz();
      });
    }

    // Restart Training on Slide 13
    const btnRestart = document.getElementById('btn-restart-training');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        audioFX.playSuccess();
        this.goToSlide(1);
      });
    }
  }

  updateModeUI() {
    const badge = document.getElementById('app-mode-badge');
    if (badge) {
      badge.innerText = this.activeMode === 'ag' ? 'App-Guided (AG)' : 'Clinician-Guided (CG)';
    }
  }

  setTiltAngle(angle) {
    this.tiltAngle = angle;
    const banner = document.getElementById('tilt-banner');
    const angleText = document.getElementById('tilt-angle-display');
    const probeRotator = document.getElementById('tilt-probe-visual');

    if (probeRotator) {
      probeRotator.style.transform = `rotate(${angle}deg)`;
    }

    if (angleText) {
      angleText.innerText = `${Math.round(90 + angle)}° (${angle > 0 ? '+' : ''}${Math.round(angle)}°)`;
    }

    const isOptimal = Math.abs(angle) <= 12;

    if (banner) {
      if (isOptimal) {
        banner.className = 'tilt-indicator-banner good';
        banner.innerHTML = '<span style="font-size:1.1rem;">&#10003;</span> <strong>YOU'RE DOING GREAT!</strong> - 90° Angle Maintained';
      } else {
        banner.className = 'tilt-indicator-banner warning';
        banner.innerHTML = '<span style="font-size:1.1rem;">&#9888;</span> <strong>KEEP IT LEVEL!</strong> - Tilt strictly 90° to ground';
      }
    }
  }

  selectQuadrant(quadNum) {
    this.activeQuadrant = quadNum;
    const cells = document.querySelectorAll('.quad-cell');
    cells.forEach(c => {
      const cNum = parseInt(c.getAttribute('data-quad'));
      c.classList.toggle('active-quad', cNum === quadNum);
    });

    const quadTitle = document.getElementById('active-quad-name');
    const quadNames = {
      1: "Quadrant 1: Right Upper Quadrant (RUQ)",
      2: "Quadrant 2: Left Upper Quadrant (LUQ)",
      3: "Quadrant 3: Right Lower Quadrant (RLQ)",
      4: "Quadrant 4: Left Lower Quadrant (LLQ)"
    };
    if (quadTitle) quadTitle.innerText = quadNames[quadNum] || `Quadrant ${quadNum}`;
  }

  startQuadrantSweep() {
    if (this.quadrantTimer) clearInterval(this.quadrantTimer);
    this.quadrantTimeLeft = 8;
    const timerDisplay = document.getElementById('sweep-countdown-pacer');
    const probeActor = document.getElementById('quad-probe-sweep-actor');
    const btn = document.getElementById('btn-start-sweep');

    if (btn) {
      btn.disabled = true;
      btn.innerText = "Sweeping...";
    }

    if (probeActor) {
      probeActor.style.transition = 'left 8s linear';
      probeActor.style.left = '80%';
    }

    this.quadrantTimer = setInterval(() => {
      this.quadrantTimeLeft--;
      if (timerDisplay) {
        timerDisplay.innerText = `${this.quadrantTimeLeft}s`;
      }
      if (this.quadrantTimeLeft <= 0) {
        clearInterval(this.quadrantTimer);
        this.quadrantTimer = null;
        audioFX.playSuccess();
        if (btn) {
          btn.disabled = false;
          btn.innerText = "Sweep Complete!";
        }
        if (probeActor) {
          setTimeout(() => {
            probeActor.style.transition = 'none';
            probeActor.style.left = '20%';
          }, 1000);
        }
        // Auto advance to next quadrant or slide
        if (this.activeQuadrant < 4) {
          setTimeout(() => {
            this.selectQuadrant(this.activeQuadrant + 1);
            if (btn) btn.innerText = "Start Quadrant Sweep";
          }, 1200);
        }
      }
    }, 1000);
  }

  evaluateQuiz() {
    const q1 = document.querySelector('input[name="quiz-q1"]:checked');
    const q2 = document.querySelector('input[name="quiz-q2"]:checked');
    const q3 = document.querySelector('input[name="quiz-q3"]:checked');
    const feedback = document.getElementById('quiz-feedback-msg');
    const btnSubmit = document.getElementById('btn-quiz-submit');

    if (!q1 || !q2 || !q3) {
      if (feedback) {
        feedback.style.color = '#ef4444';
        feedback.innerText = 'Please answer all 3 questions to continue.';
      }
      audioFX.playBeep(300, 0.2);
      return;
    }

    const isQ1Correct = q1.value === 'B';
    const isQ2Correct = q2.value === 'A';
    const isQ3Correct = q3.value === 'B';

    if (isQ1Correct && isQ2Correct && isQ3Correct) {
      this.quizPassed = true;
      audioFX.playSuccess();
      if (feedback) {
        feedback.style.color = '#22c55e';
        feedback.innerHTML = '&#10003; <strong>100% Correct!</strong> Protocol Mastery Confirmed.';
      }
      if (btnSubmit) {
        btnSubmit.classList.add('passed');
        btnSubmit.innerHTML = '&#10003; Quiz Passed - Proceed to Certificate';
      }
      if (this.btnNext) {
        this.btnNext.disabled = false;
      }
      setTimeout(() => {
        this.goToSlide(13);
      }, 1200);
    } else {
      audioFX.playBeep(220, 0.3);
      let errors = [];
      if (!isQ1Correct) errors.push('Q1: Probe angle must be 90° strictly perpendicular to the ground.');
      if (!isQ2Correct) errors.push('Q2: Fluid pools laterally in horizontal reclining.');
      if (!isQ3Correct) errors.push('Q3: Pacing is 5-10s per quadrant.');
      if (feedback) {
        feedback.style.color = '#ef4444';
        feedback.innerHTML = `<strong>Please Review:</strong> ${errors.join(' ')}`;
      }
    }
  }

  renderSlide(stepIndex) {
    const data = SLIDES_DATA[stepIndex - 1];
    if (!data) return;

    // Stop previous heartbeat or timers if leaving scan
    if (stepIndex !== 4) {
      audioFX.stopHeartbeat();
    } else {
      audioFX.startHeartbeat();
    }

    // Trigger simulation animations based on slide
    if (stepIndex === 10) {
      this.simulateUpload();
    } else if (stepIndex === 13) {
      this.launchConfetti();
    }

    // Set light or dark theme for smartphone frame
    if (this.phoneScreen) {
      if (data.lightTheme) {
        this.phoneScreen.classList.add('light-theme');
      } else {
        this.phoneScreen.classList.remove('light-theme');
      }
    }

    // Update Titles
    if (this.slideTitle) this.slideTitle.innerText = data.title;
    if (this.slideSubtitle) this.slideSubtitle.innerText = data.subtitle;

    // Toggle active slide screen
    const screens = document.querySelectorAll('.slide-screen');
    screens.forEach((screen, idx) => {
      if (idx + 1 === stepIndex) {
        screen.classList.add('active');
      } else {
        screen.classList.remove('active');
      }
    });

    // Update Red Callout Card
    if (this.floatingCallout && data.callout) {
      this.calloutText.innerHTML = data.callout.text;
      this.calloutCaret.className = `callout-caret ${data.callout.caret}`;
      this.floatingCallout.style.cssText = data.callout.style;
      this.floatingCallout.style.display = 'block';
    } else if (this.floatingCallout) {
      this.floatingCallout.style.display = 'none';
    }

    // Update Desktop Side Tip
    if (this.sideTipTitle && data.sideTip) {
      this.sideTipTitle.innerText = data.sideTip.title;
      this.sideTipBody.innerText = data.sideTip.body;
    }

    // Update Counter & Controls
    if (this.stepCounter) {
      this.stepCounter.innerText = `Step ${stepIndex} of ${this.totalSteps}`;
    }

    if (this.btnPrev) {
      this.btnPrev.disabled = stepIndex === 1;
    }

    if (this.btnNext) {
      if (stepIndex === 12 && !this.quizPassed) {
        this.btnNext.disabled = true;
        this.btnNext.innerHTML = 'Complete Quiz &rarr;';
      } else if (stepIndex === this.totalSteps) {
        this.btnNext.disabled = true;
        this.btnNext.innerHTML = 'Finished &#10003;';
      } else {
        this.btnNext.disabled = false;
        this.btnNext.innerHTML = 'Next &rarr;';
      }
    }

    this.updateStepper();
  }

  simulateUpload() {
    const bar = document.getElementById('upload-progress-fill');
    const label = document.getElementById('upload-progress-pct');
    if (!bar || !label) return;
    let pct = 0;
    const interval = setInterval(() => {
      pct += 4;
      if (pct > 100) pct = 100;
      bar.style.width = `${pct}%`;
      label.innerText = `${pct}%`;
      if (pct === 100) {
        clearInterval(interval);
        audioFX.playSuccess();
        setTimeout(() => {
          this.goToSlide(11);
        }, 800);
      }
    }, 80);
  }

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#e84a5f', '#0ea5e9', '#22c55e', '#f59e0b', '#a855f7', '#ec4899'];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 + 2,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 6 - 3
      });
    }

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });
      frame++;
      if (frame < 220) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    render();
  }

  goToSlide(index) {
    if (index < 1 || index > this.totalSteps) return;
    this.currentStep = index;
    this.renderSlide(this.currentStep);
  }

  nextSlide() {
    if (this.currentStep < this.totalSteps) {
      if (this.currentStep === 12 && !this.quizPassed) return;
      this.currentStep++;
      this.renderSlide(this.currentStep);
    }
  }

  prevSlide() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.renderSlide(this.currentStep);
    }
  }

  openClinicalModal() {
    if (this.modalOverlay) {
      this.modalOverlay.classList.add('active');
    }
  }

  closeClinicalModal() {
    if (this.modalOverlay) {
      this.modalOverlay.classList.remove('active');
    }
  }

  initCanvasSimulation() {
    const canvas = document.getElementById('live-ultrasound-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let waveOffset = 0;
    let speckleDots = [];
    for (let i = 0; i < 180; i++) {
      speckleDots.push({
        x: Math.random() * 280,
        y: Math.random() * 180,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    const drawUltrasound = () => {
      if (this.currentStep === 4 || this.currentStep === 7) {
        ctx.fillStyle = '#05070a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Acoustic fan shape
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 10);
        ctx.arc(canvas.width / 2, 10, 160, Math.PI * 0.2, Math.PI * 0.8, false);
        ctx.closePath();
        ctx.clip();

        // Ultrasound gradient background
        const fanGrad = ctx.createRadialGradient(canvas.width / 2, 10, 10, canvas.width / 2, 10, 160);
        fanGrad.addColorStop(0, 'rgba(30, 41, 59, 0.8)');
        fanGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.95)');
        fanGrad.addColorStop(1, '#000000');
        ctx.fillStyle = fanGrad;
        ctx.fill();

        // Speckle pattern
        speckleDots.forEach(dot => {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 240, ${dot.alpha * (Math.sin(waveOffset * 2 + dot.x) * 0.3 + 0.7)})`;
          ctx.fill();
        });

        // Fetal Heart / Fluid pocket outline
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, 85, 45, 30, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Echogenic core
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, 85, 40, 25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Doppler heartbeat wave at bottom of ultrasound
        ctx.beginPath();
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.8;
        for (let x = 10; x < canvas.width - 10; x++) {
          const relX = (x + waveOffset * 25) % 80;
          let y = 145;
          if (relX > 20 && relX < 35) {
            y = 145 - Math.sin((relX - 20) / 15 * Math.PI) * 18;
          }
          if (x === 10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Caliper depth markers
        ctx.fillStyle = '#64748b';
        ctx.font = '8px Outfit';
        for (let d = 2; d <= 12; d += 2) {
          ctx.fillText(`-${d}cm`, 8, 20 + d * 10);
        }

        ctx.restore();
        waveOffset += 0.04;
      }
      this.canvasAnimId = requestAnimationFrame(drawUltrasound);
    };

    drawUltrasound();
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TrainingApp();
});
