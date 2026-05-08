"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PlusCircle, Trash2, LayoutDashboard } from 'lucide-react'

export default function AdminPanel() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)

  const addCourse = async () => {
    if (!title || !desc) return alert("Please fill all fields")
    setLoading(true)
    
    const { error } = await supabase
      .from('courses')
      .insert([{ title: title, description: desc }])

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Course added successfully!")
      setTitle('')
      setDesc('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="text-blue-500" size={32} />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="bg-[#161b22] border border-gray-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-6">Add New Course</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Course Title</label>
              <input 
                className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-lg focus:border-blue-500 outline-none"
                placeholder="e.g. Full Stack Web Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea 
                className="w-full bg-[#0d1117] border border-gray-700 p-3 rounded-lg focus:border-blue-500 outline-none h-32"
                placeholder="Enter course details..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <button 
              onClick={addCourse}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? "Adding..." : <><PlusCircle size={20} /> Add Course</>}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-500 hover:underline">← Back to Main Website</a>
        </div>
      </div>
    </div>
  )
}
