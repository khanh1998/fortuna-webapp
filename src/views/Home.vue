<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268">
            <left-bar @select-asset="selectAsset" />
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet min-height="70vh" rounded="lg">
            <transaction-list
              :selectedAsset="selectedAsset"
              @select-transaction="selectTransaction"
            />
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268">
            <right-bar :selectedTransaction="selectedTransaction"/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import TransactionList from '../components/home/TransactionList.vue';
import LeftBar from '../components/home/LeftBar.vue';
import RightBar from '../components/home/RightBar.vue';

export default {
  name: 'Home',
  data: () => ({
    selectedAsset: null,
    selectedTransaction: null,
  }),
  components: { TransactionList, LeftBar, RightBar },
  methods: {
    selectAsset(asset) {
      this.selectedAsset = asset;
    },
    selectTransaction(transaction) {
      this.selectedTransaction = transaction;
    },
  },
};
</script>
