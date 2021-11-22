<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link to="/" tag="div" class="cursor d-flex align-center text-h4">
        <v-icon class="mr-2" x-large> mdi-fruit-watermelon </v-icon>
        The Seedy Melon
      </router-link>
    </v-app-bar>
    <v-main class="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
  computed: {},
})
export default class App extends Vue {
  mounted(): void {
    this.$store.dispatch("initializeFoodItems");
  }
}
</script>
<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
.v-app-bar {
  background: linear-gradient(
    90deg,
    #ff1744 0%,
    rgba(226, 255, 20, 1) 82%,
    #00c853 100%
  );
}
.main {
  background-color: #f5f5f5;
}
</style>
