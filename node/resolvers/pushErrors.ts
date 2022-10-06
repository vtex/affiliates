export type Error = {
  code: string
  message: string
}

export const pushErrors = (error: Error, errors: Error[]) => {
  errors.push(error)
}
