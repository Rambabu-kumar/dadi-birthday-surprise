// Personalize the photo captions, letter, and quiz answers in this section.
const memories = [
  { image: "assets/images/dadi (1).jpeg", caption: "Ek yaadgaar moment 💗" },
  { image: "assets/images/dadi (2).jpeg", caption: "Ye wali memory special hai 🥹" },
  { image: "assets/images/dadi (3).jpeg", caption: "Pagalpanti ke din 😂" },
  { image: "assets/images/dadi (4).jpeg", caption: "Old memories, endless smiles ✨" },
  { image: "assets/images/dadi (5).jpeg", caption: "A little moment to remember 💞" },
  { image: "assets/images/dadi (6).jpeg", caption: "Smile-worthy memories 😊" },
  { image: "assets/images/dadi (7).jpeg", caption: "Good times, always 💗" },
  { image: "assets/images/dadi (8).jpeg", caption: "One for the scrapbook 📸" },
  { image: "assets/images/dadi (9).jpeg", caption: "A memory close to my heart 🫶🏻" },
  { image: "assets/images/dadi (10).jpeg", caption: "More laughs, more memories ✨" }
];

const birthdayMessage = `Happy Birthday, Sandhiya! ❤️🎂

Meri pyaari Dadi Ji, tumhari life ka ye naya saal dher saari khushiyan, success, good health aur beautiful memories lekar aaye. Tum hamesha aise hi muskurati raho aur tumhare saare sapne poore hon.

Hamari purani yaadein, hasi-mazaak aur chhoti-chhoti baatein hamesha special rahengi. Aaj tumhara din hai, toh khoob smile karna, khush rehna aur apne birthday ko dil khol kar enjoy karna.

Thank you meri life ki ek special dost hone ke liye. Hamari dosti hamesha aise hi bani rahe. 🫶🏻

Once again, Happy Birthday, Dadi Ji! 🎂💗

— Tumhara dost, Rambabu ❤️`;

const quizQuestions = [
  { question: "Who is the official Dadi Ji?", options: ["Sandhiya 😂", "The birthday cake 🍰", "The cat next door 🐱"], answer: "Sandhiya 😂" },
  { question: "What should you do today?", options: ["Do extra chores 😅", "Smile and enjoy your birthday! 🎂", "Take a nap all day 💤"], answer: "Smile and enjoy your birthday! 🎂" },
  { question: "What's today's special mission?", options: ["Collect happiness and eat cake! 🍰", "Count every candle 🔢", "Become a professional napper 😴"], answer: "Collect happiness and eat cake! 🍰" }
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const photoGrid = $("#photo-grid");
let currentPhoto = 0;
let lastFocusedElement = null;
let quizIndex = 0;
let quizLocked = false;
let birthdayAudioContext;
let birthdayTuneTimer;
let birthdayTuneIndex = 0;
let currentJourneyStep = 0;
const birthdayTune = [523.25, 659.25, 783.99, 659.25, 698.46, 783.99, 1046.5, 783.99, 659.25, 587.33, 523.25, 659.25];
const journeySections = $$(".journey-step");

function revealJourneyStep(sectionId) {
  const nextStep = journeySections.findIndex((section) => section.id === sectionId);
  if (nextStep !== currentJourneyStep + 1) return;

  currentJourneyStep = nextStep;
  journeySections.forEach((section, index) => {
    section.hidden = index !== currentJourneyStep;
  });

  if (sectionId === "final") $(".site-footer").hidden = false;

  const section = journeySections[currentJourneyStep];
  const heading = $("h1, h2", section);
  heading?.focus({ preventScroll: true });
  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start"
  });
}

function makePhotoFallback(path) {
  const fallback = document.createElement("span");
  fallback.className = "photo-fallback";
  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "♡";
  const message = document.createElement("small");
  message.append("Add your photo here:", document.createElement("br"), path);
  fallback.append(icon, message);
  return fallback;
}

function renderGallery() {
  memories.forEach((memory, index) => {
    const card = document.createElement("button");
    card.className = "photo-card reveal-on-scroll";
    card.type = "button";
    card.setAttribute("aria-label", `Open memory ${index + 1}: ${memory.caption}`);
    card.dataset.index = String(index);

    const frame = document.createElement("span");
    frame.className = "photo-frame";
    const image = document.createElement("img");
    image.src = memory.image;
    image.alt = `Memory photo ${index + 1}`;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.remove();
      frame.append(makePhotoFallback(memory.image));
    }, { once: true });

    const pin = document.createElement("span");
    pin.className = "photo-pin";
    pin.setAttribute("aria-hidden", "true");
    pin.textContent = "♡";
    const caption = document.createElement("span");
    caption.className = "photo-caption";
    caption.textContent = memory.caption;
    frame.append(image);
    card.append(pin, frame, caption);
    card.addEventListener("click", () => openLightbox(index));
    photoGrid.append(card);
  });
}

function openLightbox(index) {
  currentPhoto = index;
  lastFocusedElement = document.activeElement;
  updateLightbox();
  $("#lightbox").hidden = false;
  document.body.classList.add("modal-open");
  $("#lightbox-close").focus();
}

function updateLightbox() {
  const memory = memories[currentPhoto];
  const wrap = $("#lightbox-image-wrap");
  wrap.replaceChildren();
  const image = document.createElement("img");
  image.src = memory.image;
  image.alt = `Memory photo ${currentPhoto + 1}`;
  image.addEventListener("error", () => {
    image.remove();
    wrap.append(makePhotoFallback(memory.image));
  }, { once: true });
  $("#lightbox-caption").textContent = memory.caption;
  $("#lightbox-counter").textContent = `${currentPhoto + 1} of ${memories.length}`;
  wrap.append(image);
}

function closeLightbox() {
  $("#lightbox").hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
}

function changePhoto(direction) {
  currentPhoto = (currentPhoto + direction + memories.length) % memories.length;
  updateLightbox();
}

function celebrate(count = 42) {
  const layer = $("#confetti-layer");
  const colors = ["#ec9eaa", "#d8b8e5", "#f4cf8c", "#fff4ee", "#c47b91"];
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    const heart = i % 6 === 0;
    piece.className = heart ? "confetti-heart" : "confetti-piece";
    if (heart) {
      piece.textContent = "♥";
    } else {
      piece.style.backgroundColor = colors[i % colors.length];
    }
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--duration", `${2.2 + Math.random() * 1.8}s`);
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 150}px`);
    layer.append(piece);
    window.setTimeout(() => piece.remove(), 4300);
  }
}

function renderQuiz() {
  quizLocked = false;
  const current = quizQuestions[quizIndex];
  $("#quiz-progress").textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  $("#quiz-question").textContent = current.question;
  $("#quiz-feedback").textContent = "";
  const options = $("#quiz-options");
  options.replaceChildren();
  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (quizLocked) return;
      quizLocked = true;
      const correct = option === current.answer;
      $("#quiz-feedback").textContent = correct ? "Bilkul sahi! You're a birthday pro! 💗" : "Cute try! The birthday answer is: " + current.answer;
      window.setTimeout(() => {
        quizIndex += 1;
        if (quizIndex < quizQuestions.length) {
          renderQuiz();
        } else {
          $("#quiz-content").hidden = true;
          $("#quiz-complete").hidden = false;
          celebrate(24);
        }
      }, 900);
    });
    options.append(button);
  });
}

renderGallery();
renderQuiz();

$$("[data-next-step]").forEach((button) => {
  button.addEventListener("click", () => revealJourneyStep(button.dataset.nextStep));
});

$("#open-surprise").addEventListener("click", () => {
  $("#gift").classList.add("opened");
  $("#open-surprise").disabled = true;
  celebrate(56);
  window.setTimeout(() => {
    $("#welcome-screen").classList.add("is-opening");
    $("#birthday-page").setAttribute("aria-hidden", "false");
    $("#birthday-page").removeAttribute("inert");
    $("#birthday-page").classList.add("is-visible");
    window.setTimeout(() => {
      $("#welcome-screen").hidden = true;
      $("#hero-title").focus({ preventScroll: true });
    }, 750);
  }, 550);
});

$("#open-letter").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const message = $("#birthday-letter");
  const opening = message.hidden;
  message.textContent = opening ? birthdayMessage : "";
  message.hidden = !opening;
  button.setAttribute("aria-expanded", String(opening));
  button.textContent = opening ? "Close My Letter 💌" : "Open My Letter 💌";
  $("#letter-next").hidden = !opening;
  if (opening) celebrate(18);
});

$$(".reason-card").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("is-highlighted"));
});

$("#blow-candles").addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (button.disabled) return;
  button.disabled = true;
  $(".wish-cake").classList.add("is-blown");
  $("#wish-reveal").hidden = false;
  button.textContent = "Wish Made! ✨";
  $("#wish-next").hidden = false;
  celebrate(48);
});

$("#quiz-again").addEventListener("click", () => {
  quizIndex = 0;
  $("#quiz-content").hidden = false;
  $("#quiz-complete").hidden = true;
  $("#quiz-next").hidden = true;
  renderQuiz();
});

$("#birthday-cheer").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const reveal = $("#cheer-reveal");
  reveal.hidden = !reveal.hidden;
  button.setAttribute("aria-expanded", String(!reveal.hidden));
  if (!reveal.hidden) celebrate(34);
});

$("#music-toggle").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  if (birthdayTuneTimer) {
    window.clearInterval(birthdayTuneTimer);
    birthdayTuneTimer = undefined;
    birthdayAudioContext?.suspend();
    button.textContent = "Play Tune ♫";
    button.setAttribute("aria-pressed", "false");
    return;
  }

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error("Web Audio is not supported in this browser.");
    birthdayAudioContext ??= new AudioContextClass();
    await birthdayAudioContext.resume();
    const playNote = () => {
      const oscillator = birthdayAudioContext.createOscillator();
      const volume = birthdayAudioContext.createGain();
      const start = birthdayAudioContext.currentTime;
      oscillator.type = "sine";
      oscillator.frequency.value = birthdayTune[birthdayTuneIndex];
      volume.gain.setValueAtTime(0.0001, start);
      volume.gain.exponentialRampToValueAtTime(0.11, start + 0.035);
      volume.gain.exponentialRampToValueAtTime(0.0001, start + 0.38);
      oscillator.connect(volume);
      volume.connect(birthdayAudioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.4);
      birthdayTuneIndex = (birthdayTuneIndex + 1) % birthdayTune.length;
    };
    playNote();
    birthdayTuneTimer = window.setInterval(playNote, 460);
    button.textContent = "Pause Tune ⏸";
    button.setAttribute("aria-pressed", "true");
  } catch (error) {
    console.error("Could not play the birthday tune:", error);
    button.textContent = "Tune unavailable";
    button.setAttribute("aria-pressed", "false");
  }
});

$("#lightbox-close").addEventListener("click", closeLightbox);
$("#lightbox-prev").addEventListener("click", () => changePhoto(-1));
$("#lightbox-next").addEventListener("click", () => changePhoto(1));
$("#lightbox").addEventListener("click", (event) => {
  if (event.target === $("#lightbox")) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if ($("#lightbox").hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") changePhoto(-1);
  if (event.key === "ArrowRight") changePhoto(1);
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 })
  : null;

if (revealObserver) {
  $$(".reveal-on-scroll").forEach((element) => revealObserver.observe(element));
} else {
  $$(".reveal-on-scroll").forEach((element) => element.classList.add("is-revealed"));
}
