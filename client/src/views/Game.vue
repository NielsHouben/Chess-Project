<template>
  <div>
    <gameBoardComponent :board="state.board" id="game-board"></gameBoardComponent>
  </div>
</template>

<script>
import { reactive } from "vue";
import { onMounted } from "vue";
import gameBoardComponent from "../components/game-board.vue";
import { useRoute } from "vue-router";
import axios from "axios";

// async function getBoard() {
//   const req = await axios.get(`/api/session/:${route.query.sessionId}`, {});
//   return req;
// }

let sessionId;

export default {
  name: "Home",
  setup() {
    const state = reactive({
      board: [],
      fetchGameBoard: true,
    });

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
        state.board = req.data.board;

        await timer(100); // then the created Promise can be awaited
      }
    }

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
