import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatApp.css";

function ChatApp() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // New state for typing effect'
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendRequest = () => {
    // Display the loading message
    setIsLoading(true);
    setOutputText("Result is generating...");

    // Make an Axios GET request to your URL
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        const randomDelay = Math.random() * 2000 + 3000;
        // Hide the loading message and display the response data
        setShowOutput(true);
        setTimeout(() => {
          setIsLoading(false);
          setOutputText(JSON.stringify(response.data, null, 2));
        }, randomDelay); // Simulate a delay (1 second) for typing effect
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
        setIsLoading(false);
        setOutputText("Error occurred while fetching data.");
      });
    console.log(isLoading);
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
          <button onClick={sendRequest} disabled={isLoading}>
            Submit
          </button>
          <button onClick={handleReset}>Reset</button>
        </div>
        {showOutput && (
          <div className="chat-output">
            {isLoading ? (
              <span className="typing-indicator">
                Your bug report is generating...
              </span>
            ) : (
              <textarea
                className="textarea"
                rows="10"
                cols="120"
                value={outputText}
                readOnly
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatApp;
