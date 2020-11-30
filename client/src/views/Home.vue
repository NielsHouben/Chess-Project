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
      const req = await axios.get("/api/session/create", {});
      const sessionId = req.data._id;

      router.push({ path: "/game/", query: { sessionId: sessionId } });
    }

    return {
      // state,
      requestSession,
    };
  },
};
</script>
