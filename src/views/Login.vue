<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-person"
                    name="login"
                    label="Username"
                    type="text"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/" @click="doLogin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { gql } from 'graphql-tag';
import { firebase, provider } from '../plugins/firebase';

const GET_USER = gql`
  query {
    User(id: "khanh") {
      name
      email
    }
  }
`;

export default {
  name: 'Login',
  props: {
    source: String,
  },
  data: () => ({
    username: '',
    password: '',
    User: null,
  }),
  apollo: {
    User() {
      return {
        query: GET_USER,
      };
    },
  },
  methods: {
    async doLogin() {
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        console.log(result);
        const idToken = await firebase.auth().currentUser.getIdToken(true);
        console.log(idToken);
        const res = await window.axios.post('/auth/firebase/facebook', {}, {
          headers: {
            Authorization: `Bearer ${idToken.toString()}`,
          },
        });
        console.log(res);
        localStorage.setItem('JWT', res.data.message);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
