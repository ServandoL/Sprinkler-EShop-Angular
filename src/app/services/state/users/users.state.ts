import { IUser } from "../../../models/user.model";

export interface UserState {
  user: IUser;
  userResponse: userResponse | null;
  error: string;
  loggedIn: boolean;
  isLoading: boolean;
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
  }
}
