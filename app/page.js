"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  // Messages fetch karna
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true })
      if (data) setMessages(data)
    }
    fetchMessages()
  }, [])

  // Message send karna
  const handleSend = async () => {
    if (!input.trim()) return
    const { error } = await supabase.from('messages').insert([{ content: input }])
    if (!error) {
      setMessages([...messages, { content: input }])
      setInput('')
    }
  }

  return (
    <div className="flex h-screen bg-[#0d1117]">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 p-4 hidden md:block">
        <button className="w-full p-2 border border-gray-700 rounded-lg hover:bg-gray-800">+ New Chat</button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="flex gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0"></div>
              <p className="text-gray-300">{m.content}</p>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-6">
          <div className="relative">
            <input 
              className="w-full bg-[#21262d] border border-gray-700 p-4 rounded-xl focus:outline-none focus:border-blue-500"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="absolute right-3 top-3 bg-white text-black px-4 py-1.5 rounded-lg font-bold">Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
