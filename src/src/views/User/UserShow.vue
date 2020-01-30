<template>
<div class="app">
  <Navbar></Navbar>




  <div class="container" id="profile-info">
    <div class="row">
      <div class="col-md-3">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img src="https://66.media.tumblr.com/avatar_bb6b63dbb74a_128.pnj" class="rounded-circle"> 
            <h4 class="card-title mt-3">{{user.name}}</h4>
            <p>{{user.aboutMe}}</p>
            <p>{{user.email}}</p>
             <p> <strong>{{posts.length}}</strong> Posts</p>
            <p><strong>{{followers}}</strong> Followers</p>
            <p><strong>{{following}}</strong> Following</p>


           <button v-if="!doIFollowYou"class="btn btn-success" @click="createAFollow()">Follow</button>
           <button v-if="doIFollowYou"class="btn btn-danger" @click="destroyAFollow()">Unfollow</button>
          </div>  
        </div> 
      </div>

      <div class="col-md-9">
       


          <div class="card">
            <div class="card-header bg-secondary text-white">
              <h3><i class="far fa-images"></i>Publicaciones</h3>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-md-4 text-center" v-for="post in posts">
                  <img :src="post.imageUrl" id="img" class="img-thumbnail" />
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
   import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      user:{},
      posts:{},
      id:this.$route.params.id,
      doIFollowYou:false,
      following:0,
      followers:0
    };
  },

  created(){
    this.getUser(),
    this.getDoIFollowYou()
  },

  methods:{
    getUser(){

      this.axios.get(`user/show/${this.id}`)
      .then((response) => {
        this.user= response.data[0];
        this.posts=this.user.posts
        console.log(this.user)
        this.following=this.user.following.length
        this.followers=this.user.followers.length
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },

    getDoIFollowYou(){
      this.axios.get(`friend/doIFollowYou/${this.id}`)
      .then((response) => {
        if(response.data.doIFollowYou) this.doIFollowYou=true
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },

    createAFollow(){
      this.axios.post(`friend/create/${this.id}`)
      .then((response) => {
        this.doIFollowYou=true
        this.following++
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },


    destroyAFollow(){
      this.axios.delete(`friend/destroy/${this.id}`)
      .then((response) => {
        this.doIFollowYou=false
        this.following--
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    }

    
  }
};
</script>


<style scoped>
#profile-info{
  margin-top: 1.5%
}



</style>