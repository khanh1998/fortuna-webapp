<template>
  <v-list v-if="User != null">
    <v-list-item v-for="asset in User.assets" :key="asset.code">
      <v-list-item-title>{{ asset.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script>
import { gql } from 'graphql-tag';

const GET_USER = gql`
  query {
    User(id: "khanh") {
      name
      email
      assets {
        name
        code
      }
    }
  }
`;
export default {
  name: 'LeftBar',
  data: () => ({
    User: null,
  }),
  apollo: {
    User() {
      return {
        query: GET_USER,
      };
    },
  },
};
</script>
