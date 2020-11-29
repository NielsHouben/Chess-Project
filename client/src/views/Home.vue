<template>
  <div class="home">
    <h1>Chess</h1>
    <button @click="requestSession">Play</button>
  </div>
</template>

<script>
// import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Home",
  setup() {
    // const state = reactive({});

    const router = useRouter();
    async function requestSession() {
      const req = await axios.post("/api/session", {});
      const sessionId = req.data.id;
      router.push({ path: "/game/", query: { Id: sessionId } });
    }

    return {
      // state,
      requestSession,
    };
  },
};
</script>
