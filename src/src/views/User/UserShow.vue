<template>
<div class="app">
  <Navbar></Navbar>


  <div class="container" id="profile-info">
    <div class="row">

      <div class="col-md-3" id="userInformation">
        <div class="card">
          
            <img :src="user.profilePicture" id="profilePicture"> 
            <div class="card-body">

               <UserInformation :user="user" ></UserInformation>

              <div id="followButtons">  
                 <button v-if="!doIFollowYou"class="btn btn-success" @click="createAFollow()">Follow</button>
                <button v-if="doIFollowYou"class="btn btn-danger" @click="destroyAFollow()">Unfollow</button>
              </div>
            
            </div>
         
        </div>
      </div>

      <div class="col-md-9" id="PostList">
        <div class="card">
           <PostList :posts="user.posts"></PostList>
        </div>
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
        posts:{},
        followers:0,
        following:0,
      },
      id:this.$route.params.id,
      doIFollowYou:false,

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
        this.user.followers=response.data[0].followers.length
        this.user.following=response.data[0].following.length
        console.log(this.user.following)
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
        this.user.followers++
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },


    destroyAFollow(){
      this.axios.delete(`friend/destroy/${this.id}`)
      .then((response) => {
        this.doIFollowYou=false
        this.user.followers--
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