<template>
<div class="app">
  <Navbar></Navbar>

  <div class="container" id="profile-info">
    <div class="row">
      <div class="col-md-3">
        
        <div class="card">
           <img :src="user.profilePicture" id="image"> 



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

      <div class="col-md-9">
        <div class="card">
          <div class="card-header bg-secondary text-white">
            <h3><i class="far fa-images"></i>Publicaciones</h3>
          </div>  

          <div class="card-body">
            <div class="row row justify-content-md-center">
              <div class="col-md-10 text-center" v-for="post in posts">
                  <a :href="'/post/show/'+ post.id">
                    <img :src="post.imageUrl" id="images" class="img-thumbnail"/>
                  </a>
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

#images{
  width: 100%; 
  height: 100%;
  background-color: black;

}

#image{
    height: 250px;
  }

</style>