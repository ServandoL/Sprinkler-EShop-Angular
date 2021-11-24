import { ObjectId } from "mongodb";

export interface IUser {
  _id: string | ObjectId;
  fname: string;
  lname: string;
  email: string;
  isAdmin: boolean
}
