import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link to="/" className="nav-link">Quiz</Link>
            <Link to="/admin" className="nav-link">Admin Panel</Link>
        </nav>
    )
}