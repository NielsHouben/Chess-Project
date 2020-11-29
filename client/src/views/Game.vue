<template>
  <div>
    <gameBoard :board="state.board"></gameBoard>
  </div>
</template>

<script>
import { reactive } from "vue";
import gameBoard from "../components/game-board.vue";

export default {
  name: "Home",
  setup() {
    const state = reactive({
      board: [
        "BR",
        "BN",
        "BB",
        "BQ",
        "BK",
        "BB",
        "BN",
        "BR",
        "BP",
        "BP",
        "BP",
        "BP",
        "BP",
        "BP",
        "BP",
        "BP",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "WP",
        "WP",
        "WP",
        "WP",
        "WP",
        "WP",
        "WP",
        "WP",
        "WR",
        "WN",
        "WB",
        "WK",
        "WQ",
        "WB",
        "WN",
        "WR",
      ],
    });

    return {
      state,
    };
  },
  components: {
    gameBoard,
  },
};
</script>
