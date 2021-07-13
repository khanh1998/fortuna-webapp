<template>
  <v-list v-if="user != null" rounded>
    <v-subheader>Asset</v-subheader>
    <v-list-group
      v-model="assetGroupsExpand[assetGroup.id]"
      v-for="assetGroup in assetGroups"
      :key="assetGroup.id"
      no-action
    >
      <template v-slot:activator>
        <v-list-item-title>{{ assetGroup.name }}</v-list-item-title>
      </template>
      <list-asset
        :assets="getAssetsOfGroup(assetGroup.id)"
        @select-asset="selectAsset"
      />
    </v-list-group>
    <v-list-group v-model="assetGroupsExpand['other']" no-action>
      <template v-slot:activator>
        <v-list-item-title>Other</v-list-item-title>
      </template>
      <list-asset :assets="getAssetsOfGroup()" @select-asset="selectAsset" />
    </v-list-group>
    <v-divider />
    <v-list-item>
      <v-list-item-action>
        <v-combobox
          v-model="newAsset.select"
          item-text="name"
          item-value="id"
          label="add new asset"
          dense
        ></v-combobox>
        <v-btn v-if="newAsset.select">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>
<script>
import { gql } from 'graphql-tag';
import GET_ASSETS from './gql/GetAsset.gql';
import GET_ASSET_GROUPS from './gql/GetAssetGroups.gql';
import ListAsset from './leftbar/ListAsset.vue';

const GET_USER = gql`
  query {
    user {
      username
      name
      email
    }
  }
`;
export default {
  name: 'LeftBar',
  components: { ListAsset },
  data: () => ({
    user: null,
    assets: null,
    assetGroups: null,
    assetGroupsExpand: {},
    newAsset: {
      select: '',
    },
    selectedItem: 0,
    selectedGroup: 0,
  }),
  apollo: {
    user() {
      return {
        query: GET_USER,
      };
    },
    assets: {
      query: GET_ASSETS,
    },
    assetGroups: {
      query: GET_ASSET_GROUPS,
    },
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
    selectAsset(asset) {
      this.$emit('select-asset', asset);
    },
    getAssetsOfGroup(groupId) {
      if (groupId) {
        return this.assets.filter((item) => item.group === groupId);
      }
      return this.assets.filter((item) => !item.group);
    },
  },
  computed: {},
  created() {},
  watch: {
    addableAssets(newVal) {
      if (newVal != null) {
        console.log('call it');
        this.selectAsset();
      }
    },
  },
};
</script>
