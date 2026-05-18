import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../api/posts'
import './HomePage.css'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllPosts()
      .then(res => setPosts(res.data))
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Loading posts...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="home-container">
      <h1 className="home-title">Latest Posts</h1>
      {posts.length === 0 && <p>No posts yet. Be the first to write one!</p>}
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
            <p className="post-meta">By <strong>{post.author.name}</strong> — {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage