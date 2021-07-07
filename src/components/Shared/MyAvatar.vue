<template>
  <v-img
    src= "grass.jpg"
    class="pa-4 pt-7"
    height= 170
    gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
  >
    <v-avatar size="70" class="mb-2">
      <img v-if="$store.state.userStore.loggedUser.photo" :src="$store.state.userStore.loggedUser.photo" :alt="$store.state.userStore.loggedUser.name">
    </v-avatar>
    <div class="white--text text-subtitle-1 font-weight-bold">{{$store.state.userStore.loggedUser.name}}</div>
    <div class="white--text text-subtitle-2">{{$store.state.userStore.loggedUser.email}}</div>
  </v-img>
</template>

<script>
export default {

}
</script>

<style>

</style>