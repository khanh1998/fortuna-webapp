import GET_USER from './userQuery.gql';

export const UserResolvers = {
  Mutation: {
    SetUser: (root, { user }, { cache }) => {
      cache.writeQuery({ query: GET_USER, user });
    },
  },
};
