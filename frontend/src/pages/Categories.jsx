import { useCallback, useEffect, useState } from 'react'
import api from '../api/api'
import '../styles/party.css'
import '../styles/categories.css'

const ENDPOINT = '/categories'
const TYPE_LABELS = { INCOME: 'Të ardhura', EXPENSE: 'Shpenzime' }
const emptyForm = { name: '', type: 'INCOME' }

function extractList(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  return []
}

function errorMessage(err) {
  return (
    err.response?.data?.message ||
    err.response?.data?.error ||
    'Ndodhi një gabim. Provoni përsëri.'
  )
}

export default function Categories() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get(ENDPOINT)
      setItems(extractList(res.data))
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const name = form.name.trim()
    if (!name) {
      setError('Emri është i detyrueshëm.')
      return
    }
    if (name.length > 100) {
      setError('Emri nuk mund të ketë më shumë se 100 karaktere.')
      return
    }

    const payload = { name, type: form.type }

    setSaving(true)
    try {
      if (editingId) {
        await api.put(ENDPOINT + '/' + editingId, payload)
      } else {
        await api.post(ENDPOINT, payload)
      }
      resetForm()
      await load()
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({ name: item.name || '', type: item.type || 'INCOME' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (item) => {
    if (!window.confirm('Të fshihet kategoria "' + item.name + '"?')) return
    setError('')
    try {
      await api.delete(ENDPOINT + '/' + item.id)
      await load()
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <div className="party-page">
      <h2>Kategoritë</h2>

      {error && <div className="party-error">{error}</div>}

      <form className="party-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Ndrysho kategorinë' : 'Shto kategori'}</h3>
        <div className="party-grid">
          <input
            name="name"
            placeholder="Emri i kategorisë *"
            value={form.name}
            onChange={handleChange}
            maxLength={100}
          />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="INCOME">Të ardhura</option>
            <option value="EXPENSE">Shpenzime</option>
          </select>
        </div>
        <div className="party-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Duke ruajtur...' : editingId ? 'Ruaj ndryshimet' : 'Shto'}
          </button>
          {editingId && (
            <button type="button" className="secondary" onClick={resetForm}>
              Anulo
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Duke ngarkuar...</p>
      ) : items.length === 0 ? (
        <p className="party-empty">Nuk ka kategori ende.</p>
      ) : (
        <div className="party-table-wrap">
          <table className="party-table">
            <thead>
              <tr>
                <th>Emri</th>
                <th>Lloji</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <span className={'category-type ' + (item.type === 'INCOME' ? 'income' : 'expense')}>
                      {TYPE_LABELS[item.type] || item.type}
                    </span>
                  </td>
                  <td className="party-row-actions">
                    <button type="button" className="secondary" onClick={() => handleEdit(item)}>
                      Ndrysho
                    </button>
                    <button type="button" className="danger" onClick={() => handleDelete(item)}>
                      Fshi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}