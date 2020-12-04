<template>
  <div>
    <gameBoardComponent id="game-board"></gameBoardComponent>
  </div>
</template>

<script>
import { reactive } from "vue";
import gameBoardComponent from "../components/game-board.vue";

export default {
  name: "Home",
  setup() {
    const state = reactive({});

    return {
      state,
    };
  },
  components: {
    gameBoardComponent,
  },
};
</script>

<style lang="sass" scoped>
#game-board
  position: absolute
  left: 50%
  top: 50%
  height: 90vmin
  width: 90vmin
  transform: translate(-50%, -50%)
</style>
