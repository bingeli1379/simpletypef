<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  computed: {
    messages() {
      return this.$store.state.messages;
    }
  },
  methods: {
    removeMessage(num) {
      this.$store.commit("REMOVEMESSAGE", num);
    }
  }
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 65px;
  right: 20px;
  z-index: 1100;
}
</style>
