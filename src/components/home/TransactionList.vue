<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon>
          mdi-gold
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content v-if="selectedAsset">
        <v-list-item-title
          >Transactions for
          <b>{{ ' ' + selectedAsset.name }}</b></v-list-item-title
        >
        <v-list-item-subtitle>
          Total: {{ newTotal }} {{ selectedAsset.unit }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-item-group
      v-model="selectedItem"
      color="primary"
      @change="selectTransaction"
    >
      <v-list-item
        v-for="item in transactions"
        :key="item.id"
        @click="selectTransaction"
      >
        {{ item.description }} | {{ item.amount }}
      </v-list-item>
    </v-list-item-group>
    <v-divider />
    <v-subheader>New transaction</v-subheader>
    <v-list-item>
      <v-row>
        <v-col cols="3" class="d-flex flex-column justify-center align-center">
          <v-btn-toggle mandatory v-model="newTransaction.type" class="mr-2">
            <v-btn depressed icon>
              <v-icon color="green">mdi-plus</v-icon>
            </v-btn>
            <v-btn depressed icon>
              <v-icon color="red">mdi-minus</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="6" class="d-flex flex-column justify-start align-center">
          <div class="d-flex justify-start">
            <v-text-field
              v-model="newTransaction.description"
              placeholder="description"
              clearable
              hide-details="true"
              outlined
            ></v-text-field>
          </div>
          <div class="d-flex flex-row justify-center align-center">
            <v-text-field
              type="number"
              v-model="newTransaction.amount"
              placeholder="amount"
              hide-details="true"
              :min="0"
              outlined
            >
            </v-text-field>
          </div>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <v-btn @click="createTransaction">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>
<script>
import { gql } from 'graphql-tag';
import GET_TRANSACTIONS from './gql/GetTransactions.gql';
import POST_TRANSACTION from './gql/PostTransaction.gql';

const GET_USER = gql`
  query {
    user {
      name
    }
  }
`;

export default {
  name: 'TransactionList',
  props: {
    selectedAsset: Object,
  },
  data: () => ({
    transactions: [],
    newTransaction: {
      description: '',
      amount: 0,
      type: '',
    },
    selectedItem: 0,
  }),
  apollo: {
    transactions: {
      query: GET_TRANSACTIONS,
      variables() {
        console.log('get transacion called', this.selectedAsset.id);
        return {
          asset: this.selectedAsset.id,
        };
      },
    },
    user: GET_USER,
  },
  computed: {
    newTotal() {
      const oldValue = Number(this.selectedAsset.amount);
      return oldValue + this.absoluteValue;
    },
    absoluteValue() {
      return this.newTransaction.type === 0
        ? Number(this.newTransaction.amount)
        : -Number(this.newTransaction.amount);
    },
  },
  methods: {
    createTransaction() {
      const { description } = this.newTransaction;

      this.$apollo
        .mutate({
          // query
          mutation: POST_TRANSACTION,
          variables: {
            description,
            amount: this.absoluteValue,
            asset: this.selectedAsset.id,
            type: 'CREDIT',
          },
          update: (store, { data: { createTransaction } }) => {
            console.log(createTransaction);
            const data = store.readQuery({
              query: GET_TRANSACTIONS,
              variables: {
                asset: this.selectedAsset.id,
              },
            });
            const timeStr = new Date().toISOString();
            data.transactions.push({
              ...createTransaction,
              id: -1,
              createdAt: timeStr,
              updatedAt: timeStr,
            });
            store.writeQuery({
              query: GET_TRANSACTIONS,
              variables: {
                asset: this.selectedAsset.id,
              },
              data,
            });
          },
        })
        .then(() => {
          console.log('create transaction successs');
          this.newTransaction.description = '';
          this.newTransaction.amount = 0;
        })
        .catch((err) => console.log({ err }));
    },
    selectTransaction() {
      const transaction = this.transactions[this.selectedItem];
      this.$emit('select-transaction', transaction);
    },
    setCreditType() {
      this.newTransaction.type = 'CREDIT';
    },
    setDebitType() {
      this.newTransaction.type = 'DEBIT';
    },
  },
  created() {},
};
</script>
