export interface SignupResponse {
  message?: string;
  user?: {
    id: string;
    email: string;
    username: string;
    fullName: string;
  };
  error?: string;
}
export interface LoginResponse {
  message?: string;
  user?: {
    id: string;
    username: string;
  };
  error?: string;
}
export interface EmailResponse {
  message?: string;
  user?: {
    id: string;
    email: string;
  };
  error?: string;
}
export interface OTPResponse {
  message?: string;
  user?: {
    id: string;
    otp: string;
  };
  error?: string;
}
export interface ResetResponse {
  message?: string;
  user?: {
    id: string;
    password: string;
    confirmPassword: string;
  };
  error?: string;
}