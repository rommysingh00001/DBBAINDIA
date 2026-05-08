"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true })
      if (data) setMessages(data)
    }
    fetchMessages()
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return
    const { error } = await supabase.from('messages').insert([{ content: input }])
    if (!error) {
      setMessages([...messages, { content: input }])
      setInput('')
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0d1117', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#161b22', borderRadius: '8px' }}>
              {m.content}
            </div>
          ))}
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '10px' }}>
          <input 
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSend} style={{ padding: '10px 20px', backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Send</button>
        </div>
      </div>
    </div>
  )
}
