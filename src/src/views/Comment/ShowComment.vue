<template>
	<div class="app">

		<Navbar></Navbar>

  	<div class="container">
  		<div class="row row justify-content-md-center">
  			<div class="col-md-8">
  				  <ul class="list-group p-4">
              <li class="list-group-item">
                <div class="row">

                	<a :href="`/user/show/${comment.userId}`" class="col text-center">
                    <img src="https://scontent-mia3-2.xx.fbcdn.net/v/t31.0-8/s960x960/15800243_1378924182125785_3186974028727972417_o.jpg?_nc_cat=105&_nc_ohc=nDhh6znLXUkAX8S7OK3&_nc_ht=scontent-mia3-2.xx&_nc_tp=1002&oh=bc7952c964fb005af9f9b28c42b295b8&oe=5EDB22D5" id="images" width="120px" height="120px"/>
                  </a>
                 
                  <blockquote class="col" v-if="!showComment">
                    <p class="lead">{{comment.comment}}</p>  
                    
                    <footer class="blockquote-footer">{{email}}</footer>
                  </blockquote>

                  <div class="col" v-if="permissionToUpdate">
                    <input type="text" placeholder="Descripcion de su comentario" v-model="commentEdited.comment"></input> 
                    
                  </div>


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
              </li>
            </ul>

        </div>
	     </div>
	   </div>
    </div>

</template>


<script>
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
      showComment:false

    }
  },

  created(){
      this.getComment()
  },

  methods:{
      getComment(){
        this.axios.get(`comment/show2/${this.id}`,{ credentials: true })
        .then((response) => {
          //console.log(response.data)
          this.comment= response.data.comment[0];
          this.email=this.comment.user.email
          this.commentOwner=response.data.commentOwner
          console.log(this.commentOwner)
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
       this.axios.put(`comment/update/${this.id}`,this.commentEdited)
        .then((response) => {
          alert('Se actualizo la informacion de el comentario correctamente')
          this.showComment=false
          this.permissionToUpdate=false
          this.comment.comment=this.commentEdited.comment
          console.log()
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
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