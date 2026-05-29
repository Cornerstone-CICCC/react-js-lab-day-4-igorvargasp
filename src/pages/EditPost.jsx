import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { usePostStore } from '../stores/post.store'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = usePostStore((state) => state.posts.find((p) => p.id === id))
  const updatePost = usePostStore((state) => state.updatePost)
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    }
  }, [post])

  if (!post) {
    return (
      <div className="container">
        <p>Post not found</p>
        <Link to="/posts" className="back-button">Back to Posts</Link>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    updatePost(id, title, content)
    toast.success('Post updated successfully!')
    navigate(`/posts/${id}`)
  }

  return (
    <div className="container">
      <Link to={`/posts/${id}`} className="back-button">← Back to Post</Link>
      
      <h1 className="page-title">Edit Post</h1>
      
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
            <button type="submit">Update Post</button>
            <Link to={`/posts/${id}`}>
              <button type="button">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
