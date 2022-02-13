import { ObjectId } from "mongodb";

export interface IUser {
  fname: string;
  lname: string;
  email: string;
  isAdmin: boolean;
}
