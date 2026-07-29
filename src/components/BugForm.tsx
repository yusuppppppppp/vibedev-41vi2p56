import { useState } from 'react'
import type { Bug } from '../types/bug'

interface BugFormProps {
  onSubmit: (data: Omit<Bug, 'id' | 'dateLogged'>) => void
}

export function BugForm({ onSubmit }: BugFormProps) {
  const [title, setTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [rootCause, setRootCause] = useState('')
  const [fix, setFix] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [errors, setErrors] = useState<{ title?: string; errorMessage?: string }>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: typeof errors = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!errorMessage.trim()) newErrors.errorMessage = 'Error message is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      title: title.trim(),
      errorMessage: errorMessage.trim(),
      rootCause: rootCause.trim(),
      fix: fix.trim(),
      tags: tagsInput
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
    })

    setTitle('')
    setErrorMessage('')
    setRootCause('')
    setFix('')
    setTagsInput('')
    setErrors({})
  }

  return (
    <form className="bug-form" onSubmit={handleSubmit}>
      <h2>Log a Bug</h2>
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short description of the bug"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="errorMessage">Error Message *</label>
        <textarea
          id="errorMessage"
          className="mono"
          value={errorMessage}
          onChange={(e) => setErrorMessage(e.target.value)}
          placeholder="Paste the error message here"
          rows={2}
        />
        {errors.errorMessage && (
          <span className="form-error">{errors.errorMessage}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="rootCause">Root Cause</label>
        <textarea
          id="rootCause"
          className="mono"
          value={rootCause}
          onChange={(e) => setRootCause(e.target.value)}
          placeholder="What caused this bug?"
          rows={2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fix">Fix</label>
        <textarea
          id="fix"
          className="mono"
          value={fix}
          onChange={(e) => setFix(e.target.value)}
          placeholder="How did you fix it?"
          rows={2}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          id="tags"
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="react, typescript, hooks"
        />
      </div>
      <button type="submit" className="submit-btn">
        Save Bug
      </button>
    </form>
  )
}
