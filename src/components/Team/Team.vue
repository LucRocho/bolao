<template>
  <div>
  <v-list-item
    class="white"
    :ripple="false"
    >
    <template v-slot:default>
        <v-list-item-icon>
          <v-img 
            v-if="team.flag"
            :src="team.flag"
            max-height="30"
            max-width="50" 
          />
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>
            {{team.name}}
            </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="!withoutMenu">
            <team-menu
              :team = "team"
            />
        </v-list-item-action>
        
    </template>
  </v-list-item>
  <v-divider />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['team','withoutMenu'],
  filters: {
  },
  components: {
    'team-menu': require('./TeamMenu').default
  }
}
</script>

