"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    async function getMessages() {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true })
      if (data) setMessages(data)
    }
    getMessages()
  }, [])

  const send = async () => {
    if (!input) return
    const { error } = await supabase.from('messages').insert([{ content: input }])
    if (!error) {
      setMessages([...messages, { content: input }])
      setInput('')
    }
  }

  return (
    <div style={{ color: 'white', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ background: '#161b22', padding: '15px', borderRadius: '10px', marginBottom: '10px', border: '1px solid #30363d' }}>
            {m.content}
          </div>
        ))}
      </div>
      <div style={{ padding: '20px', borderTop: '1px solid #30363d', display: 'flex', gap: '10px', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <input 
          style={{ flex: 1, padding: '12px', background: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '5px' }}
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type here..."
        />
        <button onClick={send} style={{ padding: '10px 20px', background: '#238636', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  )
}
