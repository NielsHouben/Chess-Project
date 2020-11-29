<template>
  <h1>Morsh</h1>
  <main>
    <div>
      <h2>Morse Code</h2>
      <textarea v-model="state.morseCode.value" v-on:input="morseCodeInput($event)" placeholder="Input morse code here..."></textarea>
    </div>
    <div>
      <h2>Hashed Code</h2>
      <textarea v-model="state.hashedCode.value" v-on:input="hashedCodeInput()" placeholder="Or your hashed code here..."></textarea>
    </div>
  </main>
  <footer>
    <div class="morseTableItem" v-for="(item, index) in state.morseTable" :key="index">
      <h5>{{ item[0] }}</h5>
      <p>{{ item[1] }}</p>
    </div>
  </footer>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      morseTable: [['A', '.-'], ['B', '-...'], ['C', '-.-.'], ['D', '-..'], ['E', '.'], 
      ['F', '..-.'], ['G', '--.'], ['H', '....'], ['I', '..'], ['J', '.---'], 
      ['K', '-.-'], ['L', '.-..'], ['M', '--'], ['N', '-.'], ['O', '---'], 
      ['P', '.--.'], ['Q', '--.-'], ['R', '.-.'], ['S', '...'], ['T', '-'], 
      ['U', '..-'], ['V', '...-'], ['W', '.--'], ['X', '-..-'], ['Y', '-.--'], 
      ['Z', '--..'], ['1', '.----'], ['2', '..---'], ['3', '...--'], ['4', '....-'], 
      ['5', '.....'], ['6', '-....'], ['7', '--...'], ['8', '---..'], ['9', '----.'], 
      ['0', '-----'], ['.', '.-.-.-'], [',', '--..--'], ['?', '..--..']],
      morseCode: { value: '' },
      hashedCode: { value: '' }
    });

    async function morseCodeInput(e) {
      const params = new URLSearchParams();
      let response;

      switch(e.target.value[e.target.value.length - 1]) {
        case '-':
        case '.':
        case ' ':
        case '/':
          params.append('morseCode', state.morseCode.value);

          response = await axios.post('/api/home', params);

          state.hashedCode.value = response.data;
          break;
        default:
          return state.morseCode.value = state.morseCode.value.slice(0, state.morseCode.value.length - 1);
      }
    }

    async function hashedCodeInput() {
      if (state.hashedCode.value != '') {
        const params = {'hashedCode': state.hashedCode.value};

        const response = await axios.get('/api/home', { params });

        state.morseCode.value = response.data;
      } else {
        state.morseCode.value = '';
      }
    }

    return {
      state,
      morseCodeInput,
      hashedCodeInput
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  position: absolute
  top: 7.5%
  left: 50%
  transform: translateX(-50%)
  font-size: 3em

main
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  display: grid
  grid-template-columns: 1fr 1fr
  width: 75vw

  div
    h2
      text-align: center
      font-size: 1.75em

    textarea
      position: relative
      margin-top: 25px
      width: 90%
      height: 400px
      left: 50%
      transform: translateX(-50%)
      background: rgba(0, 0, 0, 0)
      border-radius: 5px
      padding: 10px
      font-size: 1.25em
      resize: none

      &:focus
        outline: none

footer
  position: absolute
  bottom: 0px
  display: flex
  flex-direction: row
  width: 70vw
  left: 50%
  transform: translateX(-50%)
  text-align: center

  .morseTableItem
    margin: 0px auto

    h5
      font-size: 1

    p
      font-size: 3
      font-weight: bold
      letter-spacing: 2px

</style>
