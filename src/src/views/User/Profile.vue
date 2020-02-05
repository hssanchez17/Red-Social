<template>
<div class="app">

  <Navbar></Navbar>

  <div class="container" id="profile-info">

    <div class="row">

      <div class="col-md-3" id="UserInformation">
        <div class="card">
            <img :src="user.profilePicture" id="profilePicture"> 
            <div class="card-body">

              <UserInformation :user="user" ></UserInformation>
              
              <b-button class="btn-warning btn-sm mx-2" href="/user/update">Actualizar</b-button>
            </div>  
          </div> 
      </div>

    
      <div class="col-md-9" id="PostList">
        <PostList :posts="user.posts"></PostList>
      </div>


    </div>  
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import PostList from '@/components/PostListComponent.vue'
import UserInformation from '@/components/UserInformationComponent.vue'
export default {
  components: {Navbar,PostList,UserInformation},

  data() {
    return {
      user:{
        followers:{},
        following:{},
        posts:{}
      }
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