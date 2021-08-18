<template>
<div>
  <v-row dense>
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="12"
    >
      <v-card
        :color="item.color"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="text-h5"
              v-text="item.title"
            ></v-card-title>

            <v-card-subtitle v-text="item.artist"></v-card-subtitle>

            <v-card-actions>
              <span>
                01/10/2021 12:23
              </span>
              
            </v-card-actions>
          </div>

          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
            <v-img :src="item.src"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Luciano',
          artist: `asdfasdfas asdfasdfa sdfasdfasd fasdf asdf asdfasdf
          asdfasdfasdf
          a asdfasdfasdfasdfa ad asdfasd fasdf
          asdfasdfasdfasdfasdfasdf`,
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Raul',
          artist: `asdfasdfas asdfasdfa sdfasdfasd fasdf asdf asdfasdf
          asdfasdfasdf
          a asdfasdfasdfasdfa ad asdfasd fasdf
          asdfasdfasdfasdfasdfasdf`,
        },
      ],
    }
  },
  computed: {
    
  },
  methods: {
    
  },
  components: {
    
  },
  mounted() {
    
  }
}
</script>

<style>

</style>
