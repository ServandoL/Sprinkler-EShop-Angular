import { ICartItem } from '../../../models/cart.model';
import { IUser } from '../../../models/user.model';

export interface UserState {
  user: IUser;
  userResponse: userResponse | null;
  error: string;
  loggedIn: boolean;
  isLoading: boolean;
  deleteUserResponse: deleteUserResponse | null;
}

export interface userResponse {
  message: string;
  details: string | null;
  success: boolean;
  user: {
    fname: string;
    lname: string;
    email: string;
    isAdmin: boolean;
  };
}

export interface deleteUserResponse {
  message: string;
  success: boolean;
}
