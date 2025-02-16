require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Ollama } = require('ollama');

const app = express();
app.use(cors());
app.use(express.json());

const ollama = new Ollama({ host: "http://host.docker.internal:11434" });  // ✅ Connect to Ollama on host machine

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Received message:", message);
        const response = await ollama.chat({ model: "llama3.2:1b", messages: [{ role: "user", content: message }] });
        console.log("Ollama response:", response);
        res.json({ reply: response.message.content });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Error processing request", details: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
