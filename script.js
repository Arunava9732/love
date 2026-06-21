const celebrantName = "Sayanti Shaw";
const specialDate = new Date(2026, 5, 21, 0, 0, 0, 0);

const celebrantNameEl = document.getElementById("celebrant-name");
const cakeValueEl = document.getElementById("cake-value");
const celebrateBtn = document.getElementById("celebrate-btn");
const musicBtn = document.getElementById("music-btn");
const letterBtn = document.getElementById("letter-btn");
const confettiLayer = document.getElementById("confetti-layer");
const heartLayer = document.getElementById("heart-layer");
const petalLayer = document.getElementById("petal-layer");
const songFrame = document.getElementById("song-frame");
const musicAudio = document.getElementById("music-audio");

const letterModal = document.getElementById("letter-modal");
const letterClose = document.getElementById("letter-close");
const letterCloseBtn = document.getElementById("letter-close-btn");
const memoryGallery = document.getElementById("memory-gallery");
const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const birthPopup = document.getElementById("birth-popup");
const birthPopupCloseBtn = document.getElementById("birth-popup-close");
const birthPopupTitleEl = document.getElementById("birth-popup-title");
const birthPopupNoteEl = document.getElementById("birth-popup-note");


celebrantNameEl.textContent = celebrantName;
cakeValueEl.textContent = String(8 + (specialDate.getDate() % 5));

function getNextBirthday() {
  return specialDate;
}

function updateCountdown() {
  const now = new Date();
  const target = getNextBirthday();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEls.days.textContent = String(days);
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(seconds).padStart(2, "0");

  maybeShowBirthPopup(diff, { days, hours, minutes, seconds });
}

function maybeShowBirthPopup(diff, parts) {
  if (!birthPopup || !birthPopupTitleEl) return;

  // Show when countdown is finished (diff <= 0, handle any small negative values)
  if (diff > 0) return;

  // Debug: Log when countdown is done
  console.log('Countdown finished, diff:', diff);

  // Play the "MY LOVE birthday song" automatically when popup opens
  // Only play once when popup first opens
  if (birthPopup.dataset.opened !== "true") {
    console.log('Playing love song for popup...');
    playLoveSongForPopup();
  }

  // Show for each time loading the website (no permanent once-per-user guard)
  // But we still prevent duplicate opens during the same reload.
  if (birthPopup.dataset.opened === "true") return;

  birthPopup.dataset.opened = "true";
  birthPopup.classList.add("is-open");
  birthPopup.setAttribute("aria-hidden", "false");

  console.log('Birth popup opened');

  const days = parts?.days ?? 0;
  if (days === 0 && parts?.hours === 0 && parts?.minutes === 0 && parts?.seconds === 0) {
    birthPopupTitleEl.textContent = "Happy Birth Day! 🎂";
  }

  if (birthPopupNoteEl) {
    birthPopupNoteEl.textContent = "For my Love — you make every day feel special. ❤️";
  }
}


const confettiColors = ["#ff5fa2", "#ffd166", "#8b5cf6", "#6ee7ff", "#ffffff"];
const sparkleColors = ["#ffffff", "#ffd166", "#ff8fab", "#6ee7ff"];
const balloonColors = ["#ff8fab", "#ffd166", "#8b5cf6", "#6ee7ff", "#ff5fa2"];
const petalColors = ["#ffd6e6", "#f7b6cf", "#ef94b8", "#ffe4ec"];
const localMusicSrc = "./Jodi Boli.mp3";
const loveSongSrc = "./MY LOVE birthday song.mp3";

// autoplay helper for popup audio
let loveSongAudio = null;
let loveSongPlaying = false;

// Preload the love song early
function preloadLoveSong() {
  if (!loveSongAudio && loveSongSrc) {
    loveSongAudio = new Audio(loveSongSrc);
    loveSongAudio.preload = "auto";
    loveSongAudio.loop = true;
    loveSongAudio.volume = 0.9;
  }
}


const galleryPhotos = [
  { src: "Photos-3-001/file_000000008ba4720998a671b0c27cf8cf.png", caption: "Soft glow" },
  { src: "Photos-3-001/IMG-20260419-WA0001.jpg", caption: "Sweet little moment" },
  { src: "Photos-3-001/IMG-20260601-WA0000.jpg", caption: "Soft cuddle vibes" },
  { src: "Photos-3-001/IMG-20260601-WA0001(1).jpg", caption: "Tiny treasure" },
  { src: "Photos-3-001/IMG-20260601-WA0001.jpg", caption: "Happy day" },
  { src: "Photos-3-001/IMG-20260604-WA0022.jpg", caption: "Warm little sparkle" },
  { src: "Photos-3-001/IMG-20260604-WA0023.jpg", caption: "Bright smile" },
  { src: "Photos-3-001/IMG_20260323_185248_344.jpg", caption: "Soft memory" },
  { src: "Photos-3-001/IMG_20260323_185258_977.jpg", caption: "Lovely together" },
  { src: "Photos-3-001/IMG_20260323_185323_067.jpg", caption: "Tiny joy" },
  { src: "Photos-3-001/IMG_20260323_185628_626.jpg", caption: "Lovely little laugh" },
  { src: "Photos-3-001/IMG_20260323_185652_122.jpg", caption: "Cuddle corner" },
  { src: "Photos-3-001/IMG_20260323_185653_883.jpg", caption: "Soft sunshine" },
  { src: "Photos-3-001/IMG_20260323_185753_613.jpg", caption: "Happy memories" },
  { src: "Photos-3-001/IMG_20260323_185755_607.jpg", caption: "Sweet moments" },
  { src: "Photos-3-001/IMG_20260323_185803_743.jpg", caption: "Smiles and hugs" },
  { src: "Photos-3-001/IMG_20260323_185934_639.jpg", caption: "Heartfelt moment" },
  { src: "Photos-3-001/IMG_20260323_190122_574.jpg", caption: "Warm love" },
  { src: "Photos-3-001/IMG_20260323_190142_817.jpg", caption: "Soft memory" },
  { src: "Photos-3-001/IMG_20260323_190334_981.jpg", caption: "Golden little joy" },
];

const melody = [
  [523.25, 0.18],
  [659.25, 0.18],
  [783.99, 0.24],
  [659.25, 0.18],
  [587.33, 0.18],
  [659.25, 0.22],
  [523.25, 0.24],
  [440, 0.28],
];

let audioContext = null;
let musicTimer = null;
let musicRunning = false;

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${14 + Math.random() * 18}px`;
  heart.style.animationDuration = `${3200 + Math.random() * 2200}ms`;
  heartLayer.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, 6000);
}

function launchHearts(count = 12) {
  for (let index = 0; index < count; index += 1) {
    window.setTimeout(createHeart, index * 120);
  }
}

function createFloatingElement(className, text, colors, layer, durationBase, durationRange, topRange) {
  const element = document.createElement("span");
  element.className = className;
  element.textContent = text;
  element.style.left = `${Math.random() * 100}vw`;
  element.style.top = `${topRange[0] + Math.random() * (topRange[1] - topRange[0])}vh`;
  element.style.color = colors[Math.floor(Math.random() * colors.length)];
  element.style.animationDuration = `${durationBase + Math.random() * durationRange}ms`;
  element.style.setProperty("--float-x", `${Math.random() * 180 - 90}px`);
  layer.appendChild(element);

  window.setTimeout(() => {
    element.remove();
  }, durationBase + durationRange + 1200);
}

function launchBalloons(count = 5) {
  for (let index = 0; index < count; index += 1) {
    createFloatingElement("balloon", "🎈", balloonColors, confettiLayer, 9000, 4200, 70);
  }
}

function launchSparkles(count = 14) {
  for (let index = 0; index < count; index += 1) {
    createFloatingElement("sparkle", "✦", sparkleColors, heartLayer, 2200, 1800, 10);
  }
}

function launchPetals(count = 10) {
  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.background = `linear-gradient(135deg, ${petalColors[Math.floor(Math.random() * petalColors.length)]}, rgba(233, 122, 165, 0.92))`;
    petal.style.animationDuration = `${8000 + Math.random() * 5000}ms`;
    petal.style.animationDelay = `${Math.random() * 1400}ms`;
    petal.style.setProperty("--float-x", `${Math.random() * 240 - 120}px`);
    petal.style.transform = `rotate(${Math.random() * 180}deg)`;
    petalLayer.appendChild(petal);

    window.setTimeout(() => {
      petal.remove();
    }, 14000);
  }
}

function renderMemoryGallery() {
  if (!memoryGallery) {
    return;
  }

  memoryGallery.innerHTML = galleryPhotos
    .map(
      (photo, index) => `
        <figure
          class="memory-card reveal-on-scroll ${index === 0 ? "memory-card--feature" : ""} ${index % 4 === 1 ? "memory-card--wide" : ""} ${index % 6 === 3 ? "memory-card--tall" : ""}"
          style="--offset-x: ${index % 2 === 0 ? "6px" : "-6px"}; --offset-y: ${index % 3 === 0 ? "10px" : "0px"}; --rotate: ${index % 4 === 0 ? "-1.2deg" : index % 4 === 1 ? "1.2deg" : index % 4 === 2 ? "-0.6deg" : "0.8deg"}; z-index: ${40 - index};"
        >
          <div class="memory-card__image" style="background-image: url('${photo.src}')"></div>
          <figcaption>
            <span class="memory-card__emoji">✦</span>
            <span>${photo.caption}</span>
          </figcaption>
        </figure>
      `,
    )
    .join("");
}

function setupScrollReveal() {
  const revealTargets = document.querySelectorAll(".reveal-on-scroll");

  if (!revealTargets.length) {
    return;
  }

  // For the main card content (including the photo grid), we want direction-aware animation:
  // - scrolling DOWN: fade/slide IN
  // - scrolling UP: fade/slide OUT
  // We implement this with a scroll direction hint and IntersectionObserver.
  // scroll direction is no longer used (we only animate IN on scroll down).


  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Only animate on scroll DOWN (fade IN). Do not remove on scroll UP.
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -15% 0px" },
  );

  revealTargets.forEach((element) => observer.observe(element));
}


function setSongEmbed() {
  // (intentionally left as a no-op) the old embed-based player was replaced
  // by local <audio> so the site works reliably without YouTube iframes.
  if (songFrame) {
    // ensure we have an element to keep styling consistent
    songFrame.setAttribute("data-player", "local-audio");
  }
}


function openLetter() {
  if (!letterModal) {
    return;
  }

  // prevent broken interactions by ensuring only one modal state is active
  letterModal.classList.add("is-open");
  letterModal.setAttribute("aria-hidden", "false");

  // focus close button for accessibility + reliable keyboard behavior
  if (letterCloseBtn) {
    letterCloseBtn.focus();
  }
}

function closeLetter() {
  if (!letterModal) {
    return;
  }

  // Prevent accessibility warning: clear focus before hiding the modal.
  // Also move focus back to the button that opened it.
  if (document.activeElement && letterModal.contains(document.activeElement)) {
    if (letterBtn) letterBtn.focus();
    else document.body.focus?.();
  }

  letterModal.classList.remove("is-open");
  letterModal.setAttribute("aria-hidden", "true");
}



function playLoveSongForPopup() {
  if (!loveSongSrc) return;

  console.log('Attempting to play love song...');

  try {
    // Always create a fresh audio to avoid any state issues
    if (loveSongAudio) {
      loveSongAudio.pause();
      loveSongAudio = null;
    }

    loveSongAudio = new Audio(loveSongSrc);
    loveSongAudio.loop = true;
    loveSongAudio.volume = 0.9;
    loveSongAudio.preload = "auto";

    // Reset to beginning
    loveSongAudio.currentTime = 0;

    // Try to play
    const playPromise = loveSongAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log('Love song playing successfully');
        loveSongPlaying = true;
      }).catch((e) => {
        console.log('Autoplay blocked, click allowed');
        loveSongPlaying = false;
        // Force play on next user interaction
        document.addEventListener('click', function attemptPlay() {
          if (loveSongAudio) {
            loveSongAudio.play().catch(() => {});
          }
        }, { once: true });
      });
    } else {
      loveSongPlaying = true;
    }
  } catch (e) {
    console.log('Love song error:', e);
  }
}

function pauseLoveSong() {
  if (loveSongAudio) {
    loveSongAudio.pause();
    loveSongPlaying = false;
  }
}



function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  return audioContext;
}

function playNote(context, frequency, startTime, duration) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.08, startTime + 0.04);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function startMusic() {
  if (!musicAudio) {
    return;
  }

  try {
    musicAudio.src = localMusicSrc;
    musicAudio.loop = true;
    musicAudio.volume = 0.9;
    const playPromise = musicAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay might be blocked; user interaction should still work.
      });
    }
  } catch (e) {
    // ignore
  }

  musicRunning = true;
  musicBtn.textContent = "Stop music";
  musicBtn.setAttribute("aria-pressed", "true");
}

function stopMusic() {
  if (musicAudio) {
    musicAudio.pause();
    musicAudio.removeAttribute("src");
    musicAudio.load();
  }

  musicRunning = false;
  musicBtn.textContent = "Play music";
  musicBtn.setAttribute("aria-pressed", "false");
}


function launchConfetti() {
  const pieces = 80;

  for (let index = 0; index < pieces; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";

    const size = 6 + Math.random() * 9;
    const left = Math.random() * 100;
    const duration = 1800 + Math.random() * 2200;
    const delay = Math.random() * 160;
    const drift = `${(Math.random() * 220 - 110).toFixed(0)}px`;

    piece.style.left = `${left}vw`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.6}px`;
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDuration = `${duration}ms`;
    piece.style.animationDelay = `${delay}ms`;
    piece.style.setProperty("--drift", drift);
    piece.style.transform = `translate3d(0, 0, 0) rotate(${Math.random() * 180}deg)`;

    confettiLayer.appendChild(piece);

    window.setTimeout(() => {
      piece.remove();
    }, duration + delay + 100);
  }
}

celebrateBtn.addEventListener("click", () => {
  // ensure celebration layers are always on top of the UI
  if (confettiLayer) confettiLayer.style.zIndex = 9999;
  if (heartLayer) heartLayer.style.zIndex = 9998;
  if (petalLayer) petalLayer.style.zIndex = 9997;

  // give the user an immediate “in front” feel
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.zIndex = 3;
  }

  launchConfetti();
  launchHearts(16);
  launchBalloons(3);
  launchSparkles(16);

  celebrateBtn.textContent = "Yay!";
  window.setTimeout(() => {
    celebrateBtn.textContent = "Celebrate!";
  }, 1400);
});


musicBtn.addEventListener("click", () => {
  if (musicRunning) {
    stopMusic();
    return;
  }
  startMusic();
});


letterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // If birthday popup is open, close it so it can't intercept taps
  if (birthPopup && birthPopup.classList.contains("is-open")) {
    birthPopup.classList.remove("is-open");
    birthPopup.setAttribute("aria-hidden", "true");
  }
  openLetter();
});

letterCloseBtn.addEventListener("click", closeLetter);
letterClose.addEventListener("click", closeLetter);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLetter();
    if (birthPopup && birthPopup.classList.contains("is-open")) {
      birthPopup.classList.remove("is-open");
      birthPopup.setAttribute("aria-hidden", "true");
      pauseLoveSong();
    }
  }
});

if (birthPopupCloseBtn) {
  birthPopupCloseBtn.addEventListener("click", () => {
    birthPopup.classList.remove("is-open");
    birthPopup.setAttribute("aria-hidden", "true");
    pauseLoveSong();
  });
}


const wishesLink = document.getElementById("wishes-link");
if (wishesLink) {
  wishesLink.addEventListener("click", (event) => {
    // if the modal is open, it can intercept clicks; close it first
    if (letterModal && letterModal.classList.contains("is-open")) {
      closeLetter();
    }
  });
}


// Initial entrance animation (fade in from sides)
window.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector(".page-shell");
  if (shell) {
    shell.classList.add("page-entry");
    window.setTimeout(() => shell.classList.add("page-entry--fade"), 900);
  }
  // Preload love song early so it's ready when popup opens
  preloadLoveSong();
});

updateCountdown();
window.setInterval(updateCountdown, 1000);

document.querySelectorAll(".card:not(.hero)").forEach((element) => {
  element.classList.add("reveal-on-scroll");
});

renderMemoryGallery();
setSongEmbed();

launchConfetti();
launchHearts(8);
launchBalloons(2);
launchSparkles(10);
launchPetals(14);
setupScrollReveal();
window.setInterval(() => launchHearts(2), 5200);
window.setInterval(() => launchSparkles(3), 3600);
window.setInterval(() => launchBalloons(1), 12000);
window.setInterval(() => launchPetals(3), 7000);

