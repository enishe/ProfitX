import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Clients from './pages/Clients'

const Placeholder = ({ title }) => <h2>{title}</h2>

export default function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} /> {/* SHTUAR PËRKOHËSISHT PËR TEST */}
       <Route path="/register" element={<Register />} /> {/* PËRKOHËSISHT PËR TEST */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
        <Route path="/transaksione" element={<Placeholder title="Transaksione" />} />
        <Route path="/fatura" element={<Placeholder title="Fatura" />} />
       <Route path="/klientet" element={<Clients />} />
        <Route path="/furnitoret" element={<Placeholder title="Furnitorë" />} />
        <Route path="/raportet" element={<Placeholder title="Raporte" />} />
      </Route>
    </Routes>
  )
}