import type { Bug } from '../types/bug'

export const sampleBugs: Bug[] = [
  {
    id: '1',
    title: 'Cannot read properties of undefined',
    errorMessage: "TypeError: Cannot read properties of undefined (reading 'map')",
    rootCause: 'API returned null instead of empty array when no results found',
    fix: 'Add optional chaining: data?.map() or default to empty array with data ?? []',
    tags: ['typescript', 'api', 'null-safety'],
    dateLogged: '2026-07-29',
  },
  {
    id: '2',
    title: 'useEffect runs twice in dev',
    errorMessage: 'Component renders twice on mount in development mode',
    rootCause: 'React 19 strict mode double-invokes effects for debugging purposes',
    fix: 'This is expected behavior in dev. Use cleanup function or ref guard if side effects need to run once.',
    tags: ['react', 'hooks', 'strict-mode'],
    dateLogged: '2026-07-29',
  },
]
