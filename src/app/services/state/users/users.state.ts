import { IUser, UserResponse } from '../../../models/user.model';

export interface UserState {
  user: IUser;
  userResponse: UserResponse | null;
  error: string;
  loggedIn: boolean;
  isLoading: boolean;
  deleteUserResponse: deleteUserResponse | null;
}
export interface deleteUserResponse {
  message: string;
  success: boolean;
}
