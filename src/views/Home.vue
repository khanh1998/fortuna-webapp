<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268">
            <left-bar/>
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet min-height="70vh" rounded="lg">
            <transaction-list />
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet rounded="lg" min-height="268">
            <!--  -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import TransactionList from '../components/home/TransactionList.vue';
import LeftBar from '../components/home/LeftBar.vue';

export default {
  name: 'Home',

  components: { TransactionList, LeftBar },
};
</script>
