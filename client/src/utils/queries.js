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
  }
}

`;

export const GET_GAME_LOBBIES = gql`

query Query($gameName: String) {
  getGameLobbies(gameName: $gameName) {
    _id
    owner {
      username
    }
    players {
      username
    }
  }
}
`;
