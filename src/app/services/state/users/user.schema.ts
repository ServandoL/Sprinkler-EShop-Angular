import { gql } from 'apollo-angular';

export const GetUserQuery = gql`
  query getUser($email: String, $password: String) {
    getUser(email: $email, password: $password) {
      message
      success
      user {
        _id
        fname
        lname
        email
        isAdmin
      }
    }
  }
`;

export const CreateUserMutation = gql`
  mutation createUser($request: AddUserInput) {
    addUser(request: $request) {
      message
      success
    }
  }
`;

export const UpdateUserMutation = gql`
  mutation updateUser($request: UpdateUserInput) {
    updateUserInformation(request: $request) {
      message
      success
    }
  }
`;

export const DeleteUserMutation = gql`
  mutation deleteUser($id: String) {
    deleteUser(_id: $id) {
      message
      success
    }
  }
`;
