<template>
  <div class="chat_wrapper">
    <div class="side_bar_wrapper">
      <side-bar @onClick="setSelectUser" @onLogout="logout" :users="users" />
    </div>
    <main class="main">
      <template v-if="routeId">
        <Header :selectUser="store.selectUser" />
      </template>
      <router-view />
    </main>
  </div>
</template>

<script>
import SideBar from "@/common/components/chat/SideBar.vue";
import Header from "@/common/components/chat/Header.vue";
import { useChatStore } from "@/store/chat";

export default {
  data() {
    return {
      store: useChatStore(),
    };
  },

  mounted() {
    if (this.routeId) {
      this.getUserById(this.routeId);
    }

    window.addEventListener("storage", this.handleStorageChange);
  },

  beforeUnmount() {
    window.removeEventListener("storage", this.handleStorageChange);
  },

  methods: {
    handleStorageChange(event) {
      if (event.key === "messages") {
        const newMessages = JSON.parse(event.newValue || "[]");
        const lastMessage = newMessages[newMessages.length - 1];

        if (lastMessage) {
          this.store.setRealtimeMessage(lastMessage);
        }
      }
    },
    setSelectUser(payload) {
      this.store.setSelectUser(payload);
    },

    getUserById(id) {
      if (!id) return;

      const user = this.users.find((el) => el.id == id);

      if (user) {
        this.setSelectUser(user);
      }
    },

    logout() {
      this.$router.push("/");
    },
  },

  computed: {
    routeId() {
      return this.$route.params.id;
    },
    users() {
      return this.store.users;
    },
  },

  components: {
    SideBar,
    Header,
  },
};
</script>

<style scoped>
.chat_wrapper {
  display: grid;
  grid-template-columns: 400px 1fr;
  background-color: #181818;
}

.main {
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr;
}

.content {
  padding: 30px 20px 40px;
  overflow-y: auto;
}

.content::-webkit-scrollbar {
  display: none;
}

.content {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.massage_items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
}

.message_start {
  align-self: flex-end;
  background-color: #e2f7cb;
}

.message_end {
  align-self: flex-start;
  background-color: #d2d2d2;
}

.message_card {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: #8774e1;
  word-break: break-all;
}

.message_card h3 {
  color: #fff;
}

.send_message {
  position: sticky;
}
</style>
