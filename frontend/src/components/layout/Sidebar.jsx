import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/transaksione', label: 'Transaksione' },
  { to: '/fatura', label: 'Fatura' },
  { to: '/klientet', label: 'Klientë' },
  { to: '/furnitoret', label: 'Furnitorë' },
  { to: '/kategorite', label: 'Kategori' },
  { to: '/raportet', label: 'Raporte' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">ProfitX</div>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}