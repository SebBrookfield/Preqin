export type ApiResponse<T> =
  | {
      meta: {
        total: number
        returned: number
        page: number
      }
      data: T
    }
  | undefined
