<template>
<div>
  <v-row dense>
    <v-col
      v-for="(chat, i) in $store.state.chatStore.chats"
      :key="i"
      cols="12"
    >
      <v-card
        color="#1F7087"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="text-h6"
              v-text="chat.name"
            ></v-card-title>
            <v-card-subtitle v-text="chat.message"></v-card-subtitle>
            <v-card-actions>
              <h6>
                <div class="font-weight-light pa-2">{{chat.creation_date | niceDate}}</div>
              </h6>
              
            </v-card-actions>
          </div>

          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
            <v-img :src="chat.photo"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default {
  data () {
    return {
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Breve em funcionamento',
          artist: `asdfasdfas asdfasdfa sdfasdfasd fasdf asdf asdfasdf
          asdfasdfasdf
          a asdfasdfasdfasdfa ad asdfasd fasdf
          asdfasdfasdfasdfasdfasdf`,
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Breve...',
          artist: `asdfasdfas asdfasdfa sdfasdfasd fasdf asdf asdfasdf
          asdfasdfasdf
          a asdfasdfasdfasdfa ad asdfasd fasdf
          asdfasdfasdfasdfasdfasdf`,
        },
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Breve...',
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
  props: ['idGame'],
  filters: {

    niceDate (value) {
      const newDate = new Date(value)
      newDate.setHours(newDate.getHours()+3)
      return format(newDate, 'd MMM yyyy HH:mm', { locale: ptBR })
    }

  },
  mounted() {
    
  }
}
</script>

<style>

</style>
