export interface IUser {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  isAdmin: boolean;
}

export interface UserResponse {
  message: string;
  success: boolean;
  user: IUser;
}
export interface UpdateUserRequest {
  _id: string;
  currentPassword: string;
  email?: string;
  newPassword?: string;
}
