export interface SchemaValidation {
  validate: (input: any) => Promise<Error | null>
}
