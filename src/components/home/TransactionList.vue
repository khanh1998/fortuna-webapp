<template>
  <v-list>
    <v-list-item v-for="item in getTransactionsByUser" :key="item.id">
      {{ item.description }}
    </v-list-item>
  </v-list>
</template>
<script>
// import { gql } from 'graphql-tag';
import GET_TRANSACTIONS from './gql/GetTransactions.gql';
// import GET_INGREDIENTS from './gql/getIngredients.gql';

export default {
  name: 'TransactionList',
  data: () => ({
    getTransactionsByUser: [],
  }),
  apollo: {
    getTransactionsByUser: GET_TRANSACTIONS,
  },
  created() {},
};
</script>
