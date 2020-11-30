<template>
  <div>
    <gameBoardComponent :board="state.board"></gameBoardComponent>
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
      console.log("component is mounted!");
      // const route = useRoute();
      // state.sessionId = route.query.sessionId;
      const route = useRoute();
      sessionId = route.query.sessionId;
      getBoard();
    });

    // async function getBoard() {
    //   const req = await axios.get(`/api/session/${sessionId}`, {});

    //   state.board = req.data.board;
    //   setTimeout(() => {
    //     getBoard();
    //   }, 0);
    //   //getBoard();
    // }

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
