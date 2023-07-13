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

  mutation AddUser($username: String!, $email: String!, $password: String!, $firstName: String, $lastName: String, $avatarURL: String) {
      addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName, avatarURL: $avatarURL) {
          token
          user {
              _id
              username
              email
            }
        }
    }
`;

export const ADD_GAME = gql`

  mutation AddGame($igdb: String!, $cover: String, $name: String!, $date: Int) {
    addGame(igdb: $igdb, cover: $cover, name: $name, date: $date) {
      igdb
      _id
  }
}

`;

export const CREATE_LOBBY = gql`

mutation CreateLobby($gameId: ID!, $userId: ID, $limit: Int!, $about: String) {
  createLobby(gameId: $gameId, userId: $userId, limit: $limit, about: $about) {
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
    limit
    about
  }
}
`;

export const JOIN = gql`
  mutation Join($lobbyId: ID!) {
    join(lobbyId: $lobbyId) {
      _id
    limit
    about
    owner {
      username
      _id
    }
    players {
      username
      _id
    }
  }
}
`;

export const LEAVE = gql`
mutation Leave($lobbyId: ID!, $username: String!) {
  leave(lobbyId: $lobbyId, username: $username) {
    _id
    limit
    about
    owner {
      username
      _id
    }
    players {
      username
      _id
    }
  }
}
`;

export const PROMOTE = gql`
mutation Promote($lobbyId: ID!, $userId: ID!) {
  promote(lobbyId: $lobbyId, userId: $userId) {
    _id
  }
}
`;