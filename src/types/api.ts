export type ApiResponse<T> =
  | {
      success: true
      data: T
      message?: string
    }
  | {
      success: false
      error: string
      code?: string
      details?: unknown
    }

export interface RsvpSubmitResponse {
  id: string
}
