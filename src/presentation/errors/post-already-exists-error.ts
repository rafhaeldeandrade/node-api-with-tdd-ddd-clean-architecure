export class PostAlreadyExistsError extends Error {
  constructor(postTitle: string) {
    super(`Post with title '${postTitle}' already exists`)
    this.name = 'PostAlreadyExistsError'
  }
}
