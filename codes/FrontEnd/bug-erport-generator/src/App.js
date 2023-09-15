import React, { useState, useEffect } from "react";
import "./ChatApp.css";

function ChatApp() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // New state for typing effect

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    // Replace this section with code to send inputText to a backend (e.g., an API) for processing
    const randomDelay = Math.random() * 2000 + 3000; // Random delay between 3 and 5 seconds

    setOutputText("");
    setIsTyping(true); // Start typing animation
    setTimeout(() => {
      setOutputText(inputText);
      setIsTyping(false); // Stop typing animation
    }, randomDelay); // Simulate a delay (1 second) for typing effect

    setShowOutput(true); // Show the output
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setShowOutput(false);
  };

  // useEffect(() => {
  //   if (showOutput) {
  //     // Scroll to the bottom of the chat output when new content is shown
  //     const chatOutput = document.querySelector(".chat-output");
  //     chatOutput.scrollTop = chatOutput.scrollHeight;
  //   }
  // }, [showOutput]);

  return (
    <div className="chat-app">
      <div className="chat-title">AI Bug Report Generator</div>
      <div className="chat-container">
        <div className="chat-input">
          <input
            type="text"
            placeholder="Enter your input..."
            value={inputText}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        {showOutput && (
          <div className="chat-output">
            {outputText}
            {isTyping && (
              <span className="typing-indicator">
                Your bug report is generating...
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatApp;
