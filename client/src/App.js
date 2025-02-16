import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/chat', { message: input });
            const formattedReply = formatBotResponse(response.data.reply);
            setMessages([...newMessages, { role: 'bot', content: formattedReply }]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages([...newMessages, { role: 'bot', content: "Oops! Something went wrong." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // Function to format bot responses into step-by-step structure
    const formatBotResponse = (response) => {
        return response
            .replace(/\*\*(.*?)\*\*/g, '\n➡️ **$1**') // Formats sections with "➡️"
            .replace(/\d+\.\s/g, '\n🔹 ') // Adds bullet points for lists
            .trim();
    };

    return (
        <div className="chat-container">
            <h1>🚀 SKI Chat</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.role === 'user' ? 'user-msg' : 'bot-msg'}>
                        <strong>{msg.role === 'user' ? 'You' : 'SKI'}:</strong> {msg.content}
                    </p>
                ))}
                {loading && <p className="bot-msg">SKI is typing<span className="dots">...</span></p>}
            </div>
            <div className="input-box">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask something..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default App;
