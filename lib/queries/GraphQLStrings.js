import pkg from "@apollo/client";
const { gql } = pkg;

export const fetchUsersQuery = gql`
  query ($api: String!) {
    fetchUsers(api: $api) {
      id
      username
      location {
        lon
        lat
      }
    }
  }
`;

export const findWinksSentQuery = gql`
  query ($api: String!, $user: UserInput!) {
    findWinksSent(api: $api, user: $user) {
      id
      name
      recipient {
        id
        username
      }
      attachment {
        filename
      }
      message
    }
  }
`;
