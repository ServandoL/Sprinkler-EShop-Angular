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
