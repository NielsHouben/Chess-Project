<template>
  <div id="board">
    <div class="gameBoard">
      <div v-for="(piece, index) in state.board" :key="piece.id">
        <div class="square" v-bind:class="ColorDecider(index) ? 'whiteish' : 'green'">
          <div>
            <img v-if="piece" :src="require(`../assets/Pieces/${piece}.webp`)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

let sessionId;

export default {
  name: "board",
  // props: {
  //   board: Array,
  // },
  setup() {
    //props
    const state = reactive({
      // board: props.board,
      board: [],
      fetchGameBoard: true,
    });

    //to generate checkered pattern,  problem was that every 8 it needed to be +1, basically, it chacks if its on an
    //odd or even row, if even: return true for all even squares
    //if odd: return true for all unneven squares
    function ColorDecider(index) {
      return Math.floor(index / 8) % 2 == 0 ? index % 2 == 0 : index % 2 != 0;
    }

    //for fetching api -----------------------------------------------
    onMounted(() => {
      const route = useRoute();
      sessionId = route.query.sessionId;
      getBoard();
    });

    //code below basically makes an infinit loop (stoppable by making fetchGa... false)
    //cant be a recursive function, would brake. has timer to stop the while loop for delay.
    //requests the session from server, gets the session and buts its board into board variable.
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    async function getBoard() {
      // We need to wrap the loop into an async function for this to work
      while (state.fetchGameBoard) {
        const req = await axios.get(`/api/session/${sessionId}`, {});

        // console.log(req.data.board);
        state.board = req.data.board;

        await timer(100); // then the created Promise can be awaited
      }
    }
    //----------------------------------------------------------------

    return {
      state,
      ColorDecider,
    };
  },
};
</script>

<style lang="sass" scoped>
.gameBoard
  position: relative
  display: grid
  grid-template-columns: repeat(8, 1fr)
  grid-template-rows: repeat(8, 1fr)

  width: 100%
  height: 100%

  .square
    // width: 100%
    // height: 100%
    position: relative
    width: 100%
    height: 100%
    padding: 0
    // filter: invert(100%)
    img
      // background-size: cover
      // width: 95%
      // height: 94%
      // background: no-repeat center<
      // filter: invert(100%)

      position: absolute
      width: 100%
      height: 100%
      left: 0
      top: 0


.green
  background-color: #0042ac

.whiteish
  background-color: #dcdcdc

h1
  font-size: 20px
</style>
