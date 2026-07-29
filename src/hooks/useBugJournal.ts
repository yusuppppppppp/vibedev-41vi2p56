import { useState, useMemo } from 'react'
import type { Bug } from '../types/bug'
import { loadBugs, saveBugs } from '../lib/storage'

export function useBugJournal() {
  const [bugs, setBugs] = useState<Bug[]>(loadBugs)
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    for (const bug of bugs) {
      for (const tag of bug.tags) {
        tagSet.add(tag)
      }
    }
    return Array.from(tagSet).sort()
  }, [bugs])

  const filteredBugs = useMemo(() => {
    const q = search.toLowerCase()
    return bugs
      .filter((bug) => {
        const matchesSearch =
          !q ||
          bug.title.toLowerCase().includes(q) ||
          bug.errorMessage.toLowerCase().includes(q) ||
          bug.fix.toLowerCase().includes(q)
        const matchesTag = !selectedTag || bug.tags.includes(selectedTag)
        return matchesSearch && matchesTag
      })
      .sort((a, b) => b.dateLogged.localeCompare(a.dateLogged))
  }, [bugs, search, selectedTag])

  function addBug(data: Omit<Bug, 'id' | 'dateLogged'>) {
    const newBug: Bug = {
      ...data,
      id: crypto.randomUUID(),
      dateLogged: new Date().toISOString().slice(0, 10),
    }
    const updated = [newBug, ...bugs]
    setBugs(updated)
    saveBugs(updated)
  }

  function deleteBug(id: string) {
    const updated = bugs.filter((b) => b.id !== id)
    setBugs(updated)
    saveBugs(updated)
  }

  return {
    bugs: filteredBugs,
    search,
    setSearch,
    selectedTag,
    setSelectedTag,
    availableTags,
    addBug,
    deleteBug,
  }
}
