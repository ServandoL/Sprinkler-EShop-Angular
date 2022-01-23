import { ObjectId } from "mongodb";
import { IUser } from "../../../models/user.model";

export interface UserState {
  user: IUser[];
  currentUserId: string | ObjectId | null;
  error: string;
  isLoading: boolean;
}
