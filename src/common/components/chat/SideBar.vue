<template>
  <div class="side_bar_wrapper">
    <ul class="side_bar_list" v-if="users.length">
      <li class="side_bar_item side_bar_avatar pb-5" v-if="currentUser">
        <v-list-item class="w-100 user_card" :title="currentUserName">
          <template v-slot:prepend>
            <v-avatar
              color="grey-darken-3"
              :image="currentUser.avatarPath"
            ></v-avatar>
          </template>

          <template v-slot:append>
            <v-btn icon="mdi-logout" variant="text" @click="logout"></v-btn>
          </template>
        </v-list-item>
      </li>

      <template v-for="user in users" :key="user.id">
        <li class="side_bar_item" v-if="user.id != userId">
          <v-list-item
            class="w-100 user_card"
            :class="{ active_user: routeId == user.id }"
            @click="handleClick(user)"
          >
            <template v-slot:prepend>
              <v-avatar
                color="grey-darken-3"
                :image="user.avatarPath"
              ></v-avatar>
            </template>

            <v-list-item-title>{{ user.name }}</v-list-item-title>

            <v-list-item-subtitle>{{ user.position }}</v-list-item-subtitle>
          </v-list-item>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { useChatStore } from "@/store/chat";

export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      store: useChatStore(),
    };
  },
  methods: {
    handleClick(payload) {
      if (!payload.id) return;

      this.$emit("onClick", payload);

      this.$router.push({ name: "ChatView", params: { id: payload.id } });
    },
    logout() {
      this.$emit("onLogout");
    },
  },
  computed: {
    routeId() {
      return this.$route.params?.id;
    },
    userId() {
      return this.$route.params?.userId;
    },
    currentUser() {
      return this.store.users.find((el) => el.id == this.userId);
    },
    currentUserName() {
      return this.currentUser.name + " " + "(Вы)";
    },
  },
};
</script>

<style scoped>
.side_bar_wrapper {
  width: 100%;
  height: 100vh;
  padding: 30px 12px;
  color: white;
  border-right: grey;
  background-color: #212121;
}

.side_bar_list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.user_card {
  cursor: pointer;
  transition: opacity 0.3s;
  border-radius: 10px;
}

.user_card:hover {
  opacity: 70%;
}

.active_user {
  background-color: #8774e1;
}

.side_bar_avatar {
  border-bottom: 1px solid #8774e1;
}

.logout {
  margin-top: auto;
}
</style>
