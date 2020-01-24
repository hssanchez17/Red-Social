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
            <!--Falta agregar el boton de amigos -->
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
      posts:[],
      id:this.$route.params.id
    };
  },

  created(){
    this.getUser();
  },

  methods:{
    getUser(){

      this.axios.get(`user/show/${this.id}`)
      .then((response) => {
        this.user= response.data[0];
        this.posts=this.user.posts
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
  }
};
</script>


<style scoped>
#profile-info{
  margin-top: 1.5%
}



</style>