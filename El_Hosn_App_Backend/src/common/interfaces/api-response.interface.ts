export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  error: {
    code: string;
    details?: any;
  } | null;
  timestamp: string;
}
