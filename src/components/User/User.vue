<template>
  <div>
  <v-list-item
    class="white"
    :ripple="false"
    >
    <template v-slot:default>
        <v-list-item-avatar>
          <v-img v-if="user.photo" :src="user.photo"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
              {{user.name}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{user.email}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{(!user.administrator?'Usuário Normal':'Administrador')}} - {{(user.active?'Ativo':'Inativo')}} 
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action  v-if="!withoutMenu">
            <user-menu
              :user = "user"
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
  props: ['user','withoutMenu'],
  filters: {
  },
  components: {
    'user-menu': require('./UserMenu').default
  }
}
</script>

