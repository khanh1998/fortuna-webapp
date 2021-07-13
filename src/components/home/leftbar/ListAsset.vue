<template>
  <v-list-item-group
    v-model="selectedItem"
    color="primary"
    @change="selectAsset"
  >
    <v-list-item dense v-for="asset in assets" :key="asset.code" @click="selectAsset">
      <v-list-item-content>
        <v-list-item-title>{{ '__' + asset.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</template>
<script>
export default {
  name: 'ListAsset',
  props: {
    assets: Array,
  },
  data: () => ({
    selectedItem: 0,
  }),
  methods: {
    selectAsset() {
      this.$emit('select-asset', this.assets[this.selectedItem]);
    },
  },
};
</script>
