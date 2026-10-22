import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'

const Placeholder = ({ title }) => <h2>{title}</h2>

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
        <Route path="/transaksione" element={<Placeholder title="Transaksione" />} />
        <Route path="/fatura" element={<Placeholder title="Fatura" />} />
        <Route path="/klientet" element={<Placeholder title="Klientë" />} />
        <Route path="/furnitoret" element={<Placeholder title="Furnitorë" />} />
        <Route path="/raportet" element={<Placeholder title="Raporte" />} />
      </Route>
    </Routes>
  )
}