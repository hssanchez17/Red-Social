<template>
<div class="app">

  <Navbar></Navbar>

  <div class="container" id="profile-info">

    <div class="row">

      <div class="col-md-3" id="UserInformation">
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
              <b-button class="btn-warning btn-sm mx-2" href="/user/update">Actualizar</b-button>
            </div>  
          </div> 
      </div>

    
      <div class="col-md-9" id="PostList">
        <PostList :posts="posts"></PostList>
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
      posts:[],
      following:0,
      followers:0
    };
  },

  created(){
    this.getProfile();
  },

  methods:{
    getProfile(){
      this.axios.get('profile', { credentials: true })
      .then((response) => {
        this.user= response.data[0];
        this.posts=this.user.posts
        this.following=this.user.following.length
        this.followers=this.user.followers.length
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