<template>
<div>
  <v-row dense>
    <v-col
      v-for="chat in $store.state.chatStore.chats"
      :key="chat.id"
      cols="12"
    >
      <chatCard
        :chat="chat"
      />
    </v-col>

    
  </v-row>
</div>
</template>

<script>
export default {
  components: {
    chatCard: require('./ChatCard').default
  },
  computed: {
    
  },
  methods: {
  },
  props: ['idGame'],
  filters: {

  },
  mounted() {
    
  }
}
</script>

<style>

</style>
