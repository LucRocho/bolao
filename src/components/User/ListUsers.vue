<template>
  <v-list
    flat
    class="pt-0"
    three-line
  >
    <user
        v-for="user in $store.state.userStore.users"
        :key="user.id"
        :user="user"
    />
    
  </v-list>
</template>

<script>
export default {
  components: {
    user: require('./User').default
  }
}
</script>

<style>

</style>