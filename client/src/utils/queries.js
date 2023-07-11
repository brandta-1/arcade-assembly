import { gql } from '@apollo/client';

export const GET_ME = gql`

query Me {
    me {
      _id
    username
    firstName
    lastName
    avatarURL
    email
    friends {
      _id
      username
    firstName
    lastName
    avatarURL
    }
    }
  }

  `;

//TODO: Cam can add profile picture functionality
export const GET_USER = gql`

query GetUser($userId: ID, $username: String) {
  getUser(userId: $userId, username: $username) {
    _id
    username
    firstName
    lastName
    avatarURL
    email
    friends {
      _id
      username
    firstName
    lastName
    avatarURL
    }
  }
}
`;

export const GET_GAME_LOBBIES = gql`

query Query($igdb: String) {
  getGameLobbies(igdb: $igdb) {
    _id
    owner {
      username
    }
    players {
      username
    }
    limit
  }
}
`;

export const GET_USER_LOBBIES = gql`
query Query($username: String) {
  getUserLobbies(username: $username) {
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
  }
}
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
    username
    firstName
    lastName
    avatarURL
    email
      friends {
        _id
        username
      firstName
      lastName
      avatarURL
      }
    }
  }
`;