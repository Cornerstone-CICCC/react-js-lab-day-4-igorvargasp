import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { usePostStore } from '../stores/post.store'

export default function Trash() {
  const deletedPosts = usePostStore((state) =>
    state.posts.filter((post) => post.isDeleted)
  )
  const recoverPost = usePostStore((state) => state.recoverPost)
  const permanentlyDeletePost = usePostStore((state) => state.permanentlyDeletePost)

  const handleRecover = (id) => {
    recoverPost(id)
    toast.success('Post recovered successfully!')
  }

  const handlePermanentDelete = (id) => {
    permanentlyDeletePost(id)
    toast.success('Post permanently deleted!')
  }

  return (
    <div className="container">
      <h1 className="page-title">Trash</h1>
      
      {deletedPosts.length === 0 ? (
        <div className="empty-state">
          <p>No deleted posts</p>
        </div>
      ) : (
        <div className="posts-list">
          {deletedPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button className="success" onClick={() => handleRecover(post.id)}>
                  Recover
                </button>
                <button className="danger" onClick={() => handlePermanentDelete(post.id)}>
                  Delete permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
