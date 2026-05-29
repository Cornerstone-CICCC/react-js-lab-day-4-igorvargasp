import { useParams, Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { usePostStore } from '../stores/post.store'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = usePostStore((state) => state.posts.find((p) => p.id === id))
  const deletePost = usePostStore((state) => state.deletePost)

  if (!post) {
    return (
      <div className="container">
        <p>Post not found</p>
        <Link to="/posts" className="back-button">Back to Posts</Link>
      </div>
    )
  }

  const handleDelete = () => {
    deletePost(id)
    toast.success('Post deleted successfully!')
    navigate('/posts')
  }

  return (
    <div className="container">
      <Link to="/posts" className="back-button">← Back to Posts</Link>
      
      <div className="post-detail">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        
        <div className="post-actions">
          <Link to={`/posts/${id}/edit`}>
            <button>Edit</button>
          </Link>
          <button className="danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}
