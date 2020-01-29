<template>
	<div class="hello">

    <div class="card">

      <div class="card-header d-flex justify-content-between align-items-center">
              
        <h2 v-if="!editPermission">{{post.title}}</h2>
              
        <input type="text" placeholder="El nombre de su post" v-model="postEdited.title"  v-if="editPermission">

        <div v-if="postOwner">

          <div v-if="!editPermission">
            <button class="btn btn-info" id="btn-delete" @click="mostrarUpdatedPost()">Update</button>
            <button class="btn btn-danger" id="btn-delete" @click="destroyPost()">  Delete</button>
          </div>


          <div v-if="editPermission">
            <button class="btn btn-info" id="btn-delete" @click="updatePost()">Save</button>
            <button class="btn btn-danger" id="btn-delete" @click="ocultarUpdatePost()"> Cancel</button>
          </div>  
        </div>
      </div>

      <div class="card-body">
              <p v-if="!editPermission">{{post.description}}</p>

              <textarea placeholder="Descripcion de su post" class="form-control my-2" v-model="postEdited.description"  v-if="editPermission"></textarea>


              <div class="text-center">
                <img :src="post.imageUrl"class="img-thumbnail" id="image">
              </div>
      </div>

      <div class="card-footer d-flex justify-content-between align-items-center">
              <button class="btn btn-success" v-if="!permissionToLeaveALike"@click="like()">Like</button>
              <button class="btn btn-danger" v-if="permissionToLeaveALike"@click="dislike()">Dislike</button>
              <span>{{likes}}</span>
      </div>

    </div>

  </div>
</template>


<script>
export default{
   props:['post','id','likes2'],
  data(){
    return {
        editPermission:false,
        postEdited:{title:'',description:''},
        permissionToLeaveALike:false,
        postOwner:'',
        likes:0
    }
  },
  
  created(){
      this.getEnsurePostOwner(),
      this.didYouLeaveTheLike()
  },

  mounted(){

    this.getLikes()

  },

  methods:{
      getLikes(){
        console.log(this.likes2)
        this.likes= this.likes2
      },

      getEnsurePostOwner(){
        this.axios.get(`post/ensurePostOwner/${this.id}`)
        .then((response) => {
          if(response.data.postOwner) this.postOwner= true;
          else this.postOwner= false;
        })
        .catch((e)=>{
            console.log('error' + e);
            this.postOwner= false;
        })
      },

      mostrarUpdatedPost(){
        this.postEdited.title=this.post.title
        this.postEdited.description=this.post.description
        this.editPermission=true
      },

      ocultarUpdatePost(){
        this.editPermission=false
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
          this.editPermission=false
          this.post.title=this.postEdited.title
          this.post.description=this.postEdited.description
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      },

      didYouLeaveTheLike(){
        this.axios.get(`like/didYouLeaveTheLike/${this.id}`)
        .then((response)=>{
          if(response.data.leaveTheLike) this.permissionToLeaveALike= true;
          else this.leaveTheLike=false
        })
        .catch((e)=>{
          console.log('error' + e);
        })
      },

      like(){
        this.axios.post(`/like/add/${this.id}`)
        .then(res => {
          this.permissionToLeaveALike=true
          this.likes++
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      },

      dislike(){
        this.axios.delete(`/like/destroy/${this.id}`)
        .then(res => {
          this.permissionToLeaveALike=false
          this.likes--
        })
        .catch( e => {
          console.log(e.response.data.error)
        })
      },
  }

}

</script>