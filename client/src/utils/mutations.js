import { gql } from '@apollo/client';

export const LOGIN_USER = gql`

    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`

    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const CREATE_LOBBY = gql`

mutation CreateLobby($lobbyId: ID!, $userId: ID!) {
  join(lobbyId: $lobbyId, userId: $userId) {
    _id
    game {
      cover
      name
    }
    owner {
      username
    }
    players {
      username
    }
  }
}

`;
