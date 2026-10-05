// Spoken languages, each paired with a programming language. Shared by the
// loading screen (greetings), the theme slider (colors and flags), and the
// translator (scripts/i18n.js). Slider position = index + 1; 0 is black.
//
// colors:   deepened tones of the flag, dark enough for white text
// greeting: the loading-screen line as [token type, text] pairs, where "fn" is
//           a function or keyword, "obj" an object or namespace, "p"
//           punctuation, and "str" the greeting string
// comment:  how the language writes a comment, used to restyle the menu
// print:    how the language prints a string, wrapped around the intro text
window.PORTFOLIO_LOCALES = [
  { code: "en", lang: "en", dir: "ltr", countryCode: "gb", name: "English", programming: "Python",
    colors: ["#0b1d4f", "#6e0f1f"], foreground: "232 237 255",
    greeting: [["fn", "print"], ["p", "("], ["str", "\"Hello World!\""], ["p", ")"]],
    comment: ["# ", ""], print: ["print(\"", "\")"] },
  { code: "hi", lang: "hi", dir: "ltr", countryCode: "in", name: "हिन्दी", programming: "JavaScript",
    colors: ["#8a3f00", "#0d4f12"], foreground: "255 240 222",
    greeting: [["obj", "console"], ["p", "."], ["fn", "log"], ["p", "("], ["str", "\"नमस्ते दुनिया!\""], ["p", ");"]],
    comment: ["// ", ""], print: ["console.log(\"", "\");"] },
  { code: "mr", lang: "mr", dir: "ltr", countryCode: "in", name: "मराठी", programming: "Shell",
    colors: ["#4d1600", "#9a3d00"], foreground: "255 222 186",
    greeting: [["fn", "echo"], ["p", " "], ["str", "\"नमस्कार जग!\""]],
    comment: ["# ", ""], print: ["echo \"", "\""] },
  { code: "ar", lang: "ar", dir: "rtl", countryCode: "sa", name: "العربية", programming: "Go",
    colors: ["#00502a", "#062a17"], foreground: "222 255 236",
    greeting: [["obj", "fmt"], ["p", "."], ["fn", "Println"], ["p", "("], ["str", "\"مرحبا بالعالم!\""], ["p", ")"]],
    comment: ["// ", ""], print: ["fmt.Println(\"", "\")"] },
  { code: "fr", lang: "fr", dir: "ltr", countryCode: "fr", name: "Français", programming: "Java",
    colors: ["#00306b", "#7a1a14"], foreground: "232 238 255",
    greeting: [["obj", "System.out"], ["p", "."], ["fn", "println"], ["p", "("], ["str", "\"Bonjour le monde !\""], ["p", ");"]],
    comment: ["// ", ""], print: ["System.out.println(\"", "\");"] },
  { code: "ja", lang: "ja", dir: "ltr", countryCode: "jp", name: "日本語", programming: "Rust",
    colors: ["#7a0020", "#2b0a12"], foreground: "255 230 234",
    greeting: [["fn", "println!"], ["p", "("], ["str", "\"こんにちは世界！\""], ["p", ");"]],
    comment: ["// ", ""], print: ["println!(\"", "\");"] },
  { code: "es", lang: "es", dir: "ltr", countryCode: "es", name: "Español", programming: "SQL",
    colors: ["#7a0d12", "#7a5a00"], foreground: "255 226 150",
    greeting: [["fn", "SELECT"], ["p", " "], ["str", "'¡Hola Mundo!'"], ["p", ";"]],
    comment: ["-- ", ""], print: ["SELECT '", "';"] },
  { code: "it", lang: "it", dir: "ltr", countryCode: "it", name: "Italiano", programming: "HTML",
    colors: ["#00592c", "#7a1621"], foreground: "236 255 242",
    greeting: [["p", "<"], ["fn", "h1"], ["p", ">"], ["str", "Ciao Mondo!"], ["p", "</"], ["fn", "h1"], ["p", ">"]],
    comment: ["<!-- ", " -->"], print: ["<h1>", "</h1>"] },
  { code: "zh", lang: "zh-Hans", dir: "ltr", countryCode: "cn", name: "中文", programming: "HCL",
    colors: ["#8a0d14", "#6b5000"], foreground: "255 228 130",
    greeting: [["fn", "output"], ["p", " "], ["obj", "\"hi\""], ["p", " { "], ["obj", "value"], ["p", " = "], ["str", "\"你好，世界！\""], ["p", " }"]],
    comment: ["# ", ""], print: ["output \"intro\" { value = \"", "\" }"] },
  { code: "ko", lang: "ko", dir: "ltr", countryCode: "kr", name: "한국어", programming: "SCSS",
    colors: ["#00285a", "#6b0a1e"], foreground: "236 242 255",
    greeting: [["fn", "@debug"], ["p", " "], ["str", "\"안녕하세요 세계!\""], ["p", ";"]],
    comment: ["// ", ""], print: ["@debug \"", "\";"] }
];
