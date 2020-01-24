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

            <div class="form-group">
              <div class="input-group">
                <div class="custom-file">

                  <input type="file"@change="onFileSelected" class="custom-file-input">
                  <label class="custom-file-label" for="inputGroupFile">Choose file</label>

                </div>
              </div>
            </div>

            <div class="form-group">
              <input type="text" name="title" class="form-control" placeholder="Title for the Image" required v-model.trim="title">
            </div>


            <div class="form-group">
              <textarea name="description" rows="2" class="form-control" placeholder="Deescription for the Image" v-model.trim="description" required></textarea>
            </div>

             <div class="progress">
  <div class="progress-bar bg-success" role="progressbar" style="width: 100%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>



            <button class="btn btn-success" @click="onUpload()">Upload Image</button>
  

          
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 
</template>


<script>

import axios from 'axios'
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
   data() {
      return {
        file:"",
        title:"",
        description:"",
        selectedFile:null
      }
    },
    methods:{
       onFileSelected(event){
        this.selectedFile=event.target.files[0]
      },

      onUpload(){
        const fd=new FormData();
        fd.append('image',this.selectedFile)
        fd.append('description',this.description)
        fd.append('title',this.title)

         this.axios.post('post/create', fd,{
          onUploadProgress: uploadEvent => {
            console.log("Upload progress:"+ Math.round(uploadEvent.loaded/uploadEvent.total*100)+'%')
          }
          })
         .then(res => {
            alert('se creo el post correctamente')
            this.$router.push({ path: `/home` })
          })
          .catch( e => {
            console.log(e)  

          })
        }    


      },


      /*selectFile(){
        this.file=this.$refs.file.files[0]
        console.log(this.file)
        console.log(this.Title)
      },

      sendFile(){

        let post={
          image:this.file,
          description:this.description
        }

         this.axios.post('post/create', post)
         .then(res => {
            this.$router.push({ path: `/profile` })
          })
          .catch( e => {
            console.log(e)  

          })
        }    */

      }
    

</script>

<style scoped>
.container{
  margin-top: 1.5%
}
</style>