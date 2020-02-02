<template>
<div class="app">

  <Navbar></Navbar>


  <div class="container">
    <div class="row row justify-content-md-center">
      <div class="col-md-8">
        <div class="card">

          <div class="card-header bg-secondary">
              <h3 class="card-title text-white">Upload an Image</h3>
          </div>

          <div class="card-body text-center">

            <div class="form-group" id="ImageInput">
              <div class="input-group">
                  <input 
                  type="file"
                  @change="onFileSelected" 
                  class="custom-file-input"
                  :class="{'is-invalid':$v.selectedFile.$error,'is-valid':!$v.selectedFile.$invalid}"
                  >


                  <label class="custom-file-label" for="inputGroupFile" >Choose file</label>
                  <span class="invalid-feedback" v-if="!$v.selectedFile.required">Este campo no puede ser vacio</span>
              </div>
            </div>

            <div class="form-group" id="TitleInput">
              <input 
              class="form-control"
              type="text" 
              placeholder="Title for the image" 
              v-model="$v.title.$model"  
              :class="{'is-invalid':$v.title.$error,'is-valid':!$v.title.$invalid}">

              <span class="invalid-feedback" v-if="!$v.title.required">Este campo no puede ser vacio</span>
              <span  class="invalid-feedback"  v-if="!$v.title.maxLength">El titulo no puedde pasar de 35 caracteres</span> 
            </div>


            <div class="form-group" id="DescriptionInput">
              <textarea name="description" class="form-control" placeholder="Post description" v-model.trim="description" required></textarea>
            </div>

            <button class="btn btn-success" @click="onUpload()">Upload Post</button>
  

          
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 
</template>


<script>
import { required, maxLength} from 'vuelidate/lib/validators'
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
   data() {
      return {
        title:"",
        description:"",
        selectedFile:null
      }
    },

    validations:{
      title: {
        required,
        maxLength:maxLength(35)
      },
      selectedFile:{
        required
      }


    },



    methods:{
       onFileSelected(event){
        this.selectedFile=event.target.files[0]
      },

      onUpload(){
        this.$v.$touch()
        if (!this.$v.$invalid) {
          const fd=new FormData();
          fd.append('image',this.selectedFile)
          fd.append('description',this.description)
          fd.append('title',this.title)

          this.axios.post('post/create', fd)
          .then(res => {
            alert('se creo el post correctamente')
            this.$router.push({ path: `/home` })
          })
          .catch( e => {
            console.log(e)  
          })
        }    
      }

    }

}
    

</script>

<style scoped>
.container{
  margin-top: 1.5%
}
</style>