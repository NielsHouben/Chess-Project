<template>
  <div id="board">
    <div class="gameBoard" :style="{ cursor: state.selectedCursor }">
      <div
        v-for="(piece, index) in state.board"
        :key="piece.id"
        :id="index"
        @click="start(piece, index)"
      >
        <div class="square" :class="colorDecider(index) ? 'first-color' : 'second-color'">
          <img
            v-if="piece"
            :src="require(`../assets/Pieces/${piece}.webp`)"
            unselectable="on"
            ondragstart="return false;"
            draggable="false"
          />
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

  setup() {
    const state = reactive({
      board: [],
      costantlyTrue: true,
      fetchGameBoard: true,
      activePiece: {
        isActive: false,
        pos: Number,
        piece: String,
      },
      // selectedCursor: "../assets/Pieces/BK.webp",
      selectedCursor: "url(`../assets/Pieces/BK.webp`)",
    });

    function start(piece, index) {
      console.log(piece ? piece : "no piece", index);

      if (piece) {
        //make it active piece, and make function to hide active piece with a watcher, that way, it wil stay hidden untill move confirmed or denied
        state.activePiece.isActive = true;
        state.activePiece.pos = index;
        state.activePiece.piece = piece;
      } else {
        axios.put(`/api/session/${sessionId}/${state.activePiece.pos}/${index}`, {});
        state.activePiece.isActive = false;
        state.activePiece.pos = Number;
        state.activePiece.piece = String;
      }
    }

    //to generate checkered pattern,  problem was that every 8 it needed to be +1, basically, it chacks if its on an
    //odd or even row, if even: return true for all even squares
    //if odd: return true for all unneven squares
    function colorDecider(index) {
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

    async function getBoard() {
      // We need to wrap the loop into an async function for this to work
      while (state.costantlyTrue) {
        const req = await axios.get(`/api/session/${sessionId}`, {});
        state.board = req.data.board;

        // await timer(100); // then the created Promise can be awaited
        // await new Promise((r) => setTimeout(r, 100));
        await new Promise((r) => setTimeout(r, 10));
      }
    }
    //----------------------------------------------------------------

    return {
      state,
      colorDecider,
      start,
    };
  },
};

//   function start(piece = "none") {
//   //call api here to see if you're actually allowed to make a move (check if its your turn)

//   let hoveredThings = document.querySelectorAll(":hover");
//   let pos = hoveredThings[hoveredThings.length - 3].id;
//   // console.log(hoveredThings[hoveredThings.length - 1]);

//   console.log(`${piece}, moves from ${pos}`);

//   //make it active piece, and make function to hide active piece with a watcher, that way, it wil stay hidden untill move confirmed or denied
//   state.activePiece.isActive = true;
//   state.activePiece.pos = pos;
//   state.activePiece.piece = piece;

//   console.log(state.activePiece);
//   console.log(shouldBeInvis(55));
//   // elem.style.hidden = true;
//   // document.getElementById(pos).style.backgroundColor = "red";
//   // console.log(document.getElementById(pos));
//   // console.log(elem);
//   // let a = document.getElementById(pos);
//   // a.style.backgroundColor = "red";
//   //make image follow piece, also pause fetching server

//   // state.fetchGameBoard = false; //pause api
//   // state.board[pos] = ""; //clear spot
//   console.log(state.activePiece);
// }
// function end() {
//   let hoveredThings = document.querySelectorAll(":hover");
//   let pos = hoveredThings[hoveredThings.length - 2].id;

//   state.activePiece.isActive = false;

//   console.log(`to ${pos}`);
// }
// function shouldBeInvis(index) {
//   if (index == state.activePiece.pos && state.activePiece.isActive) return true;
//   return false;
//   // return state.activePiece.isActive && index === state.activePiece.pos;
// }
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
    user-drag: none
    user-select: none
    -moz-user-select: none
    -webkit-user-drag: none
    -webkit-user-select: none
    -ms-user-select: none
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

      user-drag: none
      user-select: none
      -moz-user-select: none
      -webkit-user-drag: none
      -webkit-user-select: none
      -ms-user-select: none
          /* For Opera and <= IE9, we need to add unselectable="on" attribute onto each element */
    /* Check this site for more details: http://help.dottoro.com/lhwdpnva.php */



.second-color
  background-color: #0042ac

.first-color
  background-color: #dcdcdc

h1
  font-size: 20px

.invis
  visibility: hidden
</style>
