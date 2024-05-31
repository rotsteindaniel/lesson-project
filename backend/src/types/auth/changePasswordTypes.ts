export interface ChangePasswordRequest {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}
