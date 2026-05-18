import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../api/posts'
import './CreatePostPage.css'

function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createPost({ title, content })
      navigate(`/posts/${res.data.id}`)
    } catch {
      setError('Failed to create post')
    }
  }

  return (
    <div className="create-container">
      <div className="create-card">
        <h1>Write a New Post</h1>
        <p className="create-subtitle">Share your thoughts with the world</p>
        {error && <div className="create-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Post title..." value={title}
            onChange={e => setTitle(e.target.value)} required />
          <textarea placeholder="Write your post content here..."
            value={content} onChange={e => setContent(e.target.value)}
            rows={12} required />
          <div className="create-actions">
            <button type="button" onClick={() => navigate('/')} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-publish">Publish Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostPage