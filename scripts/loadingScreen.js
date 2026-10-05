// Greetings come from the shared language list in scripts/locales.js
const greetings = window.PORTFOLIO_LOCALES;

// How long each greeting stays on screen, in milliseconds
const GREETING_DURATION = 480;
const GREETING_SWAP = 150;

function escapeHTML(text) {
  return text.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);
}

// The words inside a string's quotes sit in <bdi>, so right-to-left text like
// Arabic stays between its quotes instead of reordering the code around it
function renderCode(tokens) {
  return tokens.map(([type, text]) => {
    if (type !== 'str') {
      return `<span class="token-${type}">${escapeHTML(text)}</span>`;
    }
    const [, open, words, close] = text.match(/^(['"]?)(.*?)(['"]?)$/);
    return `<span class="token-str">${escapeHTML(open)}<bdi>${escapeHTML(words)}</bdi>${escapeHTML(close)}</span>`;
  }).join('');
}

// const greetings = [
//   { text: "Hello World", language: "English", flag: "🇬🇧" },
//   { text: "नमस्ते दुनिया", language: "Hindi", flag: "🇮🇳" },
//   { text: "नमस्कार जग", language: "Marathi", flag: "🇮🇳" },
//   { text: "مرحبا بالعالم", language: "Arabic", flag: "🇸🇦" },
//   { text: "Bonjour le monde", language: "French", flag: "🇫🇷" },
//   { text: "こんにちは世界", language: "Japanese", flag: "🇯🇵" },
//   { text: "Hola Mundo", language: "Spanish", flag: "🇪🇸" },
//   { text: "Ciao Mondo", language: "Italian", flag: "🇮🇹" },
//   { text: "你好，世界", language: "Chinese", flag: "🇨🇳" },
//   { text: "안녕하세요 세계", language: "Korean", flag: "🇰🇷" }
// ];
// const greetings = [
//   { text: "Hello", language: "English" },
//   { text: "नमस्ते", language: "Hindi" },
//   { text: "नमस्कार", language: "Marathi" },
//   { text: "السلام عليكم", language: "Arabic" },
//   { text: "Bonjour", language: "French" },
//   { text: "こんにちは", language: "Japanese" },
//   { text: "Hola", language: "Spanish" },
//   { text: "Ciao", language: "Italian" },
//   { text: "你好", language: "Chinese" },
//   { text: "안녕하세요", language: "Korean" }
// ];

const greetingContainer = document.querySelector('.greeting-container');
const greetingText = document.querySelector('.greeting-text');
let currentIndex = 0;

// Keep the portfolio hidden until the loading screen has fully lifted away
document.body.classList.add('is--intro-pending');

function showGreeting() {
  const loadingScreen = document.querySelector('.loading-screen');
  greetingText.classList.add('is--swapping');

  setTimeout(() => {
      // greetingText.innerHTML = `${greetings[currentIndex].text} 👋`;
      // greetingText.innerHTML = `${greetings[currentIndex].flag} ${greetings[currentIndex].text}`;
      const greeting = greetings[currentIndex];
      greetingText.innerHTML =
        `<code class="greeting-code"><span class="flag-icon flag-icon-${greeting.countryCode}"></span>${renderCode(greeting.greeting)}<span class="greeting-cursor" aria-hidden="true"></span></code>`;
      loadingScreen.style.setProperty('--greeting-from', greeting.colors[0]);
      loadingScreen.style.setProperty('--greeting-to', greeting.colors[1]);
      greetingText.classList.remove('is--swapping');

      currentIndex++;

      if (currentIndex < greetings.length) {
          setTimeout(showGreeting, GREETING_DURATION);
      } else {
          // Let the last greeting settle before the curtain lifts
          setTimeout(finishLoading, GREETING_DURATION);
      }
  }, GREETING_SWAP);
}

function finishLoading() {
  const loadingScreen = document.querySelector('.loading-screen');
  const mainContent = document.querySelector('.main-content');

  // Settle the last language's gradient into its first color and lift the
  // screen in that color: lifting it in black over the black page would make
  // the exit invisible
  const lastColor = greetings[greetings.length - 1].colors[0];
  loadingScreen.style.setProperty('--greeting-from', lastColor);
  loadingScreen.style.setProperty('--greeting-to', lastColor);
  loadingScreen.classList.add('is--lifting');

  // Fade the portfolio in as soon as the screen has cleared the top. With the
  // lift's ease-in-out curve the screen is ~98% gone at 80% of its duration,
  // so there is no need to wait for the animation's final frames. Timings
  // are read from the CSS so they stay in one place.
  const lift = getComputedStyle(loadingScreen);
  const seconds = (value) => parseFloat(value.split(',')[0]) || 0;
  const revealAfter = (seconds(lift.transitionDelay) + seconds(lift.transitionDuration) * 0.8) * 1000;
  setTimeout(() => {
    mainContent.style.opacity = '1';
    document.body.classList.remove('is--intro-pending');
    document.body.classList.add('is--revealing');
  }, revealAfter);

  // Take the screen out of the page once it has fully lifted away
  loadingScreen.addEventListener('transitionend', function(event) {
    if (event.target === loadingScreen && (event.propertyName === 'transform' || event.propertyName === 'opacity')) {
      loadingScreen.style.display = 'none';
    }
  });
}

// Start the animation when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
      greetingContainer.style.opacity = '1';
      showGreeting();
  }, 100);
});