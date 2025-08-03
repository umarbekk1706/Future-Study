import React, { useState, useEffect, useRef } from "react";
import { askAI, fetchModels } from "./askAI";
import "./chat.css";

export default function ChatOverlay() {
  const defaultSettings = {
    model: "deepseek-ai/DeepSeek-R1",
    borderRadius: 12,
    messageRadius: 18,
    bgColor: "#001f3f",
    headerColor: "#002f5f",
    blur: 8,
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("chat-settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [models, setModels] = useState([]);

  const chatRef = useRef(null);

  useEffect(() => {
    fetchModels().then(setModels);
  }, []);

  useEffect(() => {
    localStorage.setItem("chat-settings", JSON.stringify(settings));
  }, [settings]);

  const toggleChat = () => setVisible(!visible);
  const toggleFullscreen = () => setFullscreen(!fullscreen);
  const toggleSettings = () => setSettingsOpen(!settingsOpen);
  const clearChat = () => setMessages([]);
  const resetSettings = () => setSettings(defaultSettings);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    const context = [
      { role: "system", content: "You are a helpful assistant" },
      ...newMsgs,
    ];
    const aiReply = await askAI(context, settings.model);
    setMessages([...newMsgs, { role: "assistant", content: aiReply }]);
    setLoading(false);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const getRoleLabel = (role) =>
    role === "assistant" ? "AI" : role === "user" ? "You" : "Admin";

  const getMessageClass = (role) =>
    `message ${role === "assistant" ? "ai" : role === "user" ? "you" : "admin"}`;

  return (
    <div id="chat-container">
      <div id="chat-bubble-button" onClick={toggleChat}>💬</div>

      {visible && (
        <div
          id="chat-widget"
          className={fullscreen ? "fullscreen" : ""}
          style={{
            borderRadius: `${settings.borderRadius}px`,
            backgroundColor: settings.bgColor,
            backdropFilter: `blur(${settings.blur}px)`,
            WebkitBackdropFilter: `blur(${settings.blur}px)`,
          }}
        >
          <div id="chat-header" style={{ backgroundColor: settings.headerColor }}>
            <span><b><u>FS</u></b> AI Assistant</span>
            <div className="chat-header-buttons">
              <button onClick={toggleSettings}>⚙️</button>
              <button onClick={toggleFullscreen}>🖵</button>
              <button onClick={clearChat}>🗑</button>
              <button onClick={toggleChat}>×</button>
            </div>
          </div>

          <div id="chat-messages" ref={chatRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={getMessageClass(m.role)}
                style={{ borderRadius: `${settings.messageRadius}px` }}
              >
                <strong>{getRoleLabel(m.role)}:</strong> {m.content}
              </div>
            ))}
            {loading && <div className="message ai">AI: Typing...</div>}
          </div>

          <div id="chat-input-area">
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
            />
            <button id="chat-send-button" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="settings-modal">
          <label>AI Model</label>
          <select
            value={settings.model}
            onChange={(e) => setSettings({ ...settings, model: e.target.value })}
          >
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <label>Chat BG Color</label>
          <input
            type="color"
            value={settings.bgColor}
            onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })}
          />

          <label>Header Color</label>
          <input
            type="color"
            value={settings.headerColor}
            onChange={(e) => setSettings({ ...settings, headerColor: e.target.value })}
          />

          <label>Blur Effect ({settings.blur}px)</label>
          <input
            type="range"
            min="0"
            max="20"
            value={settings.blur}
            onChange={(e) => setSettings({ ...settings, blur: Number(e.target.value) })}
          />

          <label>Chat Border Radius</label>
          <input
            type="range"
            min="0"
            max="40"
            value={settings.borderRadius}
            onChange={(e) => setSettings({ ...settings, borderRadius: Number(e.target.value) })}
          />

          <label>Message Border Radius</label>
          <input
            type="range"
            min="0"
            max="30"
            value={settings.messageRadius}
            onChange={(e) => setSettings({ ...settings, messageRadius: Number(e.target.value) })}
          />

          <button onClick={resetSettings}>Reset Settings</button>
          <button onClick={toggleSettings}>Close</button>
        </div>
      )}
    </div>
  );
}
