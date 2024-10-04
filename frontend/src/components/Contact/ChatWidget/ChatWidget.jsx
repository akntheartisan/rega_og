import React, { useState, useEffect } from 'react';
import './ChatWidget.css'; // Import the styles
import scooterImage from '../../../assets/images/scooter4.png';

const ChatWidget = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(true);

  const toggleChat = () => {
    setChatVisible(prevState => !prevState);
    setNotificationVisible(false); // Hide notification when chat is opened
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'user', text: inputValue }
      ]);
      setInputValue('');

      // Simulate a bot response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'bot', text: 'Reachout our help line!' }
        ]);
      }, 500);
    }
  };

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (!chatVisible) {
        setNotificationVisible(true);
      }
    }, 5000); // Show notification every 10 seconds

    return () => clearInterval(notificationInterval); // Cleanup interval on unmount
  }, [chatVisible]);

  return (
    <>
      {notificationVisible && !chatVisible && (
        <div className="chat-notification" onClick={toggleChat}>
          <p>Ask me anything</p>
        </div>
      )}
      <div className="chat-widget-container">
        <button className="chat-widget-button" onClick={toggleChat}>
          <img src={scooterImage} alt="Scooter" className="scooter" />
        </button>

        {chatVisible && (
          <div className="chat-window">
            <div className="chat-window-header">Live Chat</div>
            <div className="chat-window-body">
              {messages.map((message, index) => (
                <p key={index} className={message.sender}>
                  {message.sender === 'user' ? 'You: ' : 'Bot: '}
                  {message.text}
                </p>
              ))}
            </div>
            <div className="chat-window-footer">
              <input
                type="text"
                className="chat-input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
              />
              <button className="chat-send-button" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
