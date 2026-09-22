/* ==========================================================================
   "GONE OR STILL HERE?" — Museum Educational Web Game Engine
   Featuring Google Teachable Machine, SoundCN Audio Library, 18 Animal Cards,
   Snapchat-Style Fire Streaks, Hands-Free Auto-Timers & Large Kiosk Viewfinder
   ========================================================================== */

// Configurable Google Teachable Machine Model URL
let MODEL_URL = "https://teachablemachine.withgoogle.com/models/RuC2Z2LMr/";

// Detection Tuning
const CONFIDENCE_THRESHOLD = 0.80; // 80% confidence
const STABILITY_WINDOW_MS = 450;   // 450ms continuous stable detection

// ==========================================================================
// 18 ANIMAL CARDS POOL (10 EXTINCT + 8 ENDANGERED)
// ==========================================================================
const ALL_ANIMALS = [
  // --- 10 EXTINCT ANIMALS ---
  {
    id: "woolly-mammoth",
    name: "WOOLLY MAMMOTH",
    image: "assets/animals/woolly-mammoth.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (Ice Age)",
    hint: "I had giant curved ivory tusks and a thick shaggy woolly coat!",
    fact: "This Ice Age giant is gone. It roamed the icy northern steppes and vanished around 4,000 years ago as the Earth warmed.",
    era: "~4,000 years ago"
  },
  {
    id: "thylacine",
    name: "THYLACINE",
    image: "assets/animals/thylacine.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (Tasmanian Tiger)",
    hint: "I had distinct stripes across my back and a pouch like a kangaroo!",
    fact: "Also called the Tasmanian Tiger, this unique marsupial predator vanished in 1936 due to bounty hunting and habitat loss.",
    era: "Vanished in 1936"
  },
  {
    id: "cave-lion",
    name: "CAVE LION",
    image: "assets/animals/cave-lion.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (Ice Age)",
    hint: "One of the largest big cats ever, painted on ancient cave walls by early humans!",
    fact: "This massive predator was larger than modern African lions, hunting mammoths and reindeer across Eurasia during the Ice Age.",
    era: "~13,000 years ago"
  },
  {
    id: "great-auk",
    name: "GREAT AUK",
    image: "assets/animals/great-auk.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (1844)",
    hint: "A flightless North Atlantic swimmer that waddled and dived like a penguin!",
    fact: "This penguin-like seabird nested on rocky North Atlantic islands. Overhunting for feathers and eggs drove them extinct in 1844.",
    era: "Extinct in 1844"
  },
  {
    id: "dodo",
    name: "DODO",
    image: "assets/animals/dodo.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (17th Century)",
    hint: "A gentle, round, flightless bird endemic to the paradise island of Mauritius!",
    fact: "With no natural predators on Mauritius, dodos were completely fearless. They disappeared in the late 1600s after sailors and invasive animals arrived.",
    era: "Extinct in 1662"
  },
  {
    id: "giant-ground-sloth",
    name: "GIANT GROUND SLOTH",
    image: "assets/animals/giant-ground-sloth.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (Megatherium)",
    hint: "Weighed up to 4 tons and stood as tall as an elephant on its hind legs!",
    fact: "Unlike tiny modern tree sloths, this Ice Age colossus walked the ground with enormous curved claws, browsing treetops across the Americas.",
    era: "~10,000 years ago"
  },
  {
    id: "irish-elk",
    name: "IRISH ELK",
    image: "assets/animals/irish-elk.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (Megaloceros)",
    hint: "Crowned with the most massive antlers in Earth's history — over 12 feet wide!",
    fact: "The Irish Elk was one of the largest deer species to ever live, famous for its magnificent 3.6-meter wide antlers.",
    era: "~7,700 years ago"
  },
  {
    id: "woolly-rhinoceros",
    name: "WOOLLY RHINOCEROS",
    image: "assets/animals/woolly-rhinoceros.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (Ice Age)",
    hint: "Armored in thick reddish-brown wool with two giant horns to sweep snow while grazing!",
    fact: "Coated in heavy fur to survive freezing blizzards, this prehistoric rhino shared the cold tundra with woolly mammoths.",
    era: "~14,000 years ago"
  },
  {
    id: "dire-wolf",
    name: "DIRE WOLF",
    image: "assets/animals/dire-wolf.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (Pleistocene)",
    hint: "A heavier, powerfully built ancient wolf pack hunter with bone-crushing jaws!",
    fact: "Dire wolves were bulkier than modern gray wolves with stronger teeth, competing with saber-toothed cats across Ice Age America.",
    era: "~9,500 years ago"
  },
  {
    id: "smilodon",
    name: "SMILODON",
    image: "assets/animals/smilodon.png",
    answer: "EXTINCT",
    statusText: "Status: Extinct (Saber-toothed Cat)",
    hint: "Iconic prehistoric hunter armed with 7-inch curved, razor-sharp saber teeth!",
    fact: "This formidable Ice Age predator ambushed large prey. They went extinct around 10,000 years ago as large prey disappeared.",
    era: "~10,000 years ago"
  },

  // --- 8 ENDANGERED ANIMALS (STILL HERE) ---
  {
    id: "asian-elephant",
    name: "ASIAN ELEPHANT",
    image: "assets/animals/asian-elephant.png",
    answer: "ENDANGERED",
    statusText: "Status: Endangered (Still Here!)",
    hint: "Smaller ears than its African cousin, still roaming Asia's tropical forests today!",
    fact: "Still here — but endangered! Fewer than 50,000 remain in the wild. Forest reserves and migratory corridors are crucial to protect their families.",
    era: "Living today (~45,000 left)"
  },
  {
    id: "saola",
    name: "SAOLA",
    image: "assets/animals/saola.png",
    answer: "ENDANGERED",
    statusText: "Status: Critically Endangered (Asian Unicorn)",
    hint: "A mysterious forest antelope with long, parallel horns discovered only in 1992!",
    fact: "Still here! Known as the 'Asian Unicorn', this elusive creature lives in the misty Annamite mountains of Vietnam and Laos, and is critically protected.",
    era: "Living today (Critically Endangered)"
  },
  {
    id: "yangtze-giant-softshell-turtle",
    name: "YANGTZE GIANT SOFTSHELL TURTLE",
    image: "assets/animals/yangtze-giant-softshell-turtle.png",
    answer: "ENDANGERED",
    statusText: "Status: Critically Endangered",
    hint: "The world's largest freshwater turtle, weighing over 100 kg with a leathery shell!",
    fact: "Still here — but one of the rarest animals on Earth! Dedicated international conservationists are working around the clock to save this species from extinction.",
    era: "Living today (Fewer than 5 known)"
  },
  {
    id: "coelacanth",
    name: "COELACANTH",
    image: "assets/animals/coelacanth.png",
    answer: "ENDANGERED",
    statusText: "Status: Critically Endangered (Living Fossil)",
    hint: "A prehistoric lobe-finned fish thought extinct for 66 million years until rediscovered alive in 1938!",
    fact: "Still here! This 'living fossil' survived deep underwater unchanged since the age of dinosaurs. Marine sanctuaries now protect their deep-sea habitats.",
    era: "Living today in deep sea"
  },
  {
    id: "kakapo",
    name: "KAKAPO",
    image: "assets/animals/kakapo.png",
    answer: "ENDANGERED",
    statusText: "Status: Critically Endangered",
    hint: "The world's only flightless, nocturnal, moss-green parrot from New Zealand!",
    fact: "Still here! Around 250 birds are lovingly protected on predator-free sanctuary islands with radio transmitters, health checks, and nest monitors.",
    era: "Living today (~250 in sanctuaries)"
  },
  {
    id: "gharial",
    name: "GHARIAL",
    image: "assets/animals/gharial.png",
    answer: "ENDANGERED",
    statusText: "Status: Critically Endangered",
    hint: "A river crocodilian with a long, slender pencil snout specialized for catching fish!",
    fact: "Still here! Fewer than 1,000 breeding adults remain in clean freshwater rivers of South Asia. Hatchery and river conservation efforts are helping them survive.",
    era: "Living today (Critically Endangered)"
  },
  {
    id: "african-wild-dog",
    name: "AFRICAN WILD DOG",
    image: "assets/animals/african-wild-dog.png",
    answer: "ENDANGERED",
    statusText: "Status: Endangered (Painted Wolf)",
    hint: "Famous for big rounded bat ears and a beautiful colorful patchwork painted coat!",
    fact: "Still here! Also called 'painted wolves', they are intensely cooperative pack hunters. Wildlife corridors across southern Africa protect their roaming lands.",
    era: "Living today (~6,600 left)"
  },
  {
    id: "tiger",
    name: "TIGER",
    image: "assets/animals/tiger.png",
    answer: "ENDANGERED",
    statusText: "Status: Endangered (Still Here!)",
    hint: "The largest of all wild cats with regal orange fur and bold camouflage stripes!",
    fact: "Still here — but endangered! Intense anti-poaching and national tiger reserves in India and Asia are helping wild populations slowly recover.",
    era: "Living today (~5,500 in wild)"
  }
];

/**
 * Randomize animals for each player session:
 * Selects 4 random Extinct animals and 4 random Endangered animals,
 * and shuffles the final order so every playthrough is fresh!
 */
function generateGameQuestions(count = 8) {
  const extinct = ALL_ANIMALS.filter(a => a.answer === "EXTINCT");
  const endangered = ALL_ANIMALS.filter(a => a.answer === "ENDANGERED");

  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffledExtinct = shuffle(extinct);
  const shuffledEndangered = shuffle(endangered);

  const half = Math.floor(count / 2);
  const picked = [
    ...shuffledExtinct.slice(0, half),
    ...shuffledEndangered.slice(0, count - half)
  ];

  return shuffle(picked);
}

// Default fallback list
let questions = generateGameQuestions(8);

// ==========================================================================
// SOUNDCN AUDIO CONTROLLER (https://soundcn.xyz/)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.hasUnlocked = false;
  }

  init() {
    if (window.soundcn && typeof window.soundcn.getAudioContext === "function") {
      window.soundcn.getAudioContext();
    }
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    this.hasUnlocked = true;
  }

  playClick() {
    this.init();
    if (window.soundcn && typeof window.soundcn.playClick === "function") {
      window.soundcn.playClick();
      return;
    }
    this.playTone(600, 0.04, "sine", 0.08);
  }

  playCardPlace() {
    this.init();
    if (window.soundcn && typeof window.soundcn.playCardPlace === "function") {
      window.soundcn.playCardPlace();
      return;
    }
    this.playTone(340, 0.08, "triangle", 0.12);
  }

  playCorrect() {
    this.init();
    if (window.soundcn && typeof window.soundcn.playCorrect === "function") {
      window.soundcn.playCorrect();
      setTimeout(() => {
        if (window.soundcn && window.soundcn.playScore) {
          window.soundcn.playScore();
        }
      }, 350);
      return;
    }
    this.playSynthCorrect();
  }

  playStreak() {
    this.init();
    if (window.soundcn && typeof window.soundcn.playScore === "function") {
      window.soundcn.playScore({ playbackRate: 1.25, volume: 1 });
      return;
    }
    this.playTone(880, 0.15, "triangle", 0.2);
  }

  playWrong() {
    this.init();
    if (window.soundcn && typeof window.soundcn.playWrong === "function") {
      window.soundcn.playWrong();
      return;
    }
    this.playSynthWrong();
  }

  playStart() {
    this.init();
    if (window.soundcn && typeof window.soundcn.playStart === "function") {
      window.soundcn.playStart();
      return;
    }
    this.playSynthCorrect();
  }

  playVictory() {
    this.init();
    if (window.soundcn && typeof window.soundcn.playVictory === "function") {
      window.soundcn.playVictory();
      return;
    }
    this.playSynthCorrect();
  }

  toggleMute() {
    if (window.soundcn && typeof window.soundcn.toggleMute === "function") {
      const isMuted = window.soundcn.toggleMute();
      if (!isMuted) {
        window.soundcn.playToggle();
      }
      this.updateMuteUI(isMuted);
      return isMuted;
    }
    return false;
  }

  isMuted() {
    if (window.soundcn && typeof window.soundcn.isMuted === "function") {
      return window.soundcn.isMuted();
    }
    return false;
  }

  updateMuteUI(isMuted) {
    const navBtn = document.getElementById("btn-sound-toggle-nav");
    const gameBtn = document.getElementById("btn-sound-toggle-game");
    const navIcon = document.getElementById("nav-sound-icon");
    const navText = document.getElementById("nav-sound-text");
    const gameIcon = document.getElementById("game-sound-icon");

    const icon = isMuted ? "🔇" : "🔊";
    const label = isMuted ? "Muted" : "Sound";

    if (navIcon) navIcon.textContent = icon;
    if (navText) navText.textContent = label;
    if (gameIcon) gameIcon.textContent = icon;

    if (navBtn) navBtn.classList.toggle("is-muted", isMuted);
    if (gameBtn) gameBtn.classList.toggle("is-muted", isMuted);
  }

  playTone(freq, duration, type = "sine", gainVal = 0.1) {
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  playSynthCorrect() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, now + i * 0.08);
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }

  playSynthWrong() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [440, 370].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(f, now + i * 0.12);
      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.32);
    });
  }
}

const soundFX = new SoundFX();

// ==========================================================================
// EXHIBITION APPLICATION CONTROLLER
// ==========================================================================
class ExhibitionApp {
  constructor() {
    this.model = null;
    this.webcam = null;
    this.isModelReady = false;
    this.isWebcamActive = false;

    // Active session questions (randomized per game)
    this.questions = generateGameQuestions(8);
    this.currentIndex = 0;
    this.score = 0;
    this.currentScreen = "home";

    // Snapchat-Style Fire Streak Tracking
    this.currentStreak = 0;
    this.bestStreak = 0;

    // Hands-Free Auto-Advance Timer
    this.autoAdvanceTimer = null;
    this.autoAdvanceInterval = null;

    // Inter-question Grace Period (Allows standing user to lower their card)
    this.isGracePeriodActive = false;

    // Recognition debouncer
    this.candidateClass = "NOTHING";
    this.candidateStartTime = 0;
    this.isRecognitionLocked = false;
    this.simulatedCard = null;

    this.cacheDOMElements();
    this.bindEvents();
    this.tryLoadModel();
  }

  cacheDOMElements() {
    // Screens
    this.screens = {
      home: document.getElementById("screen-home"),
      howToPlay: document.getElementById("screen-how-to-play"),
      cameraPermission: document.getElementById("screen-camera-permission"),
      game: document.getElementById("screen-game"),
      feedbackCorrect: document.getElementById("screen-feedback-correct"),
      feedbackWrong: document.getElementById("screen-feedback-wrong"),
      result: document.getElementById("screen-result")
    };

    // Navigation & Global
    this.globalNavbar = document.getElementById("global-navbar");
    this.navBrandLogo = document.getElementById("nav-brand-logo");
    this.btnSoundToggleNav = document.getElementById("btn-sound-toggle-nav");
    this.btnSoundToggleGame = document.getElementById("btn-sound-toggle-game");

    // Home Screen (1)
    this.btnHomePlay = document.getElementById("btn-home-play");

    // How to Play Screen (2)
    this.btnHowReady = document.getElementById("btn-how-ready");

    // Camera Permission Screen (3)
    this.btnAllowCamera = document.getElementById("btn-allow-camera");
    this.btnCameraFallback = document.getElementById("btn-camera-fallback");

    // Game Stage (4)
    this.roundTrackerText = document.getElementById("round-tracker-text");
    this.gameProgressFill = document.getElementById("game-progress-fill");
    this.gameScoreNum = document.getElementById("game-score-num");
    this.gameStreakPill = document.getElementById("game-streak-pill");
    this.gameStreakFlame = document.getElementById("game-streak-flame");
    this.gameStreakNum = document.getElementById("game-streak-num");

    this.detectAnimalImg = document.getElementById("detect-animal-img");
    this.detectAnimalName = document.getElementById("detect-animal-name");
    this.detectAnimalHint = document.getElementById("detect-animal-hint");
    this.gameWebcamContainer = document.getElementById("game-webcam-container");
    this.webcamFrameBox = document.getElementById("webcam-frame-box");
    this.cardGuideOverlay = document.getElementById("card-guide-overlay");
    this.statusPill = document.getElementById("status-pill");
    this.statusPillEmoji = document.getElementById("status-pill-emoji");
    this.statusPillText = document.getElementById("status-pill-text");
    this.stabilityGaugeFill = document.getElementById("stability-gauge-fill");

    // Feedback Correct (5)
    this.correctStreakBanner = document.getElementById("correct-streak-banner");
    this.correctStreakText = document.getElementById("correct-streak-text");
    this.correctAnnouncement = document.getElementById("correct-announcement");
    this.correctAnimalImg = document.getElementById("correct-animal-img");
    this.correctStatusLabel = document.getElementById("correct-status-label");
    this.correctStatusDesc = document.getElementById("correct-status-desc");
    this.correctCountdownNum = document.getElementById("correct-countdown-num");
    this.correctTimerFill = document.getElementById("correct-timer-fill");
    this.btnNextFromCorrect = document.getElementById("btn-next-from-correct");

    // Feedback Wrong (6)
    this.wrongAnnouncement = document.getElementById("wrong-announcement");
    this.wrongAnimalImg = document.getElementById("wrong-animal-img");
    this.wrongStatusLabel = document.getElementById("wrong-status-label");
    this.wrongStatusDesc = document.getElementById("wrong-status-desc");
    this.wrongCountdownNum = document.getElementById("wrong-countdown-num");
    this.wrongTimerFill = document.getElementById("wrong-timer-fill");
    this.btnNextFromWrong = document.getElementById("btn-next-from-wrong");

    // Results (7)
    this.finalScorePill = document.getElementById("final-score-pill");
    this.finalStreakPill = document.getElementById("final-streak-pill");
    this.shelfGoneList = document.getElementById("shelf-gone-list");
    this.shelfStillList = document.getElementById("shelf-still-list");
    this.btnResultPlayAgain = document.getElementById("btn-result-play-again");

    // Confetti Canvas
    this.confettiCanvas = document.getElementById("confetti-canvas");
  }

  bindEvents() {
    // Sound Toggles
    if (this.btnSoundToggleNav) {
      this.btnSoundToggleNav.addEventListener("click", () => soundFX.toggleMute());
    }
    if (this.btnSoundToggleGame) {
      this.btnSoundToggleGame.addEventListener("click", () => soundFX.toggleMute());
    }

    // Navbar Brand Click -> Return to Home
    if (this.navBrandLogo) {
      this.navBrandLogo.addEventListener("click", () => {
        soundFX.playClick();
        this.switchScreen("home");
      });
    }

    // Screen 1 -> Screen 2
    this.btnHomePlay.addEventListener("click", () => {
      soundFX.playClick();
      soundFX.init();
      this.switchScreen("howToPlay");
    });

    // Screen 2 -> Screen 3
    this.btnHowReady.addEventListener("click", () => {
      soundFX.playClick();
      soundFX.init();
      this.switchScreen("cameraPermission");
    });

    // Screen 3 -> Screen 4 (Camera Permission)
    this.btnAllowCamera.addEventListener("click", async () => {
      soundFX.playStart();
      soundFX.init();
      await this.initWebcam();
      this.startGame();
    });

    this.btnCameraFallback.addEventListener("click", () => {
      soundFX.playStart();
      soundFX.init();
      this.startGame();
    });

    // Screen 5 -> Next Question (Manual Skip)
    this.btnNextFromCorrect.addEventListener("click", () => {
      soundFX.playClick();
      this.clearAutoAdvanceTimer();
      this.advanceQuestion();
    });

    // Screen 6 -> Next Question (Manual Skip)
    this.btnNextFromWrong.addEventListener("click", () => {
      soundFX.playClick();
      this.clearAutoAdvanceTimer();
      this.advanceQuestion();
    });

    // Screen 7 (Result) actions -> Play Again
    if (this.btnResultPlayAgain) {
      this.btnResultPlayAgain.addEventListener("click", () => {
        soundFX.playStart();
        this.startGame();
      });
    }

    // Keyboard Shortcuts for Testing / Staff (1 = Extinct, 2 = Endangered, 0 = Nothing)
    window.addEventListener("keydown", (e) => {
      if (e.key === "1") {
        if (!this.simulatedCard || this.simulatedCard === "NOTHING") soundFX.playCardPlace();
        this.simulate("EXTINCT");
      }
      if (e.key === "2") {
        if (!this.simulatedCard || this.simulatedCard === "NOTHING") soundFX.playCardPlace();
        this.simulate("ENDANGERED");
      }
      if (e.key === "0") this.simulate("NOTHING");
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "1" || e.key === "2") this.simulate("NOTHING");
    });
  }

  simulate(card) {
    this.simulatedCard = card;
  }

  switchScreen(screenKey) {
    this.currentScreen = screenKey;
    Object.keys(this.screens).forEach((key) => {
      if (this.screens[key]) {
        this.screens[key].classList.remove("active");
      }
    });

    if (this.screens[screenKey]) {
      this.screens[screenKey].classList.add("active");
    }

    // Toggle navbar visibility (only visible on Home)
    if (screenKey === "home") {
      this.globalNavbar.style.display = "flex";
    } else {
      this.globalNavbar.style.display = "none";
    }
  }

  /**
   * Starts a brand new game session:
   * Generates a new randomized set of 8 animals (4 extinct + 4 endangered)
   */
  startGame() {
    this.clearAutoAdvanceTimer();
    this.questions = generateGameQuestions(8);
    this.currentIndex = 0;
    this.score = 0;
    this.currentStreak = 0;
    this.updateStreakUI();
    this.gameScoreNum.textContent = "0";
    this.renderCurrentQuestion();
    this.switchScreen("game");
  }

  updateStreakUI() {
    if (this.gameStreakNum) {
      this.gameStreakNum.textContent = String(this.currentStreak);
    }
    if (this.gameStreakPill) {
      if (this.currentStreak >= 3) {
        this.gameStreakPill.classList.add("on-fire");
      } else {
        this.gameStreakPill.classList.remove("on-fire");
      }
    }
  }

  renderCurrentQuestion() {
    const q = this.questions[this.currentIndex];
    this.roundTrackerText.textContent = `Round ${this.currentIndex + 1} / ${this.questions.length}`;
    const progressPercent = ((this.currentIndex + 1) / this.questions.length) * 100;
    this.gameProgressFill.style.width = `${progressPercent}%`;

    this.detectAnimalImg.src = q.image;
    this.detectAnimalImg.alt = q.name;
    if (this.detectAnimalName) {
      this.detectAnimalName.textContent = q.name;
    }
    this.detectAnimalHint.innerHTML = `<span class="hint-prefix">HINT:</span> ${q.hint}`;

    // Reset detection state
    this.isRecognitionLocked = false;
    this.candidateClass = "NOTHING";
    this.candidateStartTime = 0;
    this.updateStability(0);

    // Inter-question Grace Period (Allows standing visitor to lower/swap their card)
    this.isGracePeriodActive = true;
    this.setDetectorStatus("👋", "Lower card for next round...");

    setTimeout(() => {
      this.isGracePeriodActive = false;
      this.setDetectorStatus("👀", "Hold up your answer board!");
    }, 1200);
  }

  // ========================================================================
  // WEBCAM INITIALIZATION (ENLARGED HIGH-RES FEED FOR MUSEUM KIOSK)
  // ========================================================================
  async initWebcam() {
    if (this.isWebcamActive) return;

    try {
      const flip = true;
      const width = 440;
      const height = 440;

      if (window.tmImage && window.tmImage.Webcam) {
        this.webcam = new window.tmImage.Webcam(width, height, flip);
        await this.webcam.setup();
        await this.webcam.play();
        this.gameWebcamContainer.innerHTML = "";
        this.gameWebcamContainer.appendChild(this.webcam.canvas);
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 440, height: 440, facingMode: "user" }
        });
        const video = document.createElement("video");
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;
        this.gameWebcamContainer.innerHTML = "";
        this.gameWebcamContainer.appendChild(video);
      }

      this.isWebcamActive = true;
      window.requestAnimationFrame(() => this.loop());
    } catch (err) {
      console.warn("Webcam not available:", err);
      // Run loop anyway so simulation / keyboard works
      window.requestAnimationFrame(() => this.loop());
    }
  }

  async tryLoadModel() {
    try {
      const cleanUrl = MODEL_URL.endsWith("/") ? MODEL_URL : MODEL_URL + "/";
      if (window.tmImage) {
        this.model = await window.tmImage.load(cleanUrl + "model.json", cleanUrl + "metadata.json");
        this.isModelReady = true;
      }
    } catch (e) {
      console.warn("Model offline or not found at", MODEL_URL, "— Ready in Simulation Mode");
      this.isModelReady = false;
    }
  }

  // ========================================================================
  // RECOGNITION LOOP
  // ========================================================================
  async loop() {
    if (this.webcam) {
      this.webcam.update();
    }
    await this.processDetection();
    window.requestAnimationFrame(() => this.loop());
  }

  async processDetection() {
    if (this.currentScreen !== "game" || this.isRecognitionLocked) {
      return;
    }

    // Ignore detection while the user is lowering card from previous round
    if (this.isGracePeriodActive) {
      return;
    }

    let topClass = "NOTHING";
    let topProb = 0;

    // Simulation takes precedence
    if (this.simulatedCard && this.simulatedCard !== "NOTHING") {
      topClass = this.simulatedCard;
      topProb = 0.99;
    }
    // Real ML model prediction
    else if (this.isModelReady && this.model && this.webcam && this.webcam.canvas) {
      try {
        const predictions = await this.model.predict(this.webcam.canvas);
        for (let i = 0; i < predictions.length; i++) {
          const raw = predictions[i].className.trim().toUpperCase();
          let parsed = "NOTHING";
          if (raw.includes("EXTINCT") || raw.includes("GONE")) parsed = "EXTINCT";
          else if (raw.includes("ENDANGERED") || raw.includes("STILL")) parsed = "ENDANGERED";

          if (predictions[i].probability > topProb) {
            topProb = predictions[i].probability;
            topClass = parsed;
          }
        }
      } catch (err) {
        // Continue
      }
    }

    // Filter invalid/nothing
    const isValidCard = (topClass === "EXTINCT" || topClass === "ENDANGERED");
    if (!isValidCard || topProb < CONFIDENCE_THRESHOLD) {
      this.candidateClass = "NOTHING";
      this.candidateStartTime = 0;
      this.updateStability(0);
      this.setDetectorStatus("👀", "Hold up your card...");
      if (this.cardGuideOverlay) {
        this.cardGuideOverlay.classList.remove("card-detected");
      }
      return;
    }

    // Card is held in front of camera
    if (this.cardGuideOverlay) {
      this.cardGuideOverlay.classList.add("card-detected");
    }

    // Temporal stability (450ms continuous hold)
    const now = performance.now();
    if (this.candidateClass !== topClass) {
      soundFX.playCardPlace();
      this.candidateClass = topClass;
      this.candidateStartTime = now;
      this.updateStability(0);
      this.setDetectorStatus("✨", `Hold steady: ${topClass}...`);
    } else {
      const elapsed = now - this.candidateStartTime;
      const progress = Math.min(1, elapsed / STABILITY_WINDOW_MS);
      this.updateStability(progress * 100);

      if (elapsed >= STABILITY_WINDOW_MS) {
        // Card stably held! Evaluate answer
        this.evaluateAnswer(topClass);
      }
    }
  }

  evaluateAnswer(userCard) {
    this.isRecognitionLocked = true;
    this.updateStability(100);
    this.setDetectorStatus("🎯", "Got it!");

    const q = this.questions[this.currentIndex];
    const isCorrect = (userCard === q.answer);

    if (isCorrect) {
      this.score += 1;
      this.currentStreak += 1;
      if (this.currentStreak > this.bestStreak) {
        this.bestStreak = this.currentStreak;
      }
      this.gameScoreNum.textContent = String(this.score);
      this.updateStreakUI();

      soundFX.playCorrect();

      // Fire Streak Announcement (3+ in a row)
      if (this.currentStreak >= 3) {
        soundFX.playStreak();
        if (this.correctStreakBanner) {
          this.correctStreakBanner.style.display = "inline-flex";
          if (this.correctStreakText) {
            this.correctStreakText.innerHTML = `<strong>${this.currentStreak} IN A ROW!</strong> YOU'RE ON FIRE!`;
          }
        }
      } else {
        if (this.correctStreakBanner) {
          this.correctStreakBanner.style.display = "none";
        }
      }

      // Trigger Wireframe 5 (Correct Answer Screen)
      this.showCorrectScreen(q);
      this.triggerConfetti();
    } else {
      // Extinguish streak
      this.currentStreak = 0;
      this.updateStreakUI();

      soundFX.playWrong();
      // Trigger Wireframe 6 (Wrong Answer Screen)
      this.showWrongScreen(q);
    }
  }

  showCorrectScreen(q) {
    const realityText = q.answer === "EXTINCT" ? "is GONE!" : "is STILL HERE!";
    const highlightClass = q.answer === "EXTINCT" ? "highlight-coral" : "highlight-green";
    
    this.correctAnnouncement.innerHTML = `The ${q.name} <strong class="${highlightClass}">${realityText}</strong>`;
    this.correctAnimalImg.src = q.image;
    this.correctAnimalImg.alt = q.name;
    this.correctStatusLabel.textContent = q.statusText;
    this.correctStatusDesc.textContent = q.fact;

    this.switchScreen("feedbackCorrect");

    // Start hands-free countdown for standing visitors
    this.startAutoAdvanceTimer("correct");
  }

  showWrongScreen(q) {
    const realityText = q.answer === "EXTINCT" ? "is GONE!" : "is STILL HERE!";
    const highlightClass = q.answer === "EXTINCT" ? "highlight-coral" : "highlight-green";

    this.wrongAnnouncement.innerHTML = `The ${q.name} <strong class="${highlightClass}">${realityText}</strong>`;
    this.wrongAnimalImg.src = q.image;
    this.wrongAnimalImg.alt = q.name;
    this.wrongStatusLabel.textContent = q.statusText;
    this.wrongStatusDesc.textContent = q.fact;

    this.switchScreen("feedbackWrong");

    // Start hands-free countdown for standing visitors
    this.startAutoAdvanceTimer("wrong");
  }

  /**
   * Hands-Free Auto-Advance Countdown Timer:
   * Smoothly counts down 3.5 seconds so visitors standing with boards
   * do not need to reach for a mouse or screen!
   */
  startAutoAdvanceTimer(type) {
    this.clearAutoAdvanceTimer();
    const durationMs = 3600;
    const numEl = type === "correct" ? this.correctCountdownNum : this.wrongCountdownNum;
    const fillEl = type === "correct" ? this.correctTimerFill : this.wrongTimerFill;

    if (numEl) numEl.textContent = "3";
    if (fillEl) {
      fillEl.style.transition = "none";
      fillEl.style.width = "100%";
      void fillEl.offsetWidth; // Force CSS repaint
      fillEl.style.transition = `width ${durationMs}ms linear`;
      fillEl.style.width = "0%";
    }

    const start = performance.now();
    this.autoAdvanceInterval = setInterval(() => {
      const elapsed = performance.now() - start;
      const remainingSec = Math.max(0, Math.ceil((durationMs - elapsed) / 1000));
      if (numEl) numEl.textContent = String(remainingSec);
    }, 150);

    this.autoAdvanceTimer = setTimeout(() => {
      this.clearAutoAdvanceTimer();
      this.advanceQuestion();
    }, durationMs);
  }

  clearAutoAdvanceTimer() {
    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  advanceQuestion() {
    this.clearAutoAdvanceTimer();
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.showResultScreen();
    } else {
      this.renderCurrentQuestion();
      this.switchScreen("game");
    }
  }

  showResultScreen() {
    this.clearAutoAdvanceTimer();
    this.finalScorePill.textContent = `${this.score} / ${this.questions.length}`;
    if (this.finalStreakPill) {
      this.finalStreakPill.innerHTML = `🔥 Best Streak: <strong>${this.bestStreak}</strong> in a row!`;
    }
    this.populateShelves();
    this.switchScreen("result");
    this.triggerConfetti();
    soundFX.playVictory();
  }

  populateShelves() {
    this.shelfGoneList.innerHTML = "";
    this.shelfStillList.innerHTML = "";

    // Show the active questions played in this session
    const list = this.questions && this.questions.length > 0 ? this.questions : ALL_ANIMALS.slice(0, 8);

    list.forEach((q) => {
      const item = document.createElement("div");
      item.className = "shelf-animal-item";
      item.innerHTML = `
        <img src="${q.image}" alt="${q.name}">
        <span>${q.name}</span>
      `;

      if (q.answer === "EXTINCT") {
        this.shelfGoneList.appendChild(item);
      } else {
        this.shelfStillList.appendChild(item);
      }
    });
  }

  updateStability(percent) {
    if (this.stabilityGaugeFill) {
      this.stabilityGaugeFill.style.width = `${percent}%`;
    }
  }

  setDetectorStatus(emoji, text) {
    if (this.statusPillEmoji) this.statusPillEmoji.textContent = emoji;
    if (this.statusPillText) this.statusPillText.textContent = text;
  }

  triggerConfetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }
}

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new ExhibitionApp();
});
