import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import PostsList from './pages/PostsList'
import PostDetail from './pages/PostDetail'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Trash from './pages/Trash'

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/posts" className={({ isActive }) => isActive ? 'active' : ''}>Posts</NavLink></li>
          <li><NavLink to="/trash" className={({ isActive }) => isActive ? 'active' : ''}>Trash</NavLink></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/new" element={<AddPost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
      
      <Toaster position="bottom-right" />
    </Router>
  )
}

export default App
