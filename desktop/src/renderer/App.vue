<template>
<v-app id="app">
  <!-- <v-navigation-drawer app></v-navigation-drawer> -->
  <router-view app name="header"></router-view>
  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
</template>

<script>
  export default {
    name: 'scany'
  }
</script>

<style>
  /* CSS */
</style>
