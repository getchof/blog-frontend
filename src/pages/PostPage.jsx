import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPost, deletePost, addComment } from '../api/posts'
import { useAuth } from '../context/AuthContext'
import './PostPage.css'

function PostPage() {
  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')

  const fetchPost = () => {
    getPost(id)
      .then(res => setPost(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchPost() }, [id])

  const handleDelete = async () => {
    if (window.confirm('Delete this post?')) {
      await deletePost(id)
      navigate('/')
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    await addComment(id, { body: comment })
    setComment('')
    fetchPost()
  }

  if (loading) return <div className="loading">Loading post...</div>
  if (!post) return <div className="loading">Post not found</div>

  return (
    <div className="post-container">
      <div className="post-header">
        <h1>{post.title}</h1>
        <p className="post-meta">By <strong>{post.author.name}</strong> — {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        {user && user.userId === post.authorId && (
          <div className="post-actions">
            <Link to={`/posts/${id}/edit`} className="btn-edit">Edit</Link>
            <button onClick={handleDelete} className="btn-delete">Delete</button>
          </div>
        )}
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="comments-section">
        <h2>Comments ({post.comments.length})</h2>
        {post.comments.length === 0 && <p className="no-comments">No comments yet. Be the first!</p>}
        {post.comments.map(c => (
          <div key={c.id} className="comment-card">
            <div className="comment-header">
              <strong>{c.author.name}</strong>
              <span>{new Date(c.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <p>{c.body}</p>
          </div>
        ))}

        {token ? (
          <form onSubmit={handleComment} className="comment-form">
            <h3>Leave a comment</h3>
            <textarea placeholder="Write your comment..." value={comment}
              onChange={e => setComment(e.target.value)} required rows={4} />
            <button type="submit">Post Comment</button>
          </form>
        ) : (
          <div className="login-prompt">
            <Link to="/login">Log in</Link> to leave a comment
          </div>
        )}
      </div>
    </div>
  )
}

export default PostPage