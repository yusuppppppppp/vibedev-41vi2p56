import { useBugJournal } from './hooks/useBugJournal'
import { BugForm } from './components/BugForm'
import { BugCard } from './components/BugCard'
import './App.css'

function App() {
  const {
    bugs,
    search,
    setSearch,
    selectedTag,
    setSelectedTag,
    availableTags,
    addBug,
    deleteBug,
  } = useBugJournal()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Bug Journal</h1>
        <p className="subtitle">Save bugs. Find fixes fast.</p>
      </header>

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search title, error, or fix..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {availableTags.length > 0 && (
          <div className="tag-filter">
            <button
              type="button"
              className={`tag-pill ${selectedTag === null ? 'active' : ''}`}
              onClick={() => setSelectedTag(null)}
            >
              All
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`tag-pill ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <BugForm onSubmit={addBug} />

      <section className="bug-list">
        {bugs.length === 0 ? (
          <div className="empty-state">
            <p>No bugs found.</p>
          </div>
        ) : (
          bugs.map((bug) => (
            <BugCard key={bug.id} bug={bug} onDelete={deleteBug} />
          ))
        )}
      </section>
    </div>
  )
}

export default App
