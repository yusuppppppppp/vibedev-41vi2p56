import type { Bug } from '../types/bug'

interface BugCardProps {
  bug: Bug
  onDelete: (id: string) => void
}

export function BugCard({ bug, onDelete }: BugCardProps) {
  return (
    <div className="bug-card">
      <div className="bug-card-header">
        <h3>{bug.title}</h3>
        <span className="bug-date">{bug.dateLogged}</span>
      </div>
      <div className="bug-field">
        <label>Error Message</label>
        <p className="mono">{bug.errorMessage}</p>
      </div>
      <div className="bug-field">
        <label>Root Cause</label>
        <p className="mono">{bug.rootCause}</p>
      </div>
      <div className="bug-field">
        <label>Fix</label>
        <p className="mono">{bug.fix}</p>
      </div>
      <div className="bug-card-footer">
        <div className="bug-tags">
          {bug.tags.map((tag) => (
            <span key={tag} className="bug-tag">
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(bug.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
