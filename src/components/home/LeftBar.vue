<template>
  <v-list v-if="User != null">
    <v-list-item v-for="asset in User.assets" :key="asset.code">
      <v-list-item-title>{{ asset.name }}</v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-action>
        <v-combobox
          v-model="newAsset.select"
          :items="addableAssets"
          item-text="name"
          item-value="id"
          label="add new asset"
          dense
        ></v-combobox>
        <v-btn v-if="newAsset.select" @click="addNewAsset">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>
<script>
import { gql } from 'graphql-tag';
import GET_ASSETS from './gql/GetAsset.gql';

const GET_USER = gql`
  query {
    User(id: "khanh") {
      username
      name
      email
      assets {
        name
        code
        id
        description
      }
    }
  }
`;
export default {
  name: 'LeftBar',
  data: () => ({
    User: null,
    Assets: null,
    newAsset: {
      select: '',
    },
  }),
  apollo: {
    User() {
      return {
        query: GET_USER,
      };
    },
    Assets: GET_ASSETS,
  },
  methods: {
    addNewAsset() {
      const assetId = this.newAsset.select.id;
      const currentAssetIds = this.User.assets.map((item) => item.id);
      const { username } = this.User;
      console.log({ username, currentAssetIds });
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($assets: [ID], $username: String) {
              updateUser(user: { assets: $assets, username: $username }) {
                assets {
                  name
                  code
                  id
                  description
                }
              }
            }
          `,
          variables: {
            assets: [...currentAssetIds, assetId],
            username,
          },
          update: (store, { data: { updateUser } }) => {
            const local = store.readQuery({ query: GET_USER });
            console.log({ updateUser, local });
            local.User.assets = updateUser.assets;
            store.writeQuery({ query: GET_USER, local });
          },
        })
        .then(() => {
          this.newAsset.select = '';
        });
    },
  },
  computed: {
    addableAssets() {
      if (!this.$apollo.loading) {
        const allAssetIds = this.User.assets.map((item) => item.id);
        return this.Assets.filter((item) => !allAssetIds.includes(item.id));
      }
      return [];
    },
  },
};
</script>
