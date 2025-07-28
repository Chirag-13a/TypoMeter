import { useState, useEffect, useRef } from "react";
import { generateWords } from "./wordgenrator";

const Home = () => {
  const [words, setWords] = useState(generateWords());
  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(30); 
  const [selectedTime, setSelectedTime] = useState(30);
  const [isStarted, setIsStarted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [typed, setTyped] = useState(0);
  const [wordStatus, setWordStatus] = useState({}); // Track correct/incorrect words
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isStarted && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && isStarted) {
      clearInterval(interval);
      if (inputRef.current) {
        inputRef.current.disabled = true;
      }
      setShowResults(true);
    }
    return () => clearInterval(interval);
  }, [isStarted, timer]);

  // Focus input when test starts
  useEffect(() => {
    if (isStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isStarted]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!isStarted) return;
    
    // Check if the input ends with a space
    if (value.endsWith(' ')) {
      const trimmed = value.trim();
      const currentWord = words[currentIndex];
      const isCorrect = trimmed === currentWord;
      
      // Update word status for visual feedback
      setWordStatus(prev => ({
        ...prev,
        [currentIndex]: isCorrect ? 'correct' : 'incorrect'
      }));
      
      if (isCorrect) setCorrect((c) => c + 1);
      setTyped((t) => t + 1);
      setCurrentIndex((i) => i + 1);
      setInput('');
    } else {
      setInput(value);
    }
  };

  const startTest = () => {
    setWords(generateWords()); 
    setIsStarted(true);
    setCorrect(0);
    setTyped(0);
    setCurrentIndex(0);
    setTimer(selectedTime);
    setInput('');
    setWordStatus({});
    setShowResults(false);
  };

  const restartTest = () => {
    setShowResults(false);
    setIsStarted(false);
    setTimer(selectedTime);
    setInput('');
    setCorrect(0);
    setTyped(0);
    setCurrentIndex(0);
    setWordStatus({});
  };

  const accuracy = typed ? Math.round((correct / typed) * 100) : 0;
  const wpm = Math.round((correct / ((selectedTime - timer) / 60)) || 0);
  const timeElapsed = selectedTime - timer;

  const getWordClassName = (index) => {
    if (index === currentIndex) return 'current-word';
    if (wordStatus[index] === 'correct') return 'correct-word';
    if (wordStatus[index] === 'incorrect') return 'incorrect-word';
    return 'word';
  };

  return (
    <div>
    <h1 className="heading">TypoMeter</h1>
      
    <div className="container">
     
      {!isStarted && !showResults && (
        <div className="controls">
          <label htmlFor="time-select">Select Test Duration:</label>
          <select
            id="time-select"
            value={selectedTime}
            onChange={(e) => setSelectedTime(Number(e.target.value))}
          >
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={45}>45 seconds</option>
            <option value={60}>1 minute</option>
          </select>
          <button className="start-btn" onClick={startTest}>
            Start Test
          </button>
        </div>
      )}

      {isStarted && (
        <div className={`timer ${timer <= 10 ? 'urgent' : ''}`}>
          <span>Time Left: {timer}s</span>
        </div>
      )}

      {isStarted && (
        <div className="word-box">
          {words.map((word, idx) => (
            <span
              key={idx}
              className={getWordClassName(idx)}
            >
              {word}
            </span>
          ))}
        </div>
      )}

      {isStarted && (
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="input"
          ref={inputRef}
          disabled={!isStarted}
          placeholder="Start typing..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      )}

      {showResults && (
        <div className="results">
          <h2>Test Results</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{wpm}</div>
              <div className="stat-label">Words Per Minute</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{accuracy}%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{correct}</div>
              <div className="stat-label">Correct Words</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{typed}</div>
              <div className="stat-label">Total Typed</div>
            </div>
          </div>
          <button className="restart-btn" onClick={restartTest}>
            Take Another Test
          </button>
        </div>
      )}

      {isStarted && !showResults && (
        <div style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.8)' }}>
          <p>Progress: {typed} words typed • {correct} correct • {accuracy}% accuracy</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;
