import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { usePostStore } from '../stores/post.store'

export default function AddPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const addPost = usePostStore((state) => state.addPost)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    addPost(title, content)
    toast.success('Post created successfully!')
    navigate('/posts')
  }

  return (
    <div className="container">
      <Link to="/posts" className="back-button">← Back to Posts</Link>
      
      <h1 className="page-title">Create New Post</h1>
      
      <div style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
            />
          </div>

          <div className="form-actions">
            <button type="submit">Create Post</button>
            <Link to="/posts">
              <button type="button">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
