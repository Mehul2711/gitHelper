"use client";
import { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser } from "react-icons/fa";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); 
  const [typingMessage, setTypingMessage] = useState("");

  const messagesEndRef = useRef(null); 


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); 
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: "user", text: input };
      setMessages([...messages, userMessage]);
      setInput(""); 
      setIsTyping(true); 

      try {
        const res = await fetch(
          `/api/explain?command=${encodeURIComponent(input)}`
        );
        if (res.ok) {
          const data = await res.json();
          simulateTypingByWords(data.message); 
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "Error: Could not fetch response" },
          ]);
          setIsTyping(false);
        }
      } catch (error) {
        console.error("API Request Failed: ", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "API Request Failed" },
        ]);
        setIsTyping(false); 
      }
    }
  };

  
  const simulateTypingByWords = (message) => {
    const words = message.split(" ");
    setTypingMessage(""); 
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < words.length) {
        setTypingMessage((prev) => prev + " " + words[index]);
        scrollToBottom(); 
        index++;
      } else {
        clearInterval(typingInterval);
        const botMessage = { sender: "bot", text: formatMessage(message) }; 
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsTyping(false); 
      }
    }, 300); 
  };

  
  const formatMessage = (message) => {
    
    return message.replace(/step\s\d+:/gi, (match) => `\n• ${match.trim()}`); 
  };

 
  const handleClear = () => {
    setMessages([]); 
    setTypingMessage(""); 
  };

  return (
    <div className="min-h-screen bg-gif flex flex-col items-center justify-center gap-10">
      <h1 className="text-7xl font-bold text-purple-300 mb-10 animate-pulse font-vt323 ">
        GIT HELPER
      </h1>

      <div className="relative z-10 w-full max-w-md  p-6 bg-purple-800/60 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-400 transition-all transform hover:scale-105">
        <div className="mb-4 h-96 overflow-y-auto border p-4 rounded-md bg-purple-900/80 shadow-inner border-purple-600 text-white break-words">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-3 p-3 rounded-lg transition-all ${
                message.sender === "user"
                  ? "justify-end bg-purple-700 text-white text-right rounded-tr-none shadow-lg"
                  : "justify-start bg-purple-600 text-gray-200 text-left rounded-tl-none shadow-lg"
              }`}
            >
              {message.sender === "bot" && (
                <FaRobot className="mr-2 flex-shrink-0 text-3xl text-green-400" />
              )}{" "}
           
              {message.sender === "user" && (
                <FaUser className="mr-2 text-xl text-blue-300" />
              )}{" "}
             
              <div className="break-words whitespace-pre-line">
                <strong>{message.sender === "user" ? "You" : "Bot"}:</strong>{" "}
                {message.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start space-x-4 ">
              <FaRobot className="text-3xl text-green-500 flex-shrink-0 m-1" />
              <div className="ml-2 break-words">{typingMessage}</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 p-3 bg-purple-700 text-white border border-purple-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Ask about Git commands..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="ml-3 p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSend}
            disabled={isTyping} 
          >
            Send
          </button>

          <button
            className="ml-2 p-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleClear}
            disabled={isTyping} 
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
