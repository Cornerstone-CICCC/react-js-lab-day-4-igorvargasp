import { Link } from 'react-router-dom'
import { usePostStore } from '../stores/post.store'

export default function PostsList() {
  const posts = usePostStore((state) =>
    state.posts.filter((post) => !post.isDeleted)
  )

  return (
    <div className="container">
      <h1 className="page-title">All Posts</h1>
      <Link to="/posts/new">
        <button>Create</button>
      </Link>
      
      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts yet. Create your first post!</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="post-card">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
