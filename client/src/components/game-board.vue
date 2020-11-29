<template>
  <div id="board">
    <div class="gameBoard">
      <div v-for="(piece, index) in board" :key="piece.id">
        <div class="square" v-bind:class="ColorDecider(index) ? 'whiteish' : 'green'">
          <div>
            <img v-if="piece" :src="require(`../assets/Pieces/${piece}.webp`)" />
          </div>
        </div>
      </div>
    </div>
    <h1>{{ state.board }}</h1>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "board",
  props: {
    board: Array,
  },
  setup(props) {
    const state = reactive({ board: props.board });

    //to generate checkered pattern,  problem was that every 8 it needed to be +1, basically, it chacks if its on an
    //odd or even row, if even: return true for all even squares
    //if odd: return true for all unneven squares
    function ColorDecider(index) {
      return Math.floor(index / 8) % 2 == 0 ? index % 2 == 0 : index % 2 != 0;
    }

    return {
      state,
      ColorDecider,
    };
  },
};
</script>

<style lang="scss" scoped>
.gameBoard {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 700px;
  height: 700px;
  .square {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.green {
  background-color: #769656;
}
.whiteish {
  background-color: #eeeed2;
}
h1 {
  font-size: 20px;
}
</style>
