import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY', // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        prompt: messages.join('\n') + '\nUser: ' + inputText,
        max_tokens: 50,
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      const botReply = data.choices[0].text.trim();
      setMessages([...messages, 'User: ' + inputText, 'ChatBot: ' + botReply]);
      setInputText('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    setMessages(['ChatBot: Hi, how can I assist you today?']);
  }, []);

  return (
    <div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
