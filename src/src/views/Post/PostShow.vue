<template>
	<div class="app">
		<Navbar></Navbar>
  	<div class="container">
  		<div class="row row justify-content-md-center">
  			<div class="col-md-8">
  				<div class="card">

  					<div class="card-header d-flex justify-content-between align-items-center">
              
              <h2 v-if="!editar">{{post.title}}</h2>
              
              <input 
              type="text" 
              placeholder="El nombre de su post" 
              v-model="postEdited.title"  
              v-if="editar">

              

              <div v-if="dueñoDelPost">
                <div v-if="!editar">
                    <button class="btn btn-info" id="btn-delete" @click="mostrarUpdatedPost()">Update</button>
                    <button class="btn btn-danger" id="btn-delete" @click="destroyPost()">  Delete</button>
                </div>


                <div v-if="editar">
                    <button class="btn btn-info" id="btn-delete" @click="updatePost()">Save</button>
                    <button class="btn btn-danger" id="btn-delete" @click="ocultarUpdatePost()"> Cancel</button>
                </div>
  

              </div>
            </div>


            <div class="card-body">
              <p v-if="!editar">{{post.description}}</p>

              <textarea placeholder="Descripcion de su post" class="form-control my-2" v-model="postEdited.description"  v-if="editar"></textarea>


              <div class="text-center">
                <img :src="post.imageUrl"class="img-thumbnail" id="image">
              </div>
            </div>

          </div>

          <div class="card-footer d-flex justify-content-between align-items-center">
            <button class="btn btn-success" id="btn-like"  v-if="!didYouLeaveTheLike"@click="like()">
              <i class="far fa-thumbs-up"></i> Like
            </button>

             <button class="btn btn-danger" id="btn-like"  v-if="didYouLeaveTheLike"@click="dislike()">
              <i class="far fa-thumbs-up"></i> Dislike
            </button>

            <p>
              <span class="likes-count">{{likes}}</span>
              <i class="fas fa-heart"></i>
            </p>

            <p>
              <i class="fas fa-eye"></i> 50
            </p>
        </div>
        
        </div>
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
	    	post:{},
        postEdited:{title:'',description:''},
	    	id:this.$route.params.id,
        editar:false,
        dueñoDelPost:'',
        likes:'0',
        didYouLeaveTheLike:false
      }
  	},

  	created(){
    	this.getPost(),
      this.getEnsurePostOwner(),
      this.didYouLeaveTheLike2()
  	},

  	methods:{
      getEnsurePostOwner(){
        this.axios.get(`post/ensurePostOwner/${this.id}`)
        .then((response) => {
          if(response.data.postOwner) this.dueñoDelPost= true;
          else this.dueñoDelPost= false;
        })
        .catch((e)=>{
            console.log('error' + e);
            this.dueñoDelPost= false;
        })
      },

      didYouLeaveTheLike2(){
        this.axios.get(`like/didYouLeaveTheLike/${this.id}`)
        .then((response)=>{
          if(response.data.leaveTheLike) this.didYouLeaveTheLike= true;
          else this.leaveTheLike=false
        })
        .catch((e)=>{
          console.log('error' + e);
        })

      },


	    getPost(){
	      this.axios.get(`post/show/${this.id}`)
	      .then((response) => {
	        this.post= response.data[0];
          this.likes=this.post.like.length
	      })
	      .catch((e)=>{
	        console.log('error' + e);
	      })
	    },

      destroyPost(){
        this.axios.delete(`post/destroy/${this.id}`)
        .then(res => {
          alert('Se elimino el post correctamente')
          this.$router.push({ path: `/home` })
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      },

      updatePost(){
        this.axios.put(`/post/edit/${this.id}`,this.postEdited)
        .then(res => {
          alert('Se actualizo la informacion de el post correctamente')
          this.editar=false
          this.post.title=this.postEdited.title
          this.post.description=this.postEdited.description
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      },

      mostrarUpdatedPost(){
        this.postEdited.title=this.post.title
        this.postEdited.description=this.post.description
        this.editar=true
      },

      ocultarUpdatePost(){
        this.editar=false
      },

      like(){
        this.axios.post(`/like/add/${this.id}`)
        .then(res => {
          this.didYouLeaveTheLike=true
          this.likes++
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      },

      dislike(){
        this.axios.delete(`/like/destroy/${this.id}`)
        .then(res => {
          this.didYouLeaveTheLike=false
          this.likes--
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      }

  	}

    	

    };

</script>

<style type="text/css">
  #image{
    width: 100%; 
    max-width:600px; /*ancho de tu imagen*/
    height: 590px;
    background: black;
  }
</style>