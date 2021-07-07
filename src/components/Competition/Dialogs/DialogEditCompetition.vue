<template>

  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
    <v-form ref="form" lazy-validation @submit.prevent="saveCompetition">
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">{{ (modeCreate?'Nova Competição':'Alteração de Competição') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Nome*"
                  :rules="[rules.required]"
                  v-model="currentObject.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="currentObject.active"
                  label="Ativa"
                ></v-checkbox>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="dateRangeText"
                  :rules="[rules.required, rules.hasTwoDates]"
                  label="Período*"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
                
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-date-picker
                  v-model="dates"
                  range
                  locale="pt-BR"
                ></v-date-picker>
              </v-col>
              
            </v-row>
            <v-row>  
              <v-col>
                <image-selector
                  :message="imageComponentText"
                  @imageLoaded="updateImage"
                />
              </v-col>
            </v-row>
            
          </v-container>
          <small>*Indica campo obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Cancelar
          </v-btn>
          <v-btn
            type="submit"
            color="red darken-1"
            text
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </v-row>
  
</template>

<script>
import Util from '../../../dataServices/helper/util'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default {
  props: ['competition'],
  data () {
    return {
      currentObject: {
          id: '',
          name: '',
          logo:'',
          active: 0,
          state_date: '',
          end_date:'' 
      },
      modeCreate: false,
      imageFile: null,
      imageComponentText: 'Selecione uma logo para a competição',
      rules: {
        required: value => !!value || 'Preenchimento obrigatório',
        hasTwoDates: value => value.indexOf('a')!=-1 || 'Selecione duas datas'
      },
      dates: []
    }
  },
  computed: {
    dateRangeText () {
      if (this.dates.length===0){
        return ''
      }
      let date1 = new Date(this.dates[0])
      date1.setHours(date1.getHours() + 3)
      format(new Date(this.dates[0]),'d MMM yyyy', { locale: ptBR })
      if (this.dates.length===1){
        return format(date1,'d MMM yyyy', { locale: ptBR })  
      }
      let date2 = new Date(this.dates[1])
      date2.setHours(date2.getHours() + 3)
      return format(date1,'d MMM yyyy', { locale: ptBR }) + ' a ' + format(date2,'d MMM yyyy', { locale: ptBR })
    },
  },
  components: {
    'image-selector': require('./../../Shared/ImageSelector').default
  },
  mounted () {
    if (this.competition) {
      this.modeCreate = false
    }
    else {
      this.modeCreate = true
      this.dates.push( format((new Date()).setDate(1),'yyyy-MM-dd'))
      this.dates.push( format((new Date()).setDate(7),'yyyy-MM-dd'))
    }
    if (!this.modeCreate){
      this.getCompetition()
    }
  },
  methods: {
    saveCompetition () {
      if (this.$refs.form.validate()) {
        this.currentObject.start_date=this.dates[0]
        this.currentObject.end_date=this.dates[1]
        if (this.currentObject.start_date>this.currentObject.end_date) {
          this.currentObject.start_date=this.dates[1]
          this.currentObject.end_date=this.dates[0]
        }
        
        let formData=Util.object2FormData(this.currentObject,this.$store.state.userStore.loggedUser.id)
        if (this.imageFile) {
          formData.set('logo',this.imageFile,this.currentObject.logo)
        }
        this.$store.dispatch('saveCompetition',{ formData: formData, savedCompetition: this.currentObject, modeCreate: this.modeCreate})
        .then((resp)=>{
          this.$store.commit('showSnackbar',resp)
          
          this.$emit('close')
          this.$vuetify.goTo(0, { duration: 0 })
          
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },

    getCompetition() {
      let competitionCopy = Object.assign({}, this.competition)
      this.currentObject = competitionCopy
      this.dates = []
      this.dates.push( competitionCopy.start_date.toString().substring(0,10))
      this.dates.push( competitionCopy.end_date.toString().substring(0,10))
      this.$root.$emit('loadImage',this.currentObject.logo)
    },

    updateImage(fileName, imageFile) {
      this.currentObject.logo = fileName
      this.imageFile = imageFile
    }
  }
}
</script>

<style>

</style>
