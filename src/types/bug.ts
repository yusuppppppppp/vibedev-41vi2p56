export interface Bug {
  id: string
  title: string
  errorMessage: string
  rootCause: string
  fix: string
  tags: string[]
  dateLogged: string
}
