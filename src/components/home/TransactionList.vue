<template>
  <v-list>
    <v-subheader>Asset</v-subheader>
    <v-list-item-group v-model="selectedItem" color="primary" @change="selectTransaction">
      <v-list-item v-for="item in Transactions" :key="item.id" >
        {{ item.description }}
      </v-list-item>
    </v-list-item-group>
    <v-list-item>
      <v-text-field
        v-model="newTransaction.description"
        placeholder="description"
      ></v-text-field>
      <v-text-field
        type="number"
        v-model="newTransaction.amount"
        placeholder="amount"
      ></v-text-field>
      <v-list-item-action>
        <v-btn @click="createTransaction">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>
<script>
import GET_TRANSACTIONS from './gql/GetTransactions.gql';
import POST_TRANSACTION from './gql/PostTransaction.gql';

export default {
  name: 'TransactionList',
  props: {
    selectedAsset: Object,
  },
  data: () => ({
    Transactions: [],
    newTransaction: {
      description: '',
      amount: 0,
      asset: null,
    },
    selectedItem: 0,
  }),
  apollo: {
    Transactions: {
      query: GET_TRANSACTIONS,
      variables() {
        console.log('get transacion called', this.selectedAsset.id);
        return {
          asset: this.selectedAsset.id,
        };
      },
    },
  },
  methods: {
    createTransaction() {
      const { description, amount, total, user, prev } = this.newTransaction;

      this.$apollo
        .mutate({
          // query
          mutation: POST_TRANSACTION,
          variables: {
            description,
            // eslint-disable-next-line radix
            amount: parseInt(amount),
            total,
            user,
            asset: this.selectedAsset.id,
            prev,
          },
          update: (store, { data: { createTransaction } }) => {
            const data = store.readQuery({
              query: GET_TRANSACTIONS,
              variables: {
                asset: this.selectedAsset.id,
              },
            });
            data.Transactions.push(createTransaction);
            store.writeQuery({
              query: GET_TRANSACTIONS,
              variables: {
                asset: this.selectedAsset.id,
              },
              data,
            });
          },
        })
        .then(() => console.log('create transaction successs'))
        .catch((err) => console.log({ err }));
    },
    selectTransaction() {
      const transaction = this.Transactions[this.selectedItem];
      this.$emit('select-transaction', transaction);
    },
  },
  created() {},
};
</script>
