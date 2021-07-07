<template>
<div>
  <v-list
    class="pt-0"
    three-line
    flat
  >
    <guess
        v-for="guess in $store.state.guessStore.guesses"
        :key="guess.idGuess"
        :guess="guess"
        
    />
    
  </v-list>
  
</div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  components: {
    guess: require('./Guess').default
  },
  methods:{
    
  }
}
</script>

<style>

</style>