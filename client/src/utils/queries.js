import { gql } from '@apollo/client';

export const GET_ME = gql`

query Me {
    me {
      _id
      username
      email
    }
  }

  `;

//TODO: Cam can add profile picture functionality
export const GET_USER = gql`

query GetUser($username: String) {
  getUser(username: $username) {
    _id
    username
    firstName
    lastName
    avatarURL
    email
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

