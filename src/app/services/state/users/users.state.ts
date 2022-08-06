import { GenericResponse } from '../../../models/AppState';
import { IUser, UserResponse } from '../../../models/user.model';

export interface UserState {
  user: IUser;
  userResponse: UserResponse | null;
  genericResponse: GenericResponse | null;
  error: string;
  loggedIn: boolean;
  isLoading: boolean;
}
