<template>
  <v-container>
    <h1 class="text-center mb-5">Войти как</h1>
    <v-row align="center" justify="center">
      <v-col v-for="user in users" :key="user.id" cols="auto">
        <v-card
          color="indigo"
          variant="elevated"
          class="mx-auto"
          width="500"
          max-width="500"
        >
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">{{ user.name }}</div>
              <div class="text-caption">{{ user.position }}</div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn @click="goToChat(user.id)"> Войти в чат </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useChatStore } from "@/store/chat";

export default {
  data() {
    return {
      store: useChatStore(),
    };
  },
  methods: {
    goToChat(id) {
      if (!id) return;

      this.$router.push({ name: "ChatLayout", params: { userId: id } });
    },
  },
  computed: {
    users() {
      return this.store.users;
    },
  },
};
</script>

<style scoped></style>
