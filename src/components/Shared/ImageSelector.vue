<template>
  <div >
      <v-file-input
        :label="message"
        filled
        accept="image/*"
        prepend-icon="mdi-camera"
        v-model="imageFile"
        @change="onFileSelected"
       ></v-file-input>
       <v-img
         max-height="220"
         max-width="200"
         :src="fileName"
       ></v-img>
  </div>
</template>

<script>
import imageCompression from 'browser-image-compression';
export default {
  props: ['message'],
  data () {
      return {
          imageFile: null,
          fileName: ''
      }
  },
  methods: {
    onFileSelected(){
      let vm = this;
      if (this.imageFile){
        var options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 500,
          useWebWorker: true
        }
        imageCompression(this.imageFile, options).then(compressedFile => {
          this.imageFile = compressedFile
          let vm2 = this;
          let reader = new FileReader();
          reader.onload = function(){
            vm.fileName = reader.result;
            vm.$emit('imageLoaded', vm.fileName, vm2.imageFile)
          }
          reader.readAsDataURL(this.imageFile);
        }).catch( error => {
          console.log(error.message)
        })
      }
    }
  },
  mounted()  {
     this.$root.$on('cleanImage',()=>{
         this.fileName=''
         this.imageFile=null
     }) 
     this.$root.$on('loadImage',(fileName)=>{
       if (fileName){
         this.fileName=fileName
       }
     })
  }
}
</script>

<style>

</style>