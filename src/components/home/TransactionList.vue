<template>
  <v-list>
    <v-list-item v-for="item in getTransactionsByUser" :key="item.id">
      {{ item.description }}
    </v-list-item>
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
  data: () => ({
    getTransactionsByUser: [],
    newTransaction: {
      description: '',
      amount: 0,
      total: 0,
      userId: '60c3263bc09fc11bd6b454bd',
      assetId: '60c5baaac6b5f0207eaba544',
      prevTransactionId: '60c5ca9930a5fe2b8d6ecfd0',
    },
  }),
  apollo: {
    getTransactionsByUser: GET_TRANSACTIONS,
  },
  methods: {
    createTransaction() {
      const {
        description,
        amount,
        total,
        userId,
        assetId,
        prevTransactionId,
      } = this.newTransaction;

      this.$apollo
        .mutate({
          // query
          mutation: POST_TRANSACTION,
          variables: {
            description,
            // eslint-disable-next-line radix
            amount: parseInt(amount),
            total,
            userId,
            assetId,
            prevTransactionId,
          },
          update: (store, { data: { createTransaction } }) => {
            const data = store.readQuery({ query: GET_TRANSACTIONS });
            data.getTransactionsByUser.push(createTransaction);
            store.writeQuery({ query: GET_TRANSACTIONS, data });
          },
        })
        .then(() => console.log('create transaction successs'))
        .catch((err) => console.log({ err }));
    },
  },
  created() {},
};
</script>
