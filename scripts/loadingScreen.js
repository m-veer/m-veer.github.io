const greetings = [
  { text: "Hello World", language: "English", countryCode: "gb" },
  { text: "नमस्ते दुनिया", language: "Hindi", countryCode: "in" },
  { text: "नमस्कार जग", language: "Marathi", countryCode: "in" },
  { text: "مرحبا بالعالم", language: "Arabic", countryCode: "sa" },
  { text: "Bonjour le monde", language: "French", countryCode: "fr" },
  { text: "こんにちは世界", language: "Japanese", countryCode: "jp" },
  { text: "Hola Mundo", language: "Spanish", countryCode: "es" },
  { text: "Ciao Mondo", language: "Italian", countryCode: "it" },
  { text: "你好，世界", language: "Chinese", countryCode: "cn" },
  { text: "안녕하세요 세계", language: "Korean", countryCode: "kr" }
];

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

function showGreeting() {
  greetingContainer.classList.remove('fade-in');
  
  setTimeout(() => {
      // greetingText.innerHTML = `${greetings[currentIndex].text} 👋`;
      // greetingText.innerHTML = `${greetings[currentIndex].flag} ${greetings[currentIndex].text}`;
      greetingText.innerHTML = `<span class="flag-icon flag-icon-${greetings[currentIndex].countryCode}"></span> ${greetings[currentIndex].text}`;
      greetingContainer.classList.add('fade-in');
      
      currentIndex++;
      
      if (currentIndex < greetings.length) {
          setTimeout(showGreeting, 100);
      } else {
          setTimeout(finishLoading, 100);
      }
  }, 100);
}

function finishLoading() {
  const loadingScreen = document.querySelector('.loading-screen');
  const mainContent = document.querySelector('.main-content');
  
  loadingScreen.style.transform = 'translateY(-100%)';
  // loadingScreen.style.opacity = '0';
  // loadingScreen.style.remove();
  mainContent.style.opacity = '1';
}

// Start the animation when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
      greetingContainer.style.opacity = '1';
      showGreeting();
  }, 100);
});