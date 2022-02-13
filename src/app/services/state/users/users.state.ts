import { ObjectId } from "mongodb";
import { IUser } from "../../../models/user.model";

export interface UserState {
  user: IUser;
  error: string;
  loggedIn: boolean;
  isLoading: boolean;
}
