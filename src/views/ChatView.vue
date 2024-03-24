<template>
  <div class="content" ref="chatContent">
    <div class="massage_items">
      <template v-for="message in messages" :key="message.id">
        <div
          class="message_card"
          :class="[
            message.fromUserId == userId ? 'message_start' : 'message_end',
          ]"
          v-if="
            (message.fromUserId == routeId && message.sendUserId == userId) ||
            (message.fromUserId == userId && message.sendUserId == routeId)
          "
        >
          <h3>{{ message.message }}</h3>

          <span class="time">{{ message.time }}</span>
        </div>
      </template>
    </div>
  </div>
  <div class="send_message">
    <v-form @submit.prevent="submitMessage">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="message"
              :append-icon="message ? 'mdi-send' : 'mdi-microphone'"
              :append-inner-icon="
                marker ? 'mdi-map-marker' : 'mdi-map-marker-off'
              "
              style="color: #fff"
              :prepend-icon="icon"
              clear-icon="mdi-close-circle"
              label="Message"
              type="text"
              variant="filled"
              clearable
              color="#8774e1"
              bg-color="#212121"
              @click:append="sendMessage"
              @click:append-inner="toggleMarker"
              @click:clear="clearMessage"
              @click:prepend="changeIcon"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { useChatStore } from "@/store/chat";

export default {
  data() {
    return {
      store: useChatStore(),
      routeId: this.$route.params.id,
      userId: this.$route.params.userId,
      messages: [],
      message: "",
      marker: true,
      iconIndex: 0,
      icons: [
        "mdi-emoticon",
        "mdi-emoticon-cool",
        "mdi-emoticon-dead",
        "mdi-emoticon-excited",
        "mdi-emoticon-happy",
        "mdi-emoticon-neutral",
        "mdi-emoticon-sad",
        "mdi-emoticon-tongue",
      ],
    };
  },

  mounted() {
    this.scrollToBottom();
    this.getMessages();
  },

  methods: {
    getMessages() {
      this.messages = this.store.messages;
    },
    submitMessage() {
      if (!this.message || !this.routeId || !this.userId) return;

      const data = {
        id: Date.now(),
        fromUserId: this.userId,
        sendUserId: this.routeId,
        message: this.message,
        time: this.getTime(),
      };

      this.store.setMessage(data);
      this.message = "";
    },
    getTime() {
      const now = new Date();
      const hours = now.getHours();
      let minutes = now.getMinutes();

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      const currentTime = `${hours}:${minutes}`;
      return currentTime;
    },

    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.submitMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
    scrollToBottom() {
      const container = this.$refs.chatContent;
      container.scrollTop = container.scrollHeight;
    },
  },

  watch: {
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true,
    },
    "$route.params": {
      handler(value) {
        this.messages = [];
        this.routeId = value.id;
        this.message = "";
        this.getMessages();
      },
      deep: true,
    },
  },

  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },

  components: {},
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
  padding: 5px 10px;
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

.time {
  color: #fff;
  font-size: 12px;
}
</style>
