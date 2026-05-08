"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Setup (Inhe Vercel Environment Variables mein dalna)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CanvasWebsite() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // 1. Fetch Messages from Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      let { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      if (data) setChatHistory(data);
    };
    fetchMessages();
  }, []);

  // 2. Send Message function
  const sendMessage = async () => {
    if (!message) return;
    const { error } = await supabase.from('messages').insert([{ content: message }]);
    if (!error) {
      setChatHistory([...chatHistory, { content: message }]);
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0d1117] font-sans">
      {/* Sidebar - Chat History */}
      <aside className="w-64 border-r border-gray-800 p-4 hidden md:flex flex-col">
        <button className="w-full py-2 border border-gray-700 rounded-md mb-4 hover:bg-gray-800 transition">
          + New Chat
        </button>
        <div className="flex-1 overflow-y-auto space-y-2 text-sm text-gray-400">
          {chatHistory.map((chat, i) => (
            <div key={i} className="p-2 hover:bg-gray-800 rounded truncate cursor-pointer">
              {chat.content}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col items-center justify-between p-6">
        <div className="w-full max-w-3xl flex-1 overflow-y-auto space-y-6">
          {chatHistory.length === 0 ? (
            <div className="text-center mt-20">
              <h1 className="text-3xl font-bold text-gray-200">How can I help you today?</h1>
            </div>
          ) : (
            chatHistory.map((msg, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0"></div>
                <p className="text-gray-300 leading-relaxed">{msg.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Input Bar */}
        <div className="w-full max-w-3xl mb-4 relative">
          <input
            type="text"
            className="w-full bg-[#21262d] text-white p-4 pr-16 rounded-xl border border-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            className="absolute right-3 top-3 bg-white text-black px-4 py-1.5 rounded-lg font-medium hover:bg-gray-200"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
