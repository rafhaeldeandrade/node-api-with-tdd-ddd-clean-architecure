export interface Controller<T, U> {
  handle: (request: T) => Promise<U>
}
