<template>
  <header class="header">
    <div class="header_content" v-if="selectUser">
      <v-row align="center" class="spacer" no-gutters>
        <v-col cols="4" md="1" sm="2">
          <v-avatar size="36px">
            <v-img alt="Avatar" :src="selectUser.avatarPath"></v-img>
          </v-avatar>
        </v-col>

        <v-col class="hidden-xs-only text-left ms-2" md="3" sm="5">
          <strong></strong>
          <span class="text-grey">
            {{ selectUser.name }}
          </span>
        </v-col>
      </v-row>
    </div>
  </header>
</template>

<script>
export default {
  props: ["selectUser"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  padding: 0 50px;
  display: flex;
  align-items: center;
  background-color: #212121;
}

.header_content {
  width: 100%;
}
</style>
