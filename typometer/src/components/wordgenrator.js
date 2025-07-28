
 const wordList  = [
  "apple", "banana", "keyboard", "react", "orange", "mouse", "letter", "laptop", "monitor", "hello",
  "world", "typing", "speed", "random", "accuracy", "test", "word", "space", "delete", "code",
  "javascript", "function", "return", "array", "object", "value", "input", "output", "index", "loop",
  "logic", "start", "stop", "click", "reset", "timer", "type", "game", "focus", "result",
  "score", "fast", "slow", "smart", "quick", "right", "wrong", "easy", "hard", "practice",
  "chat", "letter", "text", "press", "enter", "shift", "capslock", "control", "option", "backspace",
  "line", "spell", "mistake", "perfect", "skill", "goal", "level", "high", "low", "track",
  "stats", "begin", "again", "break", "win", "fail", "minute", "second", "time", "testcase",
  "status", "typingtest", "verify", "match", "record", "session", "clean", "check", "compare", "scoreboard",
  "event", "inputbox", "pointer", "scroll", "screen", "refresh", "load", "update", "submit", "restart"
];

export function generateWords(count = 50) {
  // Create a copy of the word list and shuffle it
  const shuffled = [...wordList].sort(() => 0.5 - Math.random());
  // Return the first 'count' words from the shuffled array
  return shuffled.slice(0, count);
}
