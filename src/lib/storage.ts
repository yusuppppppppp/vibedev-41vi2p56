import type { Bug } from '../types/bug'
import { sampleBugs } from '../data/sampleBugs'

const STORAGE_KEY = 'bug-journal'

export function loadBugs(): Bug[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    return JSON.parse(raw) as Bug[]
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBugs))
  return sampleBugs
}

export function saveBugs(bugs: Bug[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bugs))
}
