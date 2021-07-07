<template>
  <div>
  <v-list-item
    class="white"
    :ripple="false"
    >
    <template v-slot:default>
        <v-list-item-avatar>
          <v-img v-if="competition.logo" :src="competition.logo"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
              {{competition.name}} - {{(competition.active?'Ativa':'Inativa')}} 
            </v-list-item-title>
            <v-list-item-subtitle>
              {{competition.start_date | niceDate}} - {{competition.end_date | niceDate}}
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <competition-menu
              :competition = "competition"
            />
        </v-list-item-action>
        
    </template>
  </v-list-item>
  <v-divider />
  </div>
</template>

<script>
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default {
  data () {
    return {
    }
  },
  props: ['competition'],
  filters: {
    niceDate (value) {
      const newDate = new Date(value)
      newDate.setHours(newDate.getHours() + 3)
      return format(newDate, 'd MMM yyyy', { locale: ptBR })
    }
  },
  components: {
    'competition-menu': require('./CompetitionMenu').default
  }
}
</script>


