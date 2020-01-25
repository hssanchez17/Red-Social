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

          <!-- COMMENTS -->

          <div class="card mt-2">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h3>Comments</h3>
              <button class="btn btn-info" id="btn-toggle-comment" @click="showAddComment()">
                <i class="fa fa-comments-o"></i> Post a Comment
              </button>
            </div>

            <div class="card-body" v-if="showComment">
              <blockquote id="post-comment">

                  <div class="form-group">
                    <textarea name="comment" class="form-control" rows="2" placeholder="Your Comment" v-model="comment.comment"></textarea>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-success" id="btn-comment" @click="addAComment(comment)">
                      <i class="fa fa-comment"></i> Post
                    </button>
                  </div>    
              </blockquote>
            </div>

            <ul class="list-group p-4" v-for="comment2 in comments">
              <li class="list-group-item">
              <div class="row">
                <blockquote class="col">
                  <p class="lead">{{comment2.comment}}</p>
                </blockquote>
              </div>
            </li>
          </ul>


          </div>


<!-- COMMENTS -->

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
        didYouLeaveTheLike:false,
        showComment:false,
        comments:{},
        comment:{comment:''}
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

      showAddComment(){
        this.showComment=true
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
          this.comments=this.post.comments
          console.log(this.comments)
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
      },

      addAComment(comment){
        this.axios.post(`comment/add/${this.id}`,comment)
        .then((response) => {
          console.log(response)
          alert('Se agrego el comentario exitosamente')
          this.comments.unshiftz(comment)
           this.comment=''
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