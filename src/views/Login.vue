<template>
  <v-container class="container align-center">
    <v-row class="mt-12">
      <v-col>
        <div class="text-h2 text-center">Welcome to The Seedy Melon!</div>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-10">
      <v-btn class="ma-4" to="/owner" color="secondary"> I'm the Owner </v-btn>
      <v-btn class="ma-4" to="/customer" color="secondary">
        I'm a Customer
      </v-btn>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
