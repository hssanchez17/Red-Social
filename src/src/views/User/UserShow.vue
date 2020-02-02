<template>
<div class="app">
  <Navbar></Navbar>


  <div class="container" id="profile-info">
    <div class="row">

      <div class="col-md-3" id="userInformation">
        <div class="card">
          
            <img :src="user.profilePicture" id="profilePicture"> 
            <div class="card-body">
              <h4 class="card-title mt-3">{{user.name}}</h4>
              <p>{{user.aboutMe}}</p>
              <p>{{user.email}}</p>
              <p> <strong>{{posts.length}}</strong> Posts</p>
              <a :href="`/friend/list/followers/people/${user.id}`">
                <p><strong>{{followers}}</strong> Followers</p>
              </a>
              <a :href="`/friend/list/following/people/${user.id}`">
                <p><strong>{{following}}</strong> Following</p>
              </a>

              <div id="followButtons">
                 <button v-if="!doIFollowYou"class="btn btn-success" @click="createAFollow()">Follow</button>
                <button v-if="doIFollowYou"class="btn btn-danger" @click="destroyAFollow()">Unfollow</button>
              </div>
            
            </div>
         
        </div>
      </div>

      <div class="col-md-9" id="PostList">
        <div class="card">
           <PostList :posts="posts"></PostList>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
   import Navbar from '@/components/Navbar.vue'
   import PostList from '@/components/PostListComponent.vue'
export default {
  components: {Navbar,PostList},
  data() {
    return {
      user:{},
      posts:{},
      id:this.$route.params.id,
      doIFollowYou:false,//Cambiarle el nombre
      following:0,
      followers:0
    };
  },

  created(){
    this.getUser(),
    this.doIFollowYou2()
  },

  methods:{
    getUser(){

      this.axios.get(`user/show/${this.id}`)
      .then((response) => {
        this.user= response.data[0];
        this.posts=this.user.posts
        this.following=this.user.following.length
        this.followers=this.user.followers.length
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },

    doIFollowYou2(){ //Cambiarle el nombre
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
        this.followers++
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },


    destroyAFollow(){
      this.axios.delete(`friend/destroy/${this.id}`)
      .then((response) => {
        this.doIFollowYou=false
        this.followers--
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