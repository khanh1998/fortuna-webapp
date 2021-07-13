<template>
  <v-card>
    <v-card-text>
      <p>ID: {{ selectedTransaction.id }}</p>
      <p>
        Description:
        <v-text-field
          dense
          hide-details
          type="text"
          clearable
          v-model="description"
        />
      </p>
      <p>
        Amount:
        <v-text-field
          dense
          hide-details
          type="number"
          clearable
          v-model="amount"
          :min="0"
        />
      </p>
      <p>Created at: {{ selectedTransaction.createdAt }}</p>
      <p>Updated at: {{ selectedTransaction.updatedAt }}</p>
      <v-card-actions>
        <v-btn :disabled="!updatable" @click="updateTransaction">Update</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>
<script>
import UPDATE_TRANSACTION from './gql/UpdateTransaction.gql';
import GET_TRANSACTIONS from './gql/GetTransactions.gql';

export default {
  name: 'RightBar',
  props: {
    selectedTransaction: Object,
  },
  data: () => ({
    description: '',
    amount: '',
    updatable: -1,
  }),
  computed: {
    updatableItems() {
      return this.description + this.amount;
    },
    transactionId() {
      return this.selectedTransaction.id;
    },
    assetId() {
      return this.selectedTransaction.asset;
    },
  },
  apollo: {},
  methods: {
    updateTransaction() {
      this.$apollo.mutate({
        mutation: UPDATE_TRANSACTION,
        variables: {
          id: this.transactionId,
          input: {
            description: this.description,
            amount: Number(this.amount),
          },
        },
        update: (store, { data: { updateTransaction } }) => {
          console.log(updateTransaction);
          const data = store.readQuery({
            query: GET_TRANSACTIONS,
            variables: {
              asset: this.assetId,
            },
          });
          console.log(data);
          const old = data.transactions.find((item) => item.id === this.transactionId);
          old.description = this.description;
          old.amount = this.amount;
          store.writeQuery({
            query: GET_TRANSACTIONS,
            variables: {
              asset: this.assetId,
            },
            data,
          });
          this.updatable = -1;
        },
      });
    },
  },
  watch: {
    selectedTransaction: {
      handler() {
        const { description, amount } = this.selectedTransaction;
        this.description = description;
        this.amount = amount;
        this.updatable = -1;
      },
      immediate: true,
    },
    updatableItems: {
      handler() {
        this.updatable += 1;
      },
    },
  },
};
</script>
