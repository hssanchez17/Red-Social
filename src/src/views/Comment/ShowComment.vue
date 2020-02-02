<template>
	<div class="app">

    <Navbar></Navbar>

     <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-8">
          <div class="card">

            <div class="card-header d-flex justify-content-between align-items-center">
              <h3>Comentario</h3>

              <div  id="Buttons">
                <div v-if="commentOwner">
                  <div v-if="showComment">
                    <button class="btn btn-info" id="btn-toggle-comment" @click="updateComment()">  Cambiar</button>
                    <button class="btn btn-danger" id="btn-toggle-comment" @click="ocultarUpdateComment()">  Cancelar</button>
                  </div>

                  <div v-if="!showComment">
                    <button class="btn btn-info" id="btn-toggle-comment" @click="mostrarUpdatedCommet()">  Update</button>
                    <button class="btn btn-danger" id="btn-toggle-comment" @click="destroyPost()">  Delete</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
               <div class="row row-cols-2">

                  <div class="col" id="ProfilePicture">
                    <a :href="`/user/show/${comment.userId}`">
                      <img :src="profilePicture" width="90%" height="150px"/>
                    </a>
                  </div>

                  <div class="col" id="CommentData">

                    <blockquote v-if="!showComment">
                      <p class="lead">{{comment.comment}}</p>  
                      <footer class="blockquote-footer">{{email}}</footer>
                    </blockquote>


                    <div v-if="permissionToUpdate">
                      <textarea
                        class="form-control"
                        placeholder="Descripcion de su comentario" 
                        v-model.trim="$v.commentEdited.comment.$model" 
                        :class="{'is-invalid':$v.commentEdited.comment.$error,'is-valid':!$v.commentEdited.comment.$invalid}"
                      ></textarea> 

                       <span class="invalid-feedback" v-if="$v.commentEdited.comment">Este campo no puede ser vacio</span> 
                    </div>

                    <a :href="`/post/show/${comment.postId}`">Voler Al Post </a>
                  </div>
                </div>
            </div>

          </div>
          
      </div>

    </div>

    </div>
  </div>

</template>


<script>
  import {required} from 'vuelidate/lib/validators'
  import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },

	data() {
    return {
      comment:{},
      email:'',
      id:this.$route.params.id,
      commentOwner:'',
      commentEdited:{comment:''},
      permissionToUpdate:false,
      showComment:false,
      profilePicture:''
    }
  },

   validations:{
      commentEdited:{
        comment:{
          required
        }
      }
     },

  created(){
      this.getComment()
  },

  methods:{
      getComment(){
        this.axios.get(`comment/show2/${this.id}`,{ credentials: true })
        .then((response) => {
          this.comment= response.data.comment[0];
          this.email=this.comment.user.email
          this.commentOwner=response.data.commentOwner
          this.profilePicture= this.comment.user.profilePicture
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },

      mostrarUpdatedCommet(){
        this.commentEdited.comment=this.comment.comment
        this.permissionToUpdate=true
        this.showComment=true
      },

      ocultarUpdateComment(){
        this.permissionToUpdate=false
        this.showComment=false
      },

      updateComment(){
        this.$v.$touch()
        console.log(this.$v.$invalid)
        if (!this.$v.$invalid) {
          this.axios.put(`comment/update/${this.id}`,this.commentEdited)
          .then((response) => {
            alert('Se actualizo la informacion de el comentario correctamente')
            this.showComment=false
            this.permissionToUpdate=false
            this.comment.comment=this.commentEdited.comment
          })
          .catch( e => {
            console.log(e.response.data.error)
          })
        }
      },

      destroyPost(){
        this.axios.delete(`comment/destroy/${this.id}`)
        .then((response) => {
          alert('Se elimino el comentario correctamente')
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      }
    }
  }

</script>

<style type="text/css">
  #image{
    width: 100%; 
    max-width:600px; /*ancho de tu imagen*/
    height: 590px;
    background: black;
  }
</style>