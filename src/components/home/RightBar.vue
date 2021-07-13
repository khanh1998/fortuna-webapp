<template>
  <v-card>
    <v-card-text>
      <p>ID: {{ selectedTransaction.id }}</p>
      <p>Description: {{ selectedTransaction.description }}</p>
      <p>Amount: {{ selectedTransaction.amount }}</p>
      <p>Created at: {{ selectedTransaction.createdAt }}</p>
      <p>Updated at: {{ selectedTransaction.updatedAt }}</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'RightBar',
  props: {
    selectedTransaction: Object,
  },
};
</script>
