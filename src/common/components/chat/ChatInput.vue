<template>
  <v-form @submit.prevent="handleMessageSubmit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            @keyup="onChanged"
            :value="modelValue"
            :append-icon="modelValue ? 'mdi-send' : 'mdi-microphone'"
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
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
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
  methods: {
    handleMessageSubmit() {
      this.$emit("onMessageSubmit");
    },
    handleClearMessage() {
      this.$emit("onClearMessage");
    },

    onChanged(e) {
      console.log(e.target.value);
      this.$emit("update:modelValue", e.target.value);
    },

    toggleMarker() {
      this.marker = !this.marker;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
    resetIcon() {
      this.iconIndex = 0;
    },
  },
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },
};
</script>

<!-- v-text-field не корректно работает с @input && @keyup -->
